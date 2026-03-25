import { useState } from "react";
import { getPredictionHistory } from "../services/predictionService";

export function DashboardChatBot() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const history = getPredictionHistory();
  const latest = history[0];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const API = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
        context: latest,
        history: messages
      }),
    });

    const data = await res.json();

    const botMsg = { role: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-xl p-4 border">
      <h3 className="font-bold mb-2 text-blue-600">Health Assistant 🤖</h3>

      <div className="h-60 overflow-y-auto mb-2 border p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <p className="text-sm mb-1">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 w-full text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your health..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}