import { useState } from "react";
import { API_URL } from "../common/constant/app.constant";

const useEvent = () => {
  const [formData, setFormData] = useState({
  title: "",
  type: "movie",
  date: "",
  location: "",
  price: "",
  image: "",
  seats: "",
});
};

export default useEvent;
