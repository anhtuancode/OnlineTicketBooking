import { API_URL } from "../common/constant/app.constant";
import { useState } from "react";
export const useTicket = () => {
  const [selectedSeats, setSelectedSeats] = useState(["B4", "B5", "B6"]);
  const rows = ["C", "B", "A"];
  const seatsPerRow = 8;

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return { selectedSeats, toggleSeat, setSelectedSeats, rows, seatsPerRow};
};
