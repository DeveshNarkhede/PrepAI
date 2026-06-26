"use client";

import { useState, useRef, useEffect } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const theme = {
  bg: "#0A0A0F",
  bgCard: "#13131A",
  bgPanel: "#1A1A24",
  border: "#2A2A38",
  accent: "#6C63FF",
  accentGlow: "#6C63FF33",
  accentSoft: "#A89EFF",
  green: "#3DD68C",
  red: "#FF6B6B",
  amber: "#FFB347",
  text: "#F0EFF8",
  textMuted: "#8B8A9E",
  textDim: "#4A4A60",
};

const interviewTypes = [
  { id: "swe", label: "Software Engineer", icon: "💻" },
  { id: "ds", label: "Data Scientist", icon: "📊" },
  { id: "pm", label: "Product Manager", icon: "🗂️" },
  { id: "hr", label: "HR Round", icon: "🤝" },
  { id: "marketing", label: "Marketing", icon: "📣" },
  { id: "custom", label: "Custom", icon: "✏️" },
];

const experienceLevels = [
  { id: "fresher", label: "Fresher", sub: "0 years" },
  { id: "junior", label: "1–3 Years", sub: "Junior" },
  { id: "mid", label: "3–5 Years", sub: "Mid-level" },
  { id: "senior", label: "5+ Years", sub: "Senior" },
];

const skillOptions = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "Machine Learning",
  "Docker",
  "AWS",
  "GraphQL",
  "System Design",
  "Data Structures",
  "Product Strategy",
  "Leadership",
  "Communication",
];

function AIAvatar({ speaking, thinking }) {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (!speaking) return;
    const i = setInterval(() => setPulse((p) => (p + 1) % 3), 400);
    return () => clearInterval(i);
  }, [speaking]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            border: `2px solid ${speaking ? theme.accent : theme.border}`,
            opacity: speaking ? 0.6 : 0.3,
            animation: speaking ? "spin 4s linear infinite" : "none",
          }}
        />
        {speaking && (
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        )}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1E1B3A 0%, #2D2850 100%)",
            border: `2px solid ${speaking ? theme.accent : theme.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: thinking ? 4 : 12,
                  borderRadius: 6,
                  background: speaking ? theme.accent : theme.accentSoft,
                  transition: "height 0.3s",
                  boxShadow: speaking ? `0 0 8px ${theme.accent}` : "none",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 4,
              alignItems: "flex-end",
              height: 20,
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  borderRadius: 2,
                  background: speaking ? theme.accent : theme.textDim,
                  height: speaking
                    ? `${8 + Math.sin((pulse + i) * 1.2) * 8 + 8}px`
                    : "4px",
                  transition: "height 0.2s, background 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 13,
          color: theme.textMuted,
          letterSpacing: "0.05em",
        }}
      >
        {thinking ? "thinking..." : speaking ? "speaking" : "waiting"}
      </div>
    </div>
  );
}

function UserCamera({ active }) {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [camError, setCamError] = useState(false);

  useEffect(() => {
    if (!active) return;
    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      })
      .catch(() => setCamError(true));
    return () => {
      if (videoRef.current?.srcObject)
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
    };
  }, [active]);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4/3",
        background: theme.bgCard,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {hasCamera ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)",
          }}
        />
      ) : (
        <div style={{ textAlign: "center", color: theme.textMuted }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>👤</div>
          <div style={{ fontSize: 13 }}>
            {camError ? "Camera unavailable" : "Starting camera..."}
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          background: "#00000088",
          color: theme.text,
          fontSize: 12,
          padding: "4px 10px",
          borderRadius: 20,
          backdropFilter: "blur(4px)",
        }}
      >
        You
      </div>
    </div>
  );
}

function ScoreRing({ score, size = 80 }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (score / 10) * circ;
  const color = score >= 7 ? theme.green : score >= 5 ? theme.amber : theme.red;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={theme.border}
        strokeWidth={6}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeDasharray={`${filled} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.8s ease" }}
      />
      <text
        x={size / 2}
        y={size / 2 + 5}
        textAnchor="middle"
        style={{
          transform: "rotate(90deg)",
          transformOrigin: `${size / 2}px ${size / 2}px`,
        }}
        fill={color}
        fontSize={18}
        fontWeight={700}
      >
        {score}
      </text>
    </svg>
  );
}

function AnswerInput({ onSubmit, disabled }) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech recognition not supported. Use Chrome or Edge.");
      return;
    }
    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.onresult = (e) => {
      const t = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setText(t);
    };
    r.start();
    recognitionRef.current = r;
    setRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer here, or use the mic to speak..."
        rows={4}
        style={{
          background: theme.bgPanel,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          color: theme.text,
          fontSize: 15,
          padding: "12px 16px",
          resize: "none",
          outline: "none",
          fontFamily: "inherit",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = theme.accent)}
        onBlur={(e) => (e.target.style.borderColor = theme.border)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) handleSubmit();
        }}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={disabled}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: `1px solid ${recording ? theme.red : theme.border}`,
            background: recording ? "#FF6B6B22" : theme.bgPanel,
            color: recording ? theme.red : theme.textMuted,
            cursor: "pointer",
            fontSize: 14,
            display: "flex",
            gap: 8,
            alignItems: "center",
            transition: "all 0.2s",
          }}
        >
          {recording ? "⏹ Stop" : "🎤 Speak"}
          {recording && (
            <span
              style={{
                animation: "pulse 1s infinite",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: theme.red,
                display: "inline-block",
              }}
            />
          )}
        </button>
        <button
          onClick={handleSubmit}
          disabled={disabled || !text.trim()}
          style={{
            flex: 1,
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: text.trim() && !disabled ? theme.accent : theme.border,
            color: text.trim() && !disabled ? "#fff" : theme.textDim,
            cursor: text.trim() && !disabled ? "pointer" : "not-allowed",
            fontSize: 14,
            fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          Submit Answer →
        </button>
      </div>
      <div style={{ fontSize: 12, color: theme.textDim }}>
        Ctrl + Enter to submit quickly
      </div>
    </div>
  );
}

function Landing({ onStart }) {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [customRole, setCustomRole] = useState("");

  const toggleSkill = (s) =>
    setSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  const canStart =
    role && experience && (role !== "custom" || customRole.trim());

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Sora', 'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#1A1A24} ::-webkit-scrollbar-thumb{background:#3A3A50;border-radius:3px}
      `}</style>
      <div
        style={{
          padding: "28px 40px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ fontSize: 24 }}>🎯</div>
        <div>
          <div
            style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            PrepAI
          </div>
          <div style={{ fontSize: 12, color: theme.textMuted }}>
            AI-Powered Interview Coach
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          maxWidth: 800,
          margin: "0 auto",
          padding: "48px 24px",
          animation: "fadein 0.6s ease both",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 60,
              marginBottom: 24,
              animation: "float 3s ease-in-out infinite",
            }}
          >
            🤖
          </div>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              background: `linear-gradient(135deg, ${theme.text} 0%, ${theme.accentSoft} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 12,
            }}
          >
            Your AI Interview Coach
          </h1>
          <p
            style={{
              color: theme.textMuted,
              fontSize: 17,
              maxWidth: 460,
              margin: "0 auto",
            }}
          >
            Practice real interviews, get instant feedback, improve fast.
          </p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontSize: 13,
              color: theme.accent,
              fontWeight: 600,
              letterSpacing: "0.1em",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            01 — Interview Type
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {interviewTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setRole(t.id)}
                style={{
                  padding: "16px",
                  borderRadius: 14,
                  border: `1px solid ${role === t.id ? theme.accent : theme.border}`,
                  background:
                    role === t.id ? `${theme.accent}18` : theme.bgCard,
                  color: role === t.id ? theme.accentSoft : theme.text,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{t.label}</span>
              </button>
            ))}
          </div>
          {role === "custom" && (
            <input
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              placeholder="e.g. DevOps Engineer, UX Designer..."
              style={{
                marginTop: 12,
                width: "100%",
                padding: "12px 16px",
                background: theme.bgPanel,
                border: `1px solid ${theme.border}`,
                borderRadius: 10,
                color: theme.text,
                fontSize: 14,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          )}
        </div>

        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontSize: 13,
              color: theme.accent,
              fontWeight: 600,
              letterSpacing: "0.1em",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            02 — Experience Level
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
            }}
          >
            {experienceLevels.map((l) => (
              <button
                key={l.id}
                onClick={() => setExperience(l.id)}
                style={{
                  padding: "14px 10px",
                  borderRadius: 12,
                  border: `1px solid ${experience === l.id ? theme.accent : theme.border}`,
                  background:
                    experience === l.id ? `${theme.accent}18` : theme.bgCard,
                  color: experience === l.id ? theme.accentSoft : theme.text,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 700 }}>{l.label}</div>
                <div
                  style={{
                    fontSize: 12,
                    color:
                      experience === l.id ? theme.accentSoft : theme.textMuted,
                    marginTop: 4,
                  }}
                >
                  {l.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontSize: 13,
              color: theme.accent,
              fontWeight: 600,
              letterSpacing: "0.1em",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            03 — Skills (optional)
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skillOptions.map((s) => (
              <button
                key={s}
                onClick={() => toggleSkill(s)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 20,
                  border: `1px solid ${skills.includes(s) ? theme.accent : theme.border}`,
                  background: skills.includes(s)
                    ? `${theme.accent}22`
                    : "transparent",
                  color: skills.includes(s)
                    ? theme.accentSoft
                    : theme.textMuted,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            canStart &&
            onStart({
              role:
                role === "custom"
                  ? customRole
                  : interviewTypes.find((t) => t.id === role)?.label,
              experience,
              skills,
            })
          }
          disabled={!canStart}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 14,
            border: "none",
            background: canStart
              ? `linear-gradient(135deg, ${theme.accent} 0%, #9C8BFF 100%)`
              : theme.border,
            color: canStart ? "#fff" : theme.textDim,
            fontSize: 17,
            fontWeight: 700,
            cursor: canStart ? "pointer" : "not-allowed",
            letterSpacing: "-0.01em",
            transition: "all 0.3s",
            boxShadow: canStart ? `0 8px 32px ${theme.accentGlow}` : "none",
          }}
        >
          {canStart
            ? "Start My Interview →"
            : "Select role & experience to continue"}
        </button>
      </div>
    </div>
  );
}

function Interview({ config, onFinish }) {
  const [phase, setPhase] = useState("idle");
  const [question, setQuestion] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [currentEval, setCurrentEval] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");

  // Refs so async callbacks always see fresh values
  const transcriptRef = useRef([]);
  const qIndexRef = useRef(0);
  const totalQuestions = 3;

  const updateTranscript = (val) => {
    transcriptRef.current = val;
    setTranscript(val);
  };

  const callGemini = async (prompt) => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `API error ${res.status}`);
    return data.text || "";
  };

  const askNextQuestion = async () => {
    setPhase("asking");
    setThinking(true);
    setCurrentEval(null);
    setError("");

    const prev = transcriptRef.current
      .map((t, i) => `Q${i + 1}: ${t.question}\nA: ${t.answer}`)
      .join("\n");
    const qNum = qIndexRef.current + 1;

    const prompt = `You are an expert interviewer for a ${config.role} position.
Experience level: ${config.experience}.
Skills to focus on: ${config.skills.join(", ") || "general software engineering"}.

Generate interview question ${qNum} of ${totalQuestions}.
${prev ? `Previous Q&As for context:\n${prev}\n\n` : ""}
Rules:
- Return ONLY the question text, nothing else
- No numbering, no preamble, no "Question X:" prefix
- Make it specific and relevant to the role and skills
- Progressively increase difficulty
- For fresher: focus on fundamentals and conceptual understanding`;

    try {
      const q = await callGemini(prompt);
      const cleanQ = q.trim().replace(/^(Question\s*\d*[:.]?\s*)/i, "");
      setQuestion(cleanQ);
      setThinking(false);
      setSpeaking(true);
      setTimeout(() => {
        setSpeaking(false);
        setPhase("answering");
      }, 2500);
    } catch (e) {
      console.error("Question fetch failed:", e);
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.startsWith("RATE_LIMIT:")) {
        const secs = msg.split(":")[1];
        setError(
          `⏳ Free tier rate limit hit. Gemini says wait ${secs} seconds, then click "Retry".`,
        );
      } else {
        setError(
          "⚠️ Failed to load question. Check your API key and restart the server.",
        );
      }
      setThinking(false);
      setPhase("error");
    }
  };

  const handleAnswer = async (answer) => {
    if (!question) return;
    setPhase("evaluating");
    setThinking(true);

    const prompt = `Evaluate this interview answer and respond with ONLY a raw JSON object. No markdown, no backticks, no explanation, no text before or after. Just the JSON.

Role: ${config.role}
Experience: ${config.experience}
Question: "${question}"
Answer: "${answer}"

JSON format (copy this structure exactly):
{"score":7,"summary":"one sentence verdict","positives":["strength one","strength two"],"improvements":["one improvement"],"idealAnswer":"two sentence ideal answer"}

Score: 1-4=poor, 5-6=average, 7-8=good, 9-10=excellent.`;

    let evalResult;
    try {
      const raw = await callGemini(prompt);
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.log("Raw response was:", raw.slice(0, 200));
        throw new Error("No JSON found in response");
      }
      // Fix common issues: smart quotes, trailing commas
      const fixedJson = jsonMatch[0]
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/,\s*([}\]])/g, "$1");
      evalResult = JSON.parse(fixedJson);
    } catch (e) {
      console.error("Eval parse error:", e);
      evalResult = {
        score: 5,
        summary: "Answer received but evaluation parsing failed.",
        positives: ["You attempted an answer"],
        improvements: ["Try to be more specific and structured"],
        idealAnswer:
          "A strong answer would directly address the question with clear examples.",
      };
    }

    const newEntry = { question, answer, evaluation: evalResult };
    const newTranscript = [...transcriptRef.current, newEntry];
    updateTranscript(newTranscript);
    setCurrentEval(evalResult);
    setThinking(false);
    setPhase("done_q");

    if (newTranscript.length >= totalQuestions) {
      setTimeout(() => onFinish(newTranscript), 1200);
    }
  };

  const handleNext = () => {
    qIndexRef.current += 1;
    askNextQuestion();
  };

  useEffect(() => {
    askNextQuestion();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Sora', 'Inter', sans-serif",
        paddingBottom: 40,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadein { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div
        style={{
          padding: "16px 32px",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: theme.bgCard,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>🎯</span>
          <span style={{ fontWeight: 700, fontSize: 16 }}>PrepAI</span>
          <span style={{ color: theme.textMuted, fontSize: 13 }}>·</span>
          <span style={{ color: theme.textMuted, fontSize: 13 }}>
            {config.role}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 4,
                  borderRadius: 2,
                  background:
                    i < transcript.length ? theme.accent : theme.border,
                  opacity: i < transcript.length ? 1 : 0.4,
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 13, color: theme.textMuted }}>
            {transcript.length}/{totalQuestions}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              background: theme.bgCard,
              borderRadius: 20,
              border: `1px solid ${theme.border}`,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 240,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse at 50% 30%, ${theme.accentGlow} 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            <AIAvatar speaking={speaking} thinking={thinking} />
            <div
              style={{
                marginTop: 20,
                fontSize: 14,
                color: theme.textMuted,
                fontWeight: 500,
              }}
            >
              AI Interviewer
            </div>
          </div>
          <UserCamera active />
        </div>

        {phase === "error" && (
          <div
            style={{
              background: "#FF6B6B18",
              border: `1px solid ${theme.red}`,
              borderRadius: 14,
              padding: "20px 24px",
              marginBottom: 20,
              color: theme.red,
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            {error}
          </div>
        )}

        {question && phase !== "error" && (
          <div
            style={{
              background: theme.bgCard,
              borderRadius: 16,
              border: `1px solid ${theme.border}`,
              padding: "24px 28px",
              marginBottom: 20,
              animation: "fadein 0.4s ease both",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: theme.accent,
                fontWeight: 600,
                letterSpacing: "0.08em",
                marginBottom: 10,
              }}
            >
              QUESTION {transcript.length + (phase === "done_q" ? 0 : 1)}
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.6, fontWeight: 500 }}>
              {question}
            </p>
          </div>
        )}

        {thinking && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: theme.textMuted,
              fontSize: 15,
            }}
          >
            <span style={{ animation: "pulse 1s infinite" }}>●</span>{" "}
            <span style={{ animation: "pulse 1s 0.2s infinite" }}>●</span>{" "}
            <span style={{ animation: "pulse 1s 0.4s infinite" }}>●</span>
            <span style={{ marginLeft: 12 }}>
              {phase === "evaluating"
                ? "Evaluating your answer..."
                : "Preparing question..."}
            </span>
          </div>
        )}

        {phase === "answering" && question && (
          <div style={{ animation: "fadein 0.4s ease both" }}>
            <AnswerInput onSubmit={handleAnswer} disabled={false} />
          </div>
        )}

        {currentEval && phase === "done_q" && (
          <div style={{ animation: "fadein 0.5s ease both" }}>
            <div
              style={{
                background: theme.bgCard,
                borderRadius: 16,
                border: `1px solid ${theme.border}`,
                padding: "24px 28px",
                marginTop: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <ScoreRing score={currentEval.score} size={80} />
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: theme.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Score
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>
                    {currentEval.summary}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: theme.green,
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    ✓ STRENGTHS
                  </div>
                  {currentEval.positives.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 14,
                        color: theme.text,
                        padding: "4px 0",
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: theme.green }}>✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: theme.amber,
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    ↑ TO IMPROVE
                  </div>
                  {currentEval.improvements.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 14,
                        color: theme.text,
                        padding: "4px 0",
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: theme.amber }}>↑</span> {p}
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  background: theme.bgPanel,
                  borderRadius: 10,
                  padding: "14px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: theme.accentSoft,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  💡 IDEAL ANSWER
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: theme.textMuted,
                    lineHeight: 1.7,
                  }}
                >
                  {currentEval.idealAnswer}
                </div>
              </div>
              {transcript.length < totalQuestions && (
                <button
                  onClick={handleNext}
                  style={{
                    marginTop: 20,
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    border: "none",
                    background: `linear-gradient(135deg, ${theme.accent}, #9C8BFF)`,
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Next Question →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Report({ transcript, config, onRestart }) {
  const avg = (arr) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  const scores = transcript.map((t) => t.evaluation.score);
  const overall = avg(scores);
  const techScore = avg(scores.slice(0, Math.ceil(scores.length / 2)));
  const commScore = Math.min(
    10,
    Math.max(1, overall + Math.round(Math.random() * 2 - 1)),
  );
  const confScore = Math.min(
    10,
    Math.max(1, overall + Math.round(Math.random() * 2 - 1)),
  );
  const allImprovements = [
    ...new Set(transcript.flatMap((t) => t.evaluation.improvements)),
  ];
  const scoreColor = (s) =>
    s >= 7 ? theme.green : s >= 5 ? theme.amber : theme.red;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Sora', 'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div
        style={{
          background: theme.bgCard,
          borderBottom: `1px solid ${theme.border}`,
          padding: "24px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>🎯</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              Interview Complete
            </div>
            <div style={{ fontSize: 13, color: theme.textMuted }}>
              {config.role} · {config.experience}
            </div>
          </div>
        </div>
        <button
          onClick={onRestart}
          style={{
            padding: "10px 22px",
            borderRadius: 10,
            border: `1px solid ${theme.border}`,
            background: "transparent",
            color: theme.textMuted,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "40px 24px",
          animation: "fadein 0.6s ease both",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 13,
              color: theme.accent,
              fontWeight: 600,
              letterSpacing: "0.1em",
              marginBottom: 16,
            }}
          >
            OVERALL PERFORMANCE
          </div>
          <ScoreRing score={overall} size={140} />
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginTop: 16,
              color: scoreColor(overall),
            }}
          >
            {overall >= 8
              ? "Exceptional!"
              : overall >= 6
                ? "Good performance"
                : overall >= 4
                  ? "Keep practicing"
                  : "Needs improvement"}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {[
            { label: "Technical", score: techScore, icon: "⚙️" },
            { label: "Communication", score: commScore, icon: "💬" },
            { label: "Confidence", score: confScore, icon: "🎯" },
          ].map(({ label, score, icon }) => (
            <div
              key={label}
              style={{
                background: theme.bgCard,
                borderRadius: 16,
                border: `1px solid ${theme.border}`,
                padding: "24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div
                style={{
                  fontSize: 13,
                  color: theme.textMuted,
                  marginBottom: 12,
                }}
              >
                {label}
              </div>
              <ScoreRing score={score} size={70} />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontSize: 13,
              color: theme.accent,
              fontWeight: 600,
              letterSpacing: "0.08em",
              marginBottom: 20,
            }}
          >
            QUESTION BREAKDOWN
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {transcript.map((t, i) => (
              <div
                key={i}
                style={{
                  background: theme.bgCard,
                  borderRadius: 14,
                  border: `1px solid ${theme.border}`,
                  padding: "18px 22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 12,
                        color: theme.textDim,
                        marginBottom: 6,
                      }}
                    >
                      Q{i + 1}
                    </div>
                    <div
                      style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}
                    >
                      {t.question}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: theme.textMuted,
                        marginBottom: 8,
                        fontStyle: "italic",
                      }}
                    >
                      "{t.answer.slice(0, 120)}
                      {t.answer.length > 120 ? "..." : ""}"
                    </div>
                    <div style={{ fontSize: 13, color: theme.textMuted }}>
                      {t.evaluation.summary}
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        height: 4,
                        background: theme.border,
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 2,
                          background: scoreColor(t.evaluation.score),
                          width: `${t.evaluation.score * 10}%`,
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                  <ScoreRing score={t.evaluation.score} size={56} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {allImprovements.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                fontSize: 13,
                color: theme.accent,
                fontWeight: 600,
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              FOCUS AREAS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {allImprovements.slice(0, 5).map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: theme.bgCard,
                    borderRadius: 10,
                    border: `1px solid ${theme.border}`,
                    padding: "12px 18px",
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: theme.amber, fontSize: 18 }}>↑</span>
                  <span style={{ fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={onRestart}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 14,
            border: "none",
            background: `linear-gradient(135deg, ${theme.accent} 0%, #9C8BFF 100%)`,
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "-0.01em",
            boxShadow: `0 8px 32px ${theme.accentGlow}`,
          }}
        >
          Practice Again →
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [config, setConfig] = useState(null);
  const [transcript, setTranscript] = useState([]);

  return (
    <div>
      {screen === "landing" && (
        <Landing
          onStart={(cfg) => {
            setConfig(cfg);
            setScreen("interview");
          }}
        />
      )}
      {screen === "interview" && config && (
        <Interview
          config={config}
          onFinish={(t) => {
            setTranscript(t);
            setScreen("report");
          }}
        />
      )}
      {screen === "report" && (
        <Report
          transcript={transcript}
          config={config}
          onRestart={() => {
            setTranscript([]);
            setConfig(null);
            setScreen("landing");
          }}
        />
      )}
    </div>
  );
}
