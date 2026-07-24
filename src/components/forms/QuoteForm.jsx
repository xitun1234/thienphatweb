import { useState, useRef } from "react";
import Button from "../common/Button";
import { submitQuoteRequest } from "../../services/quoteService";

const PRODUCT_CATEGORIES = [
  "",
  "Dụng cụ nhà bếp",
  "Dụng cụ vệ sinh",
  "Sản phẩm lưu trữ",
  "Phụ kiện gia dụng",
  "Dụng cụ làm vườn",
  "Sản phẩm OEM theo yêu cầu",
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  company: "",
  productCategory: "",
  quantity: "",
  message: "",
  agreed: false,
};

const VIETNAMESE_PHONE_REGEX = /^0\d{9,10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name, value) {
  switch (name) {
    case "name": {
      if (!value.trim()) return "Vui lòng nhập họ và tên.";
      if (value.trim().length < 2) return "Họ và tên phải có ít nhất 2 ký tự.";
      return "";
    }
    case "phone": {
      if (!value.trim()) return "Vui lòng nhập số điện thoại.";
      if (!VIETNAMESE_PHONE_REGEX.test(value.trim()))
        return "Số điện thoại không hợp lệ (10-11 chữ số, bắt đầu bằng 0).";
      return "";
    }
    case "email": {
      if (!value.trim()) return "Vui lòng nhập email.";
      if (!EMAIL_REGEX.test(value.trim()))
        return "Email không hợp lệ.";
      return "";
    }
    case "productCategory": {
      if (!value) return "Vui lòng chọn nhóm sản phẩm quan tâm.";
      return "";
    }
    case "message": {
      if (!value.trim()) return "Vui lòng nhập nội dung yêu cầu.";
      if (value.trim().length < 10) return "Nội dung yêu cầu phải có ít nhất 10 ký tự.";
      return "";
    }
    case "agreed": {
      if (!value) return "Vui lòng đồng ý cung cấp thông tin để được tư vấn.";
      return "";
    }
    default:
      return "";
  }
}

function validateAll(formData) {
  const errors = {};
  const fields = ["name", "phone", "email", "productCategory", "message", "agreed"];
  for (const field of fields) {
    const error = validateField(field, formData[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [generalError, setGeneralError] = useState("");
  const nameInputRef = useRef(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (generalError) {
      setGeneralError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAll(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setGeneralError("");

      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField === "name") {
        nameInputRef.current?.focus();
      } else {
        const el = document.getElementById(`quote-${firstErrorField}`);
        el?.focus();
      }
      return;
    }

    setErrors({});
    setGeneralError("");
    setStatus("loading");

    try {
      await submitQuoteRequest({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        productCategory: formData.productCategory,
        quantity: formData.quantity.trim(),
        message: formData.message.trim(),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setGeneralError(
        err?.message || "Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau."
      );
    }
  };

  const handleReset = () => {
    setFormData({ ...INITIAL_FORM });
    setErrors({});
    setStatus("idle");
    setGeneralError("");
  };

  const isDisabled = status === "loading";

  /* ---- Success State ---- */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-[40px] text-center">
        <div
          className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-[24px]"
          style={{ backgroundColor: "#322d2a" }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3
          className="font-light leading-[1.2] mb-[12px]"
          style={{ fontSize: "clamp(22px, 3vw, 28px)", color: "#322d2a" }}
        >
          Yêu cầu đã được gửi!
        </h3>

        <p className="text-[15px] leading-relaxed text-[#555] max-w-[440px] mb-[28px]">
          Cảm ơn quý khách đã gửi yêu cầu. Chúng tôi sẽ liên hệ trong thời gian
          sớm nhất.
        </p>

        <Button variant="ghost" onClick={handleReset} ariaLabel="Gửi yêu cầu khác">
          Gửi yêu cầu khác
        </Button>
      </div>
    );
  }

  /* ---- Form State (idle / validation-error / loading / api-error) ---- */
  const inputBaseClasses =
    "w-full bg-transparent border-b border-[#322d2a] py-[12px] text-[16px] font-normal outline-none transition-[border-width] duration-150";

  const labelClasses =
    "block text-[13px] uppercase tracking-[0.08em] mb-[6px]";
  const labelColor = { color: "#8b8b8b" };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* General API error */}
      {generalError && (
        <div
          className="mb-[24px] text-[14px] px-[16px] py-[12px] rounded-[8px]"
          style={{
            color: "#b91c1c",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
          }}
          role="alert"
        >
          {generalError}
        </div>
      )}

      {/* Name */}
      <div className="mb-[24px]">
        <label htmlFor="quote-name" className={labelClasses} style={labelColor}>
          Họ và tên <span style={{ color: "#b91c1c" }}>*</span>
        </label>
        <input
          ref={nameInputRef}
          id="quote-name"
          type="text"
          className={inputBaseClasses}
          style={{
            borderColor: errors.name ? "#b91c1c" : "#322d2a",
            borderBottomWidth: errors.name ? "2px" : "1px",
          }}
          placeholder="Nguyễn Văn A"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          disabled={isDisabled}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "quote-name-error" : undefined}
        />
        <div
          id="quote-name-error"
          className="text-[14px] mt-[4px] min-h-[20px]"
          style={{ color: "#b91c1c" }}
          aria-live="polite"
        >
          {errors.name || ""}
        </div>
      </div>

      {/* Phone */}
      <div className="mb-[24px]">
        <label htmlFor="quote-phone" className={labelClasses} style={labelColor}>
          Số điện thoại <span style={{ color: "#b91c1c" }}>*</span>
        </label>
        <input
          id="quote-phone"
          type="tel"
          className={inputBaseClasses}
          style={{
            borderColor: errors.phone ? "#b91c1c" : "#322d2a",
            borderBottomWidth: errors.phone ? "2px" : "1px",
          }}
          placeholder="090xxxxxxx"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          disabled={isDisabled}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "quote-phone-error" : undefined}
        />
        <div
          id="quote-phone-error"
          className="text-[14px] mt-[4px] min-h-[20px]"
          style={{ color: "#b91c1c" }}
          aria-live="polite"
        >
          {errors.phone || ""}
        </div>
      </div>

      {/* Email */}
      <div className="mb-[24px]">
        <label htmlFor="quote-email" className={labelClasses} style={labelColor}>
          Email <span style={{ color: "#b91c1c" }}>*</span>
        </label>
        <input
          id="quote-email"
          type="email"
          className={inputBaseClasses}
          style={{
            borderColor: errors.email ? "#b91c1c" : "#322d2a",
            borderBottomWidth: errors.email ? "2px" : "1px",
          }}
          placeholder="email@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={isDisabled}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "quote-email-error" : undefined}
        />
        <div
          id="quote-email-error"
          className="text-[14px] mt-[4px] min-h-[20px]"
          style={{ color: "#b91c1c" }}
          aria-live="polite"
        >
          {errors.email || ""}
        </div>
      </div>

      {/* Company */}
      <div className="mb-[24px]">
        <label htmlFor="quote-company" className={labelClasses} style={labelColor}>
          Tên công ty hoặc cửa hàng
        </label>
        <input
          id="quote-company"
          type="text"
          className={inputBaseClasses}
          placeholder="Công ty TNHH ..."
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          disabled={isDisabled}
        />
      </div>

      {/* Product Category */}
      <div className="mb-[24px]">
        <label htmlFor="quote-productCategory" className={labelClasses} style={labelColor}>
          Nhóm sản phẩm quan tâm{" "}
          <span style={{ color: "#b91c1c" }}>*</span>
        </label>
        <select
          id="quote-productCategory"
          className={`${inputBaseClasses} appearance-none cursor-pointer`}
          style={{
            borderColor: errors.productCategory ? "#b91c1c" : "#322d2a",
            borderBottomWidth: errors.productCategory ? "2px" : "1px",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23322d2a' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 4px center",
            paddingRight: "28px",
          }}
          value={formData.productCategory}
          onChange={(e) => handleChange("productCategory", e.target.value)}
          disabled={isDisabled}
          aria-required="true"
          aria-invalid={!!errors.productCategory}
          aria-describedby={
            errors.productCategory ? "quote-productCategory-error" : undefined
          }
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "-- Chọn nhóm sản phẩm --"}
            </option>
          ))}
        </select>
        <div
          id="quote-productCategory-error"
          className="text-[14px] mt-[4px] min-h-[20px]"
          style={{ color: "#b91c1c" }}
          aria-live="polite"
        >
          {errors.productCategory || ""}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-[24px]">
        <label htmlFor="quote-quantity" className={labelClasses} style={labelColor}>
          Số lượng dự kiến
        </label>
        <input
          id="quote-quantity"
          type="text"
          className={inputBaseClasses}
          placeholder="Ví dụ: 1.000 sản phẩm"
          value={formData.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          disabled={isDisabled}
        />
      </div>

      {/* Message */}
      <div className="mb-[24px]">
        <label htmlFor="quote-message" className={labelClasses} style={labelColor}>
          Nội dung yêu cầu <span style={{ color: "#b91c1c" }}>*</span>
        </label>
        <textarea
          id="quote-message"
          className={`${inputBaseClasses} resize-y`}
          style={{
            minHeight: "100px",
            borderColor: errors.message ? "#b91c1c" : "#322d2a",
            borderBottomWidth: errors.message ? "2px" : "1px",
          }}
          placeholder="Mô tả sản phẩm, yêu cầu kỹ thuật, hoặc câu hỏi cần tư vấn..."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          disabled={isDisabled}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "quote-message-error" : undefined}
        />
        <div
          id="quote-message-error"
          className="text-[14px] mt-[4px] min-h-[20px]"
          style={{ color: "#b91c1c" }}
          aria-live="polite"
        >
          {errors.message || ""}
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="mb-[28px]">
        <label
          htmlFor="quote-agreed"
          className="flex items-start gap-[10px] cursor-pointer"
        >
          <div className="relative mt-[2px] flex-shrink-0">
            <input
              id="quote-agreed"
              type="checkbox"
              className="sr-only"
              checked={formData.agreed}
              onChange={(e) => handleChange("agreed", e.target.checked)}
              disabled={isDisabled}
              aria-required="true"
              aria-invalid={!!errors.agreed}
              aria-describedby={errors.agreed ? "quote-agreed-error" : undefined}
            />
            <div
              className={`w-[22px] h-[22px] flex items-center justify-center border transition-colors duration-150 ${
                errors.agreed ? "border-[#b91c1c]" : "border-[#322d2a]"
              }`}
              style={{
                backgroundColor: formData.agreed ? "#322d2a" : "transparent",
              }}
            >
              {formData.agreed && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2 6 5 9 10 3" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-[14px] md:text-[15px] leading-relaxed" style={{ color: "#322d2a" }}>
            Tôi đồng ý cung cấp thông tin trên để Xưởng Gia Dụng Thiên Phát liên
            hệ tư vấn.
          </span>
        </label>
        <div
          id="quote-agreed-error"
          className="text-[14px] mt-[4px] min-h-[20px]"
          style={{ color: "#b91c1c" }}
          aria-live="polite"
        >
          {errors.agreed || ""}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="filled"
        disabled={isDisabled}
        ariaLabel={isDisabled ? "Đang gửi yêu cầu" : "Gửi yêu cầu báo giá"}
      >
        {isDisabled ? "Đang gửi..." : "Gửi yêu cầu"}
      </Button>
    </form>
  );
}
