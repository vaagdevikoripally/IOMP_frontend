
// import { useState } from "react";

// export function LandingChatBot() {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [input, setInput] = useState("");
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);

//     setLoading(true);
//     setInput("");

//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: userMsg.text,
//           context: null,
//         }),
//       });

//       const data = await res.json();

//       const botMsg = { role: "bot", text: data.reply };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: "⚠️ Something went wrong." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <div className="fixed bottom-4 right-4 z-50">
//         <button
//           onClick={() => setOpen(!open)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg"
//         >
//           💬 Chat
//         </button>
//       </div>

//       {/* Chat Window */}
//       {open && (
//         <div className="fixed bottom-16 right-4 w-80 h-[450px] bg-white shadow-2xl rounded-2xl flex flex-col border z-50">
          
//           {/* Header */}
//           <div className="bg-blue-600 text-white p-3 rounded-t-2xl font-semibold">
//             Diabetes Assistant 🤖
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`flex ${
//                   m.role === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-3 py-2 rounded-xl max-w-[75%] text-sm shadow ${
//                     m.role === "user"
//                       ? "bg-blue-600 text-white rounded-br-none"
//                       : "bg-white text-gray-800 border rounded-bl-none"
//                   }`}
//                 >
//                   {m.text}
//                 </div>
//               </div>
//             ))}

//             {/* 🔵 Thinking Dots */}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-white px-3 py-2 rounded-xl border shadow text-sm flex gap-1">
//                   <span className="animate-bounce">.</span>
//                   <span className="animate-bounce delay-100">.</span>
//                   <span className="animate-bounce delay-200">.</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <div className="p-2 border-t flex gap-2">
//             <input
//               className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask something..."
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-blue-600 text-white px-3 rounded-lg"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { getPredictionHistory } from "../services/predictionService";
import { MessageCircle } from "lucide-react";
export function LandingChatBot() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 📜 Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    setLoading(true);
    setInput("");

    try {
      // 📊 GET REAL DATA
      const history = getPredictionHistory();
      const latest = history.length > 0 ? history[0].result : null;
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMsg.text,
          context: {
            latestResult: latest,
            history: history,
          },
          history: updatedMessages, // 🧠 MEMORY
        }),
      });

      const data = await res.json();

      const botMsg = { role: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {/* <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg"
        >
          💬 Chat
        </button>
      </div> */}
      

{/* Floating Chat Button */}
     <div
  onClick={() => setOpen(!open)}
  className="fixed bottom-6 right-6 z-50 cursor-pointer"
>
  <div className="relative w-28 h-28 flex items-center justify-center">

    {/* 🔵 Outer Glow */}
    <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-3xl animate-pulse"></div>

    {/* 🟢 Ripple Waves */}
    <span className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-40 animate-ping"></span>
    <span className="absolute inset-2 rounded-full border border-blue-300 opacity-30 animate-ping delay-200"></span>
    <div className="absolute bottom-32 right-0 bg-white px-4 py-2 rounded-lg shadow text-sm text-gray-800 font-semibold animate-bounce">
  Ask me anything 💬
</div>
    {/* 🧠 Main Avatar */}
    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white to-blue-50 
                    shadow-2xl flex items-center justify-center 
                    hover:scale-110 active:scale-95 transition-all duration-300">

      {/* Doctor Emoji */}
      <span className="text-7xl">👨‍⚕️</span>

      {/* 🟢 Online Status */}
      <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
    </div>
  </div>
</div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-16 right-4 w-96 h-[520px] bg-white shadow-2xl rounded-2xl flex flex-col border z-50">

          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-2xl font-semibold flex justify-between items-center">
            <span>Diabetes AI Assistant 🤖</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-10">
                Ask me anything about diabetes, your risk, or health tips 👇
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-md border ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* 🔵 Thinking animation */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl border shadow text-sm flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your health..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}