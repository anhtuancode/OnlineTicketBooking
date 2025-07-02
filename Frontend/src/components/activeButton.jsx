import React from "react";

const ActiveButton = ({ isDeleted, onClick }) => {
  const active = isDeleted === 1;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
        active
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-black"
      }`}
    >
      {active ? "Hoạt động" : "Chưa hoạt động"}
    </button>
  );
};

export default ActiveButton;