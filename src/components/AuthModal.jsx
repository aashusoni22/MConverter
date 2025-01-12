import React, { useContext, useState } from "react";
import { X, Loader2, Github } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const AuthModal = ({
  isOpen,
  onClose,
  initialMode = "signin",
  onSignupComplete,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signIn, signUp, signInWithGoogle, signInWithGithub } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(formData.email, formData.password);
        onClose();
      } else {
        await signUp(formData.email, formData.password);
        onSignupComplete();
        onClose();
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSocialAuth = async (provider) => {
    try {
      setLoading(true);
      await (provider === "google" ? signInWithGoogle() : signInWithGithub());
      onClose();
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        setError(
          `An account already exists with the same email address but different sign-in credentials. Sign in using the original provider.`
        );
      } else if (err.code === "auth/credential-already-in-use") {
        setError(
          `This account is already connected to another social provider. Please sign in with the original provider.`
        );
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("Sign in was cancelled. Please try again.");
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="relative p-8">
          <button
            onClick={onClose}
            className={`absolute right-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {mode === "signin" ? "Welcome back" : "Get started"}
            </h2>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {mode === "signin"
                ? "Sign in to your account to continue"
                : "Create a new account to get started"}
            </p>
          </div>

          {error && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm flex items-start ${
                isDarkMode
                  ? "bg-red-900/30 text-red-200 border border-red-800"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
            >
              <div className="shrink-0 mr-2">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-sm">{error}</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleSocialAuth("google")}
              className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-colors ${
                isDarkMode
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>

            <button
              onClick={() => handleSocialAuth("github")}
              className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-colors ${
                isDarkMode
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-4 ${
                  isDarkMode
                    ? "bg-gray-900 text-gray-400"
                    : "bg-white text-gray-500"
                }`}
              >
                or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 transition-colors font-medium"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mx-auto animate-spin" />
              ) : mode === "signin" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {mode === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
