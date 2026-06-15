import { useState, useEffect } from "react";
import { MessageSquare, Send, Check, CheckCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  reply: string;
  read: boolean;
  createdAt: string;
};

export function MessagePanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat pesan");
    }
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    await fetch("/api/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    });
    fetchMessages();
  };

  const sendReply = async (id: string) => {
    if (!replyText.trim()) return;
    await fetch("/api/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, reply: replyText }),
    });
    setReplying(null);
    setReplyText("");
    toast.success("Balasan terkirim!");
    fetchMessages();
  };

  const statusBadge = (msg: Message) => {
    if (msg.reply) return <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-xs">Dibalas</span>;
    if (msg.read) return <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600 text-xs">Dibaca</span>;
    return <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs">Baru</span>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-accent" />
          <span className="font-display text-2xl">Pesan Masuk</span>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
            {messages.filter((m) => !m.read).length} baru
          </span>
        </div>
        <button onClick={fetchMessages} className="p-2 rounded-lg hover:bg-secondary transition">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>Belum ada pesan masuk</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`rounded-xl border p-4 transition ${!msg.read ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{msg.name}</span>
                    {statusBadge(msg)}
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleString("id-ID")}
                    </span>
                  </div>
                  {msg.email && (
                    <div className="text-xs text-muted-foreground mb-2">{msg.email}</div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.message}</p>

                  {msg.reply && (
                    <div className="mt-3 pl-3 border-l-2 border-accent/30">
                      <div className="text-xs text-accent mb-1 flex items-center gap-1">
                        <CheckCheck className="h-3 w-3" /> Balasan
                      </div>
                      <p className="text-sm">{msg.reply}</p>
                    </div>
                  )}

                  {replying === msg.id && (
                    <div className="mt-3 flex gap-2">
                      <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Tulis balasan..."
                        className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-background outline-none focus:border-accent"
                        onKeyDown={(e) => e.key === "Enter" && sendReply(msg.id)}
                      />
                      <button onClick={() => sendReply(msg.id)} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-1">
                  {!msg.read && (
                    <button onClick={() => markRead(msg.id)} className="p-1.5 rounded-lg hover:bg-secondary transition" title="Tandai dibaca">
                      <Check className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                  <button onClick={() => { setReplying(replying === msg.id ? null : msg.id); setReplyText(""); }} className="p-1.5 rounded-lg hover:bg-secondary transition" title="Balas">
                    <Send className="h-4 w-4 text-accent" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
