import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

const ForgotPassword = () => {
  const { resetPassword, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // prefill email from login page
  const passedEmail = location.state?.email || "";
  const [email, setEmail] = useState(passedEmail);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (passedEmail) setEmail(passedEmail);
  }, [passedEmail]);

  function handleReset(e) {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email.");

    setSending(true);

    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! 📧");
        setTimeout(() => {
          window.location.href = "https://mail.google.com"; // ✅ redirect to Gmail
        }, 1500);
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong!");
      })
      .finally(() => {
        setSending(false);
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Enter your email</span>
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn btn-primary w-full"
          >
            {sending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
