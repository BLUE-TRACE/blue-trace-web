const CircularProgress = ({ percentage }) => {
  const isAtRisk = percentage < 50;
  const color = isAtRisk ? "#ef4444" : "#00E5FF";
  const r = 48;
  const circumference = 2 * Math.PI * r; // 301.59
  const filled = (percentage / 100) * circumference;
  const empty = circumference - filled;
  // Start from left (9 o'clock) so arc goes across the top
  const offset = circumference * 0.25;

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width:120, height: 120 }}
    >
      <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="60" cy="60" r={r}
          fill="none"
          stroke="#2a2a3a"
          strokeWidth="10"
        />
        <circle
          cx="60" cy="60" r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute text-base font-bold"
        style={{ color: color }}
      >
        {percentage}%
      </span>
    </div>
  );
}

function StatBox({ label, value, valueColor }) {
  return (
    <div
      className="rounded-lg p-3"
      style={{ backgroundColor: "#0f0f1e" }}
    >
      <p className="text-xs mb-1" style={{ color: "#666" }}>
        {label}
      </p>
      <p className="text-base font-bold" style={{ color: valueColor || "#ffffff" }}>
        {value}
      </p>
    </div>
  );
}

export default function StudentReportCard({
  subjectCode,
  lecturerName,
  totalPlanned,
  finished,
  pending,
  attended,
  absent,
  status,
  percentage,
}) {
  const isAtRisk = status === "At Risk";
  const statusColor = isAtRisk ? "#ff1744" : "#00e676";

  return (
    <div
      className="rounded-2xl p-6 flex gap-6 items-center"
      style={{ backgroundColor: "#2A2A2A" }}
    >
      {/* Left — subject info + stats */}
      <div className="flex-1">
        <p className="text-base font-bold mb-1" style={{ color: "#ffffff" }}>
          {subjectCode}
        </p>
        <p className="text-sm mb-5" style={{ color: "#888" }}>
          Lecturer Name&nbsp;&nbsp;&nbsp;: {lecturerName}
        </p>

        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <StatBox label="Total planned" value={totalPlanned} valueColor="#ffffff" />
          <StatBox label="Finished" value={finished} valueColor="#ffd600" />
          <StatBox label="Pending" value={pending} valueColor="#ffd600" />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-3">
          <StatBox label="Attended" value={attended} valueColor="#ffd600" />
          <StatBox label="Absent" value={absent} valueColor="#ff1744" />
          <StatBox label="Status" value={status} valueColor={statusColor} />
          
        </div>
      </div>

      {/* Right — circular progress */}
      <CircularProgress percentage={percentage} />
    </div>
  );
}
