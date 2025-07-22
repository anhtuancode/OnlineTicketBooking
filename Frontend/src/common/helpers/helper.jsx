export const helperFunction = () => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Format startTime về dạng HH:mm
  const formatStartTime = (startTimeString) => {
    if (!startTimeString) return "";
    // Nếu là chuỗi "08:00" thì trả về luôn
    if (/^\d{2}:\d{2}$/.test(startTimeString)) return startTimeString;
    // Nếu là ISO string, parse lấy giờ phút
    const date = new Date(startTimeString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  

  return {
    formatDate,
    formatStartTime,
  }
};

