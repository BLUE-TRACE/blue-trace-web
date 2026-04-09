import DateTimeWidget from "../../components/DateTimeWidget";

const RealTimeMonitoring = () => {
  const data = {
    totalUsers: 100,
    admin: 2,
    students: 90,
    lecturers: 8,
    percentage: 78,
    activeLectures: 4,
    totalLectures: 12,
  };

  const r = 48;
  const circumference = 2 * Math.PI * r;
  const filled = (data.percentage / 100) * circumference;
  const offset = circumference * 0.25;
  const color = data.percentage < 50 ? "#ef4444" : "#00E5FF";

  return (
    <div className="flex flex-col gap-4 mb-4 text-white">

      {/* Top Section */}
      <div className="flex flex-row gap-16 p-6">
        <DateTimeWidget />

        {/* Filters */}
    <div className="flex flex-col gap-6 mb-4">

  <div className="flex items-center">
    <label className="w-40 text-sm text-gray-300">
      Faculty
    </label>

    <select className="bg-gray-700 px-3 py-2 rounded w-60">
      <option>Select Faculty</option>
    </select>
  </div>

  <div className="flex items-center">
    <label className="w-40 text-sm text-gray-300">
      Department
    </label>

    <select className="bg-gray-700 px-3 py-2 rounded w-60">
      <option>Select Department</option>
    </select>
  </div>

</div>
      </div>

      {/* Main Card */}
      <div
        className="rounded-2xl p-6 flex gap-6 items-center"
        style={{ backgroundColor: "#2A2A2A" }}
      >

        {/* LEFT SIDE */}
        <div className="flex-1">
          <p className="text-base font-bold mb-2">
            Number of Active Users
          </p>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-[#0f0f1e] p-2 rounded">
              <p>Total Users</p>
              <p className="font-bold">{data.totalUsers}</p>
            </div>

            <div className="bg-[#0f0f1e] p-2 rounded">
              <p className="text-red-500">Admin</p>
              <p className="font-bold">{data.admin}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#0f0f1e] p-2 rounded">
              <p className="text-blue-400">Students</p>
              <p className="font-bold">{data.students}</p>
            </div>

            <div className="bg-[#0f0f1e] p-2 rounded">
              <p className="text-yellow-300">Lecturers</p>
              <p className="font-bold">{data.lecturers}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="rounded-2xl p-6 flex gap-6 items-center"
          style={{ backgroundColor: "#2A2A2A" }}
        >

          {/* Circular Progress */}
          <div className="flex flex-col items-center">
            <p className="mb-2">Scheduled Lectures Today</p>

            <div className="relative" style={{ width: 120, height: 120 }}>
              <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  fill="none"
                  stroke="#2a2a3a"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  fill="none"
                  stroke={color}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>

              <span
                className="absolute font-bold"
                style={{
                  color: color,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {data.percentage}%
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-2">
            <div className="bg-[#0f0f1e] p-2 rounded">
              <p>Scheduled Lectures Today</p>
              <p className="font-bold">{data.totalLectures}</p>
            </div>

            <div className="bg-[#0f0f1e] p-2 rounded">
              <p className="text-cyan-400">Active Lectures</p>
              <p className="font-bold">{data.activeLectures}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;