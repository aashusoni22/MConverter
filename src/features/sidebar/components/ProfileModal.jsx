import React, { useState, useContext, useEffect } from "react";
import { User, Mail, Moon, Sun, X, LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";

const ProfileModal = ({ isOpen, onClose, isNewUser = false }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOut, updateUserProfile } = useAuth();
  const isDarkTheme = theme === "dark";

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
  });

  const [isEditing, setIsEditing] = useState(isNewUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing && !isNewUser) return;

    setError("");
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: formData.displayName,
      });
      setIsEditing(false);
      if (!isNewUser) {
        onClose();
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-md ${
          isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {isNewUser ? "Complete Your Profile" : "Profile Settings"}
            </h2>
            {!isNewUser && (
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  {isDarkTheme ? (
                    <Sun className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            )}
          </div>

          {error && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                isDarkTheme
                  ? "bg-red-900/30 text-red-200"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {error}
            </div>
          )}

          {isNewUser && (
            <p
              className={`mb-4 text-sm ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Please enter your display name to complete your profile setup
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Display Name
              </label>
              <div className="relative">
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkTheme
                      ? "bg-gray-800 border-gray-700 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Your name"
                  required={isNewUser}
                />
                <User
                  className={`w-5 h-5 absolute left-3 top-2.5 ${
                    isDarkTheme ? "text-gray-500" : "text-gray-400"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    isDarkTheme
                      ? "bg-gray-700 border-gray-600 text-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-500"
                  } cursor-not-allowed`}
                />
                <Mail
                  className={`w-5 h-5 absolute left-3 top-2.5 ${
                    isDarkTheme ? "text-gray-500" : "text-gray-400"
                  }`}
                />
              </div>
              <p
                className={`mt-1 text-sm ${
                  isDarkTheme ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Email cannot be changed
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              {!isNewUser && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-2 ${
                    isDarkTheme
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              )}
              <button
                type="submit"
                disabled={(!isEditing && !isNewUser) || loading}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
