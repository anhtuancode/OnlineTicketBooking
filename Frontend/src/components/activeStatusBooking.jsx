import React from "react";

const statusStyles = {
  Confirmed: {
    text: "Đã xác nhận",
    className: "bg-green-500 text-white",
  },
  Cancelled: {
    text: "Đã huỷ",
    className: "bg-red-500 text-white",
  },
  Pending: {
    text: "Chờ xác nhận",
    className: "bg-yellow-400 text-black",
  },
};

const ActiveStatusBooking = ({ status, onChange }) => {
  const current = statusStyles[status] || {
    text: "Không xác định",
    className: "bg-gray-200 text-black",
  };

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-1 rounded-full text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-400 ${current.className}`}
    >
      {Object.entries(statusStyles).map(([key, value]) => (
        <option key={key} value={key}>
          {value.text}
        </option>
      ))}
    </select>
  );
};

export default ActiveStatusBooking;
