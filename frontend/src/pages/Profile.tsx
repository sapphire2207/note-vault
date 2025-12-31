import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Camera, Key, LogOut, User, Mail, Shield, AlertTriangle } from "lucide-react";

export default function Profile() {
  const { user, logout, updateAvatar, changePassword } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (avatar) {
      const previewUrl = URL.createObjectURL(avatar);
      setAvatarPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [avatar]);

  const handleAvatarUpdate = async () => {
    if (!avatar) return;

    try {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatar);

      await updateAvatar(formData);
      setAvatar(null);
      setAvatarPreview(null);
      alert("Avatar updated successfully ✅");
    } catch {
      alert("Failed to update avatar ❌");
    } finally {
      setAvatarLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword) {
      alert("Both fields are required ❗");
      return;
    }

    try {
      setPasswordLoading(true);
      await changePassword(oldPassword, newPassword);

      setOldPassword("");
      setNewPassword("");
      alert("Password updated successfully ✅");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Incorrect old password ❌");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">

          {/* HEADER */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-2">Manage your profile and security settings</p>
          </div>

          {/* PROFILE INFO */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  {avatarPreview || user?.avatar?.url ? (
                    <img
                      src={avatarPreview || user?.avatar?.url}
                      alt="Avatar"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}

                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-3 cursor-pointer hover:bg-blue-700 transition shadow-lg">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>

                {avatar && (
                  <button
                    onClick={handleAvatarUpdate}
                    disabled={avatarLoading}
                    className={`px-6 py-2.5 rounded-lg font-semibold transition shadow-lg
                      ${avatarLoading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30"
                      }`}
                  >
                    {avatarLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      "Update Avatar"
                    )}
                  </button>
                )}
              </div>

              {/* User info */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Username
                  </label>
                  <input
                    disabled
                    value={user?.username || ""}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    disabled
                    value={user?.email || ""}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PASSWORD CHANGE */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
            </div>

            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handlePasswordUpdate}
                disabled={passwordLoading}
                className={`px-6 py-3 rounded-lg font-semibold transition shadow-lg
                  ${passwordLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30"
                  }`}
              >
                {passwordLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating Password...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Update Password
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="bg-white rounded-xl border-2 border-red-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Once you log out, you'll need to sign in again to access your notes.
            </p>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout from Account
            </button>
          </div>

        </div>
      </main>
    </>
  );
}