import { useParams } from "react-router-dom";
import { API_URL } from "../common/constant/app.constant";
export const useSeatBooking = ({ selectedSeats }) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);

  const handleBooking = async (onClose) => {
    if (!tokenObj?.accessToken) {
      alert("Vui lòng đăng nhập để đặt vé");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenObj.accessToken}`,
        },
        body: JSON.stringify({
          eventId: Number(id),
          seats: selectedSeats.join(","),
          status: "Pending",
        }),
      });

      if (!response.ok) throw new Error("Đặt vé thất bại");
      const data = await response.json();
      console.log('Booking API response:', data);
      alert("Đặt vé thành công!");
      if (onClose) onClose(); // đóng modal nếu có
      // Trả về id booking
      return data?.data?.id;
    } catch (error) {
      alert(error.message);
    }
  };

  

  return { handleBooking };
};
