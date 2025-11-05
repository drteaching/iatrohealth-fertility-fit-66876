import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a health assistant for IatroHealth's Fertility Fit Program. You help users track their health data including:
    
1. Cycle tracking (menstrual cycle, symptoms, flow level)
2. Nutrition (meals, calories, macronutrients)
3. Exercise (workouts, duration, intensity)
4. User profile (age, weight, height, activity level, goals)

When a user provides health information, extract the relevant data and respond with a JSON object containing:
- "type": one of "cycle", "nutrition", "exercise", "profile", or "chat"
- "data": the extracted information
- "response": a friendly confirmation message

For cycle tracking, extract: entry_date, cycle_day, symptoms (array), flow_level, notes
For nutrition, extract: entry_date, meal_type, food_name, calories, protein, carbs, fat
For exercise, extract: entry_date, exercise_name, duration_minutes, intensity, notes
For profile, extract: age, sex, weight_kg, height_cm, activity_level, goal

If the user is just chatting or asking questions, set type to "chat" and provide helpful information.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'store_health_data',
            description: 'Store health tracking data in the database',
            parameters: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['cycle', 'nutrition', 'exercise', 'profile', 'chat']
                },
                data: {
                  type: 'object',
                  properties: {
                    entry_date: { type: 'string' },
                    meal_type: { type: 'string' },
                    food_name: { type: 'string' },
                    calories: { type: 'number' },
                    protein: { type: 'number' },
                    carbs: { type: 'number' },
                    fat: { type: 'number' },
                    cycle_day: { type: 'number' },
                    symptoms: { type: 'array', items: { type: 'string' } },
                    flow_level: { type: 'string' },
                    exercise_name: { type: 'string' },
                    duration_minutes: { type: 'number' },
                    intensity: { type: 'string' },
                    notes: { type: 'string' },
                    age: { type: 'number' },
                    sex: { type: 'string' },
                    weight_kg: { type: 'number' },
                    height_cm: { type: 'number' },
                    activity_level: { type: 'string' },
                    goal: { type: 'string' }
                  }
                },
                response: { type: 'string' }
              },
              required: ['type', 'response']
            }
          }
        }],
        tool_choice: 'auto'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'AI service error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiResponse = await response.json();
    console.log('AI response:', JSON.stringify(aiResponse));

    const choice = aiResponse.choices?.[0];
    const toolCall = choice?.message?.tool_calls?.[0];

    if (toolCall?.function) {
      const args = JSON.parse(toolCall.function.arguments);
      const { type, data, response: aiMessage } = args;

      // Store data in database based on type
      if (type === 'nutrition' && data) {
        await supabase.from('nutrition_entries').insert({
          user_id: user.id,
          entry_date: data.entry_date || new Date().toISOString().split('T')[0],
          meal_type: data.meal_type || 'snack',
          food_name: data.food_name,
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fat
        });
      } else if (type === 'cycle' && data) {
        await supabase.from('cycle_entries').insert({
          user_id: user.id,
          entry_date: data.entry_date || new Date().toISOString().split('T')[0],
          cycle_day: data.cycle_day,
          symptoms: data.symptoms,
          flow_level: data.flow_level,
          notes: data.notes
        });
      } else if (type === 'exercise' && data) {
        await supabase.from('exercise_entries').insert({
          user_id: user.id,
          entry_date: data.entry_date || new Date().toISOString().split('T')[0],
          exercise_name: data.exercise_name,
          duration_minutes: data.duration_minutes,
          intensity: data.intensity,
          notes: data.notes
        });
      } else if (type === 'profile' && data) {
        await supabase.from('user_profiles').upsert({
          user_id: user.id,
          age: data.age,
          sex: data.sex,
          weight_kg: data.weight_kg,
          height_cm: data.height_cm,
          activity_level: data.activity_level,
          goal: data.goal
        });
      }

      return new Response(JSON.stringify({ 
        message: aiMessage,
        type,
        stored: type !== 'chat'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fallback to regular chat response
    const aiMessage = choice?.message?.content || 'I can help you track your health data. Try telling me about your meals, exercise, or cycle!';
    
    return new Response(JSON.stringify({ 
      message: aiMessage,
      type: 'chat',
      stored: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
