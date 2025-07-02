const Toast = ({ type = "success", message, onClose }) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between space-x-4 animate-slide-in mt-16`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold">×</button>
    </div>
  );
};

export default Toast;
