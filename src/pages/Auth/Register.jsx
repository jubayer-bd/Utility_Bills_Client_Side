import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  User,
  Image as ImageIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

import { AuthContext } from "../../provider/AuthProvider";
import LoadingPage from "../../components/Loading";
import { app } from "../../Firebase/firebase.config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const { createUser, setLoading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setBtnLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    document.title = "Register | UtilityBill";
    const timer = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pass)) return "Must include an uppercase letter";
    if (!/[a-z]/.test(pass)) return "Must include a lowercase letter";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errorMsg = validatePassword(password);
    if (errorMsg) {
      setPasswordError(errorMsg);
      return;
    }
    setPasswordError("");
    setBtnLoading(true);
    setLoading(true);

    try {
      const res = await createUser(email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: photo || "",
      });
      setUser({ ...res.user, displayName: name, photoURL: photo || "" });
      toast.success("🎉 Registration successful!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message || "Registration failed!");
    } finally {
      setBtnLoading(false);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      toast.success("🎉 Logged in with Google!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed!");
    }
  };

  if (pageLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-300"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-base-content">
            Create Account
          </h2>
          <p className="text-sm text-base-content/60 mt-2">
            Get started with UtilityBill
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <User className="w-4 h-4 opacity-70" />
              <input
                type="text"
                placeholder="John Doe"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <ImageIcon className="w-4 h-4 opacity-70" />
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="grow"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </label>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
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
            <label
              className={`input input-bordered flex items-center gap-2 w-full ${
                passwordError ? "input-error" : ""
              }`}
            >
              <Lock className="w-4 h-4 opacity-70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none opacity-70 hover:opacity-100"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </label>
            {passwordError && (
              <p className="text-error text-xs mt-2 ml-1">{passwordError}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg mt-2"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                Register <UserPlus className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-200 hover:text-base-content hover:border-base-300"
        >
          <Chrome className="w-5 h-5" /> Continue with Google
        </button>

        <p className="text-center text-sm mt-6 text-base-content/70">
          Already have an account?{" "}
          <span
            className="text-primary font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
