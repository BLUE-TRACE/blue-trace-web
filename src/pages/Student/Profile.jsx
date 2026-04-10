import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [macAddress, setMacAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isValidMac = (mac) => {
    const regex = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
    return regex.test(mac);
  };

  const handleRegisterDevice = async () => {
    if (!isValidMac(macAddress)) {
      setError("Invalid MAC address format");
      return;
    }

    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/register-device",
        {
          studentId: user.id, // ensure this matches backend
          macAddress: macAddress,
        },
      );

      setMessage(res.data.message);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("Network error");
      }
    }
  };

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <div className="max-w-xl p-6 mx-auto bg-[#2A2A2A] rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-bold">My Profile</h2>

        {/* User Info */}
        <div className="mb-6 space-y-2">
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Student ID:</strong> {user?.id}
          </p>
        </div>

        {/* Device Registration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Register Device</h3>

          <input
            type="text"
            placeholder="Enter MAC Address (e.g. AA:BB:CC:DD:EE:FF)"
            value={macAddress}
            onChange={(e) => setMacAddress(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded focus:outline-none focus:border-cyan-400"
          />

          <button
            onClick={handleRegisterDevice}
            className="w-full py-3 font-semibold text-white bg-cyan-600 rounded hover:bg-cyan-700"
          >
            Register Device
          </button>

          {/* Messages */}
          {message && <p className="text-green-400">{message}</p>}
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
