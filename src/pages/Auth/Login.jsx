import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion"; // Animation
import { Mail, Lock, Eye, EyeOff, LogIn, Chrome } from "lucide-react"; // Icons
import toast from "react-hot-toast";

import { AuthContext } from "../../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import LoadingPage from "../../components/Loading";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const googleProvider = new GoogleAuthProvider();

  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    document.title = "Login | UtilityBill";
    const timer = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // 🔹 DEMO USER CREDENTIALS
  const fillDemoCredentials = () => {
    setEmail("admin@example.com"); 
    setPassword("John123"); 
    toast.success("Demo credentials filled!");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await signIn(email, password);
      toast.success("Login successful 🎉");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Invalid email or password!");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google 🎉");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed!");
    }
  };

  if (pageLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-300"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-base-content">Welcome Back</h2>
          <p className="text-sm text-base-content/60 mt-2">
            Login to manage your bills
          </p>
        </div>

        {/* 🔹 Demo Button */}
        <button
          onClick={fillDemoCredentials}
          className="btn btn-sm btn-accent btn-outline w-full mb-6 dashed border-2"
        >
          Use Demo Admin Credentials
        </button>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="form-control ">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <label className="input input-bordered flex items-center w-full gap-2">
              <Mail className="w-4 h-4 opacity-70" />
              <input
                type="email"
                placeholder="email@example.com"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <Lock className="w-4 h-4 opacity-70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none opacity-70 hover:opacity-100 transition-opacity"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </label>
            {/* <label className="label">
              <span className="label-text-alt link link-hover text-primary ml-auto">
                Forgot password?
              </span>
            </label> */}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={btnLoading}
            className="btn btn-primary w-full text-lg"
          >
            {btnLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                Login <LogIn className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-200 hover:text-base-content hover:border-base-300"
        >
          {/* Using Chrome icon as Lucide generic fallback, or keep FcGoogle if you prefer colored */}
          <Chrome className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6 text-base-content/70">
          Don’t have an account?{" "}
          <span
            className="text-primary font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
