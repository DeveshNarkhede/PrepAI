import { NextRequest, NextResponse } from "next/server";

async function callGemini(
  prompt: string,
  apiKey: string,
  attempt = 1,
): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    },
  );

  const data = await res.json();

  if (res.status === 503 && attempt <= 4) {
    console.log(
      `Gemini 503 - retrying in ${attempt * 2}s (attempt ${attempt}/4)...`,
    );
    await new Promise((r) => setTimeout(r, attempt * 2000));
    return callGemini(prompt, apiKey, attempt + 1);
  }

  if (!res.ok) {
    throw new Error(data?.error?.message || `Gemini error ${res.status}`);
  }

  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text =
    parts
      .find((p: { text?: string }) => typeof p.text === "string")
      ?.text?.trim() || "";
  return text;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }
    const text = await callGemini(prompt, apiKey);
    console.log("Gemini status: 200 OK");
    return NextResponse.json({ text });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Gemini route error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
