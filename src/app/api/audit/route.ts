import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Grab the raw operations logs payload text streamed from the frontend browser
    const { logs } = await request.json();

    if (!logs || !logs.trim()) {
      return NextResponse.json({ error: 'System input log string parameter is empty.' }, { status: 400 });
    }

    // 2. Fetch your private security access key token from your local .env.local file vault
    const apiKey = process.env.NEBIUS_API_KEY;
    if (!apiKey || apiKey === "your_actual_nebius_api_key_goes_here") {
      // High-fidelity local developer fallback mode if live key is missing
      return NextResponse.json({
        isMock: true,
        reports: [
          { title: 'AI Integration Target', status: 'LOCAL GATEWAY', score: 'READY', tone: 'violet', detail: 'The backend API route file is perfectly wired! Simply swap your real Nebius token key into your .env.local file to activate live NVIDIA GPU compute streams.' }
        ]
      });
    }

    // 3. Formulate the structure prompt rules to force the AI model to output pure, clean JSON data strings
    const systemPrompt = `You are a high-performance Autonomous Technical Auditor system. 
    Analyze the user's software engineering milestone summaries and raw operations logs.
    You MUST respond with a single, valid JSON array containing exactly 3 object entries. 
    Do not write any introductory markdown or summary explanations outside the array container.
    Format your output exactly like this mockup layout structure:
    [
      { "title": "Audit Metric Component Title", "status": "PASS or FAIL or WATCH", "score": "Percentage % value", "tone": "green or violet or amber", "detail": "A concise 1-sentence analytical evaluation of the specific system parameters." }
    ]`;

    // 4. Fire the complete data request across the internet to the Nebius Cloud AI Inference endpoint grid
    const response = await fetch('https://nebius.ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-70B-Instruct', // Elite open-weight standard model optimized on NVIDIA hardware clusters
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: logs }
        ],
        temperature: 0.3, // Kept low to ensure absolute analytical consistency
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Nebius API cluster server drop error link: ${errorText}` }, { status: 500 });
    }

    const data = await response.json();
    const rawAiResultTextString = data.choices[0]?.message?.content || '[]';

    // 5. Clean, parse, and pass the structured data back to your dashboard canvas viewports
    try {
      // Isolate the pure JSON array brackets in case the model accidentally printed extra characters
      const cleanJsonArrayStartIndex = rawAiResultTextString.indexOf('[');
      const cleanJsonArrayEndIndex = rawAiResultTextString.lastIndexOf(']') + 1;
      const jsonContentPayloadString = rawAiResultTextString.substring(cleanJsonArrayStartIndex, cleanJsonArrayEndIndex);
      
      const structuredReportsDistributionArray = JSON.parse(jsonContentPayloadString);
      return NextResponse.json({ isMock: false, reports: structuredReportsDistributionArray });
    } catch (parseError) {
      return NextResponse.json({ error: 'Failed to evaluate structural JSON strings returned from the AI model engine.' }, { status: 500 });
    }

  } catch (globalError: any) {
    return NextResponse.json({ error: `Internal execution track server runtime exception error: ${globalError.message}` }, { status: 500 });
  }
}
