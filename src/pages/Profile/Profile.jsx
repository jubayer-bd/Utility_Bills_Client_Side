import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import {
  User,
  Mail,
  Camera,
  Calendar,
  Save,
  X,
  Edit3,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = "My Profile | UtilityBill";
  }, []);

  // Format "Member Since" date from Firebase metadata
  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photo.value;

    try {
      await updateUser({ displayName: name, photoURL });
      // Update local state context if needed (depending on your provider implementation)
      // setUser({ ...user, displayName: name, photoURL });

      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile details have been saved successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background:
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "#1f2937"
            : "#fff",
        color:
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "#fff"
            : "#000",
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Update Failed",
        text: "Could not update profile. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden"
      >
        {/* --- Header Banner --- */}
        <div className="h-48 bg-gradient-to-r from-primary to-secondary relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* --- Profile Content --- */}
        <div className="px-8 pb-8 relative">
          {/* Avatar & Action Button Row */}
          <div className="flex justify-between items-end -mt-16 mb-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-base-100 shadow-lg overflow-hidden bg-base-200">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/VqvjV4H/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Hover Hint for Photo */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" />
                </div>
              )}
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary rounded-xl gap-2 shadow-lg"
              >
                <Edit3 size={18} /> Edit Profile
              </button>
            )}
          </div>

          {/* --- Info / Edit Section Switcher --- */}
          <AnimatePresence mode="wait">
            {!isEditing ? (
              // VIEW MODE
              <motion.div
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-extrabold text-base-content flex items-center gap-2">
                    {user?.displayName || "Utility User"}
                    <ShieldCheck className="text-blue-500 w-6 h-6" />
                  </h1>
                  <p className="text-base-content/60 font-medium">
                    Utility Management Member
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-base-200">
                  <div className="p-4 rounded-2xl bg-base-200/50 flex items-center gap-4">
                    <div className="p-3 bg-base-100 rounded-xl text-primary shadow-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">
                        Email Address
                      </p>
                      <p className="text-base-content font-medium truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-base-200/50 flex items-center gap-4">
                    <div className="p-3 bg-base-100 rounded-xl text-secondary shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">
                        Member Since
                      </p>
                      <p className="text-base-content font-medium">
                        {joinDate}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // EDIT MODE
              <motion.form
                key="edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleUpdate}
                className="max-w-2xl"
              >
                <div className="grid gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      Edit Personal Details
                    </h3>
                    <p className="text-sm text-base-content/60">
                      Update your public profile information.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Full Name
                      </span>
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                        size={18}
                      />
                      <input
                        name="name"
                        type="text"
                        defaultValue={user?.displayName}
                        className="input input-bordered w-full pl-11 focus:input-primary bg-base-100"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Photo URL Input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Profile Image URL
                      </span>
                    </label>
                    <div className="relative">
                      <Camera
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                        size={18}
                      />
                      <input
                        name="photo"
                        type="url"
                        defaultValue={user?.photoURL}
                        className="input input-bordered w-full pl-11 focus:input-primary bg-base-100"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <label className="label">
                      <span className="label-text-alt text-base-content/50">
                        Paste a direct link to your image.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary px-8 rounded-xl"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <Save size={18} />
                    )}
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                    className="btn btn-ghost bg-base-200/50 hover:bg-base-200 rounded-xl"
                  >
                    <X size={18} /> Cancel
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
