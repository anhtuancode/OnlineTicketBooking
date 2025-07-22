import React from "react";
import { helperFunction } from "../common/helpers/helper";
import { useSeatBooking } from "../hooks/useSeatBooking";
import { useNavigate } from "react-router-dom";

export default function SeatBookingModal({
  open,
  onClose,
  event,
  selectedSeats,
  onSelectSeat,
  rows,
  seatsPerRow,
}) {
  const navigate = useNavigate();
  const { handleBooking } = useSeatBooking({ selectedSeats });
  const { formatStartTime } = helperFunction();

  if (!open) return null;

  // Hàm toggle ghế
  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      onSelectSeat(selectedSeats.filter((s) => s !== seat));
    } else {
      onSelectSeat([...selectedSeats, seat]);
    }
  };

  // Hàm xác nhận đặt vé
  const handleConfirmBooking = async () => {
    const bookingId = await handleBooking(onClose);
    if (bookingId) {
      navigate(`/payment/${bookingId}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 z-10 w-full max-w-2xl">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-black"
          onClick={onClose}
        >
          ×
        </button>
        {/* Movie/Event Info */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-32 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg flex items-center justify-center text-white font-bold overflow-hidden">
            {event?.image ? (
              <img
                src={event.image}
                alt="Poster"
                className="w-full h-full object-cover"
              />
            ) : (
              "POSTER"
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {event?.title}
            </h3>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
              Thời lượng: {event?.showTim} phút
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
              Thời gian: {formatStartTime(event?.startTime)}
            </p>
          </div>
        </div>
        {/* Selected Seats Display */}
        <div className="bg-gradient-to-r from-gray-100 to-white rounded-2xl p-4 border border-gray-300 mb-6 shadow-inner">
          <p className="text-gray-800 font-semibold mb-2 text-center">
            Ghế đã chọn:
          </p>
          <div className="text-center">
            {selectedSeats.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-2">
                {selectedSeats.map((seat) => (
                  <span
                    key={seat}
                    className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 italic">Chưa chọn ghế nào</span>
            )}
          </div>
        </div>
        {/* Screen */}
        <div className="text-center mb-6">
          <p className="text-gray-700 text-sm mb-2 font-medium">Màn hình</p>
          <div className="h-2 bg-gradient-to-r from-gray-600 to-black rounded-full shadow-lg mx-auto max-w-md"></div>
        </div>
        {/* Seat Map */}
        <div className="bg-white rounded-2xl p-4 shadow-inner border border-gray-200 mb-4">
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row} className="flex items-center justify-center gap-3">
                <span className="w-6 text-center font-bold text-gray-800">
                  {row}
                </span>
                <div className="flex gap-2">
                  {[...Array(seatsPerRow)].map((_, i) => {
                    const seat = `${row}${i + 1}`;
                    const isSelected = selectedSeats.includes(seat);
                    // TODO: isBooked logic nếu có
                    return (
                      <button
                        key={seat}
                        onClick={() => toggleSeat(seat)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                          isSelected
                            ? "bg-black text-white shadow-gray-400"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
                <span className="w-6 text-center font-bold text-gray-800">
                  {row}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-2 text-sm mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded border border-gray-300"></div>
            <span className="text-gray-600">Có thể chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-black rounded"></div>
            <span className="text-gray-600">Đã chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span className="text-gray-600">Đã đặt</span>
          </div>
        </div>
        {/* Confirm Button */}
        <div className="mt-4 text-center">
            <button
              disabled={selectedSeats.length === 0}
              onClick={handleConfirmBooking}
              className={`bg-black hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                selectedSeats.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Xác nhận đặt vé ({selectedSeats.length} ghế)
            </button>
        </div>
      </div>
    </div>
  );
}
