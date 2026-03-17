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
            <Button href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </header>

        <section className="find-id-card" aria-live="polite">
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

            <Button type="submit" disabled={result.status === "loading"}>
              {result.status === "loading" ? "Looking up..." : "Find my ID"}
            </Button>
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
        </section>
      </div>
    </main>
  );
}
