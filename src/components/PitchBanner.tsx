import { useState } from "react";

const WEBHOOK_URL = "https://n8n.srv936332.hstgr.cloud/webhook/kidstory";

type Status = "idle" | "submitting" | "success" | "error";

export default function PitchBanner() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          idea: idea.trim(),
          source: "kidstory.online",
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg((err as Error).message || "Something went wrong");
    }
  }

  function close() {
    setOpen(false);
    if (status === "success") {
      setStatus("idle");
      setName("");
      setEmail("");
      setIdea("");
    }
  }

  return (
    <>
      <div className="pitch-banner">
        <div className="pitch-banner-inner">
          <div className="pitch-text">
            <span className="pitch-emoji">✨</span>
            <h2 className="pitch-title">Want a story with YOUR family?</h2>
            <p className="pitch-sub">
              Custom stories with your kids, friends, and favorite places —
              tell us your idea!
            </p>
          </div>
          <button
            className="pitch-cta"
            onClick={() => setOpen(true)}
            type="button"
          >
            Contact us →
          </button>
        </div>
      </div>

      {open && (
        <div className="pitch-modal-overlay" onClick={close}>
          <div
            className="pitch-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="pitch-modal-title"
          >
            <button
              className="pitch-modal-close"
              onClick={close}
              type="button"
              aria-label="Close"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="pitch-success">
                <div className="pitch-success-icon">🎉</div>
                <h3>Thank you!</h3>
                <p>
                  We got your idea and will be in touch soon at <strong>{email}</strong>.
                </p>
                <button className="pitch-cta" onClick={close} type="button">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pitch-form">
                <h3 id="pitch-modal-title">Tell us about your story</h3>
                <p className="pitch-form-sub">
                  We'll get back to you with details and pricing.
                </p>

                <label className="pitch-field">
                  <span>Your name</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    autoFocus
                  />
                </label>

                <label className="pitch-field">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>

                <label className="pitch-field">
                  <span>Your story idea</span>
                  <textarea
                    required
                    rows={4}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="My kids are Sam (4) and Mila (2). I'd love a story about them at the beach with a friendly dolphin..."
                  />
                </label>

                {status === "error" && (
                  <div className="pitch-error">{errorMsg || "Something went wrong"}</div>
                )}

                <button
                  className="pitch-cta pitch-cta-submit"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
