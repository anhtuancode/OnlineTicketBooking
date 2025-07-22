import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react";
import { API_URL } from "../common/constant/app.constant";
import { loadStripe } from "@stripe/stripe-js";
import { helperFunction } from "../common/helpers/helper";
import { useNavigate } from "react-router-dom";


const stripePromise = loadStripe(
  "pk_test_51RlndDP0pDJOfzHuAPjSYCmLtPUE0hzuAiSqPKHn07Yiww0a8L97tGSUgMS84m5WgKpolNdSZr4DsHQBQEZS8GEX00oz0x26lW"
); // Thay bằng publishable key của bạn

// Gọi API thanh toán
const createPaymentIntent = async (id, amount) => {
  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);
  const res = await fetch(`${API_URL}/payment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenObj?.accessToken || ""}`,
    },
    body: JSON.stringify({
      amount,
      currency: "vnd",
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Thanh toán thất bại");
  return data;
};

// Cập nhật trạng thái đơn
const updateBookingStatus = async (id, status) => {
  const token = localStorage.getItem("token");
  const tokenObj = JSON.parse(token);
  const res = await fetch(`${API_URL}/booking/update-status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenObj?.accessToken || ""}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Cập nhật trạng thái thất bại");
  return data;
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { formatStartTime } = helperFunction();
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "VN",
    },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const tokenObj = JSON.parse(token);
        const res = await fetch(`${API_URL}/booking/${id}`, {
          headers: {
            Authorization: `Bearer ${tokenObj?.accessToken || ""}`,
          },
        });
        if (!res.ok) throw new Error("Không tìm thấy thông tin booking");
        const data = await res.json();
        console.log("Booking data:", data);
        setBooking(data.data); // <-- lấy đúng data.data
        // Điền sẵn email nếu có
        if (data.data?.userEmail) {
          setFormData((prev) => ({ ...prev, email: data.data.userEmail }));
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email là bắt buộc";
    if (!formData.cardNumber) newErrors.cardNumber = "Số thẻ là bắt buộc";
    if (!formData.expiryDate) newErrors.expiryDate = "Ngày hết hạn là bắt buộc";
    if (!formData.cvv) newErrors.cvv = "CVV là bắt buộc";
    if (!formData.cardholderName)
      newErrors.cardholderName = "Tên chủ thẻ là bắt buộc";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const amount = Math.round(booking.totalPrice * 100); // Tổng tiền cần thanh toán

      // Bước 1: Gọi API thanh toán
      const paymentResult = await createPaymentIntent(id, amount);
      console.log("Payment success:", paymentResult);

      // Bước 2: Nếu thành công thì cập nhật trạng thái booking
      await updateBookingStatus(id, "Confirmed");
      alert("Thanh toán thành công và đã xác nhận đơn!");

      navigate("/")
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">Đang tải thông tin đặt vé...</div>
    );
  if (!booking)
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy thông tin đặt vé!
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thanh Toán An Toàn
          </h1>
          <p className="text-gray-600">Hoàn tất đơn hàng của bạn</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tóm Tắt Đơn Hàng
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {booking?.eventTitle || "Không có tiêu đề sự kiện"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {booking?.eventLocation || ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    Thời gian:{" "}
                    {booking?.eventStartTime
                      ? formatStartTime(booking.eventStartTime)
                      : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    Khách: {booking?.userName || ""} ({booking?.userEmail || ""}
                    )
                  </p>
                </div>
                <span className="font-semibold text-gray-900">
                  {booking?.seats || 0} ghế
                </span>
              </div>
              <div className="flex justify-between items-center py-3 text-lg font-bold">
                <span>Tổng cộng</span>
                <span className="text-indigo-600 font-bold text-lg">
                  {booking?.totalPrice}đ
                </span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Bảo mật 256-bit SSL
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Thông tin của bạn được bảo vệ hoàn toàn
              </p>
            </div>
          </div>
          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Thông Tin Thanh Toán
                </h2>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Card Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số Thẻ
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength="19"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày Hết Hạn
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleExpiryChange}
                      maxLength="5"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.expiryDate ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength="4"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="123"
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên Chủ Thẻ
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cardholderName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="NGUYEN VAN A"
                  />
                  {errors.cardholderName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardholderName}
                    </p>
                  )}
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  Thông tin thanh toán của bạn được mã hóa và bảo mật
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Hoàn Tất Thanh Toán</span>
                  </div>
                )}
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-600">
                    Stripe Protected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
