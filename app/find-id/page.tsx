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
            <p>Enter the email you used to register and we&apos;ll show your member ID.</p>
            <div className="find-id-badges">
              <span>Secure lookup</span>
              <span>One-step form</span>
            </div>
          </div>

          <div className="find-id-hero-meta">
            <div className="find-id-metric-grid" aria-label="lookup highlights">
              <div className="find-id-metric">
                <strong>Secure</strong>
                <span>Encrypted lookup</span>
              </div>
              <div className="find-id-metric">
                <strong>Fast</strong>
                <span>Instant response</span>
              </div>
            </div>

            <Button href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </header>

        <section className="find-id-grid" aria-live="polite">
          <article className="find-id-card">
            <div className="find-id-card-heading">
              <h2>Email lookup</h2>
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

              <Button className="find-id-submit" type="submit" disabled={result.status === "loading"}>
                {result.status === "loading" ? "Looking up..." : "Find my ID"}
              </Button>
            </form>

            <p className="find-id-note">
              Tip: Enter the exact email used during your membership registration.
            </p>

            {result.status !== "idle" && (
              <div className={`find-id-status status-${result.status}`} role="status">
                <p className="find-id-status-title">
                  {result.status === "success" && "Lookup complete"}
                  {result.status === "loading" && "Checking records"}
                  {result.status === "error" && "No result found"}
                </p>
                <p>{result.message}</p>
                {result.memberId && (
                  <div className="find-id-result">
                    <span>Member ID</span>
                    <strong>{result.memberId}</strong>
                  </div>
                )}
              </div>
            )}
          </article>

          <aside className="find-id-aside">
            <section className="find-id-panel">
              <h2>How this works</h2>
              <p>Retrieve your ID in a few quick steps.</p>

              <ol className="find-id-steps">
                <li>
                  <span>1</span>
                  <div>
                    <h3>Enter your email</h3>
                    <p>Use the address associated with your CNCP registration.</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <h3>Start the lookup</h3>
                    <p>We securely check your record in the membership database.</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <h3>Get your ID</h3>
                    <p>Your member ID appears instantly when your email matches.</p>
                  </div>
                </li>
              </ol>
            </section>

            <section className="find-id-panel find-id-support">
              <h2>Need help?</h2>
              <p>If you still cannot locate your ID, contact a CNCP officer for assistance.</p>
              <div className="find-id-support-strip">Support hours: Weekdays, 8:00 AM to 5:00 PM</div>
              <div className="find-id-support-actions">
                <Button href="mailto:cncp@support.local" variant="secondary">
                  Email Support
                </Button>
                <Button href="/" variant="primary">
                  Return Home
                </Button>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
