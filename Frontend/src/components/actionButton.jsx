const UserActions = ({ onView ,onEdit, onDelete }) => {
  return (
    <div>
      <button
        onClick={onView}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded mr-3"
      >
        Xem
      </button>
      <button
        onClick={onEdit}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded mr-3"
      >
        Sửa
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
      >
        Xóa
      </button>
    </div>
  );
};

export default UserActions;