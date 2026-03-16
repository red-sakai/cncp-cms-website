"use client";

import { useState } from "react";
import Button from "../components/ui/Button";
import { supabase } from "../../lib/supabaseClient";

type StatusType = "idle" | "loading" | "success" | "error";

type FindResult = {
  memberId: string | null;
  message: string;
  status: StatusType;
};

export default function FindIdPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<FindResult>({
    memberId: null,
    message: "",
    status: "idle",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setResult({
        memberId: null,
        message: "Please enter the email you used to register.",
        status: "error",
      });
      return;
    }

    setResult({ memberId: null, message: "Looking up your member ID...", status: "loading" });

    const { data, error } = await supabase
      .from("members")
      .select("member_id")
      .eq("email", trimmedEmail)
      .maybeSingle();

    if (error) {
      setResult({
        memberId: null,
        message: "We couldn't complete that lookup. Please try again in a moment.",
        status: "error",
      });
      return;
    }

    if (!data?.member_id) {
      setResult({
        memberId: null,
        message: "No match yet. Double-check the email address and try again.",
        status: "error",
      });
      return;
    }

    setResult({
      memberId: data.member_id,
      message: "Success! Your member ID is ready.",
      status: "success",
    });
  };

  return (
    <main className="find-id">
      <div className="find-id-shell">
        <header className="find-id-hero">
          <div className="find-id-hero-copy">
            <p className="find-id-eyebrow">CNCP MEMBER SERVICES</p>
            <h1>Find your member ID</h1>
            <p>
              Enter the email you used when you joined. We&apos;ll match it to your CNCP
              membership record and show your ID.
            </p>
            <div className="find-id-badges">
              <span>Instant lookup</span>
              <span>Secure match</span>
              <span>Officer verified</span>
            </div>
          </div>

          <div className="find-id-hero-meta">
            <div className="find-id-metric-grid" aria-hidden="true">
              <div className="find-id-metric">
                <strong>24/7</strong>
                <span>Self-serve access</span>
              </div>
              <div className="find-id-metric">
                <strong>&lt; 10s</strong>
                <span>Typical lookup time</span>
              </div>
            </div>
            <Button href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </header>

        <section className="find-id-grid">
          <article className="find-id-card" aria-live="polite">
            <div className="find-id-card-heading">
              <h2>Member ID lookup</h2>
              <p>Use your registered email to retrieve your CNCP membership ID.</p>
            </div>

            <form className="find-id-form" onSubmit={handleSubmit}>
              <label className="find-id-label" htmlFor="member-email">
                Email address
              </label>
              <input
                id="member-email"
                type="email"
                name="email"
                placeholder="name@school.edu"
                autoComplete="email"
                className="find-id-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <Button type="submit">Find my ID</Button>
            </form>

            {result.status !== "idle" && (
              <div className={`find-id-status status-${result.status}`} role="status">
                <p>{result.message}</p>
                {result.memberId && (
                  <div className="find-id-result">
                    <span>Member ID</span>
                    <strong>{result.memberId}</strong>
                  </div>
                )}
              </div>
            )}

            <p className="find-id-note" role="note">
              If you still need help, contact the CNCP officers and we&apos;ll assist you with
              verification.
            </p>
          </article>

          <aside className="find-id-aside">
            <div className="find-id-panel">
              <h2>How it works</h2>
              <ol className="find-id-steps">
                <li>
                  <span>1</span>
                  <div>
                    <h3>Enter your email</h3>
                    <p>Use the address you registered with CNCP.</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <h3>We match your record</h3>
                    <p>Instant lookup against the membership list.</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <h3>Get your ID</h3>
                    <p>Save it for event check-ins and forms.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="find-id-panel find-id-support">
              <h2>Need help?</h2>
              <p>Officers can verify your membership if the email has changed.</p>
              <div className="find-id-support-strip">
                For privacy, only your own registered email can reveal your member ID.
              </div>
              <div className="find-id-support-actions">
                <Button href="/#officers" variant="secondary">
                  Meet officers
                </Button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
