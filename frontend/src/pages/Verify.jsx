import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom theme colors
const COLORS = {
  green: '#4ade80', // light green
  blue: '#60a5fa',  // light blue
  bg: '#f0fdf4',    // very light green background
  card: '#e0f2fe',  // very light blue card
  text: '#0f172a',  // dark text
};

const Verify = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const appointmentId = query.get("appointmentId");
  const success = query.get("success");

  const [status, setStatus] = useState("pending"); // pending, success, failed, cancelled, invalid

  useEffect(() => {
    if (!appointmentId) {
      setStatus("invalid");
      return;
    }

    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/verifystripe`,
          { appointmentId, success }
        );

        if (data.success) {
          setStatus("success");
          toast.success("✅ Payment successful! Appointment confirmed.", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { background: COLORS.green, color: COLORS.text }
          });
          setTimeout(() => navigate('/my-appointments'), 3000);
        } else {
          setStatus("failed");
          toast.error(data.message || "Payment verification failed", {
            position: "top-center",
            autoClose: 3500,
            theme: "colored",
            style: { background: COLORS.card, color: COLORS.text }
          });
        }
      } catch (err) {
        setStatus("failed");
        toast.error(err.response?.data?.message || "Verification failed", {
          position: "top-center",
          autoClose: 3500,
          theme: "colored",
          style: { background: COLORS.card, color: COLORS.text }
        });
      }
    };

    if (success === "true") {
      verifyPayment();
    } else if (success === "false") {
      setStatus("cancelled");
      toast.info("Payment was cancelled", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        style: { background: COLORS.blue, color: COLORS.text }
      });
    } else {
      setStatus("invalid");
    }
  }, [appointmentId, success, navigate]);

  const statusMessages = {
    pending: {
      title: "Verifying your payment...",
      icon: "⏳",
      className: "text-blue-500"
    },
    success: {
      title: "Payment Successful!",
      message: "Your appointment has been confirmed.",
      icon: "✅",
      className: "text-green-600"
    },
    failed: {
      title: "Payment Verification Failed",
      message: "We could not verify your payment. Please contact support.",
      icon: "❌",
      className: "text-red-600"
    },
    cancelled: {
      title: "Payment Cancelled",
      message: "You cancelled the payment. No appointment was booked.",
      icon: "⚠️",
      className: "text-yellow-600"
    },
    invalid: {
      title: "Invalid Request",
      message: "Missing or invalid payment information.",
      icon: "🚫",
      className: "text-gray-600"
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${COLORS.bg} 60%, ${COLORS.card} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <ToastContainer transition={Slide} />
      <div
        style={{
          background: COLORS.card,
          borderRadius: '1.5rem',
          boxShadow: '0 8px 32px 0 rgba(16, 185, 129, 0.15), 0 1.5px 8px 0 rgba(96, 165, 250, 0.10)',
          padding: '2.5rem 2rem',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          border: `2px solid ${COLORS.green}`,
        }}
      >
        <div
          style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            color: status === "success" ? COLORS.green : status === "pending" ? COLORS.blue : status === "failed" ? "#f87171" : "#facc15"
          }}
        >
          {statusMessages[status]?.icon}
        </div>
        <h2
          className={`text-2xl font-bold mb-2 ${statusMessages[status]?.className}`}
          style={{
            color:
              status === "success"
                ? COLORS.green
                : status === "pending"
                ? COLORS.blue
                : status === "failed"
                ? "#ef4444"
                : status === "cancelled"
                ? "#facc15"
                : "#64748b"
          }}
        >
          {statusMessages[status]?.title}
        </h2>
        {statusMessages[status]?.message && (
          <p className="mt-4 text-base" style={{ color: COLORS.text }}>
            {statusMessages[status]?.message}
          </p>
        )}
        {status === "success" && (
          <p className="mt-2 text-sm" style={{ color: "#64748b" }}>
            You will be redirected to your appointments shortly...
          </p>
        )}
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center'
          }}
        >
          <a
            href="/"
            style={{
              color: COLORS.blue,
              textDecoration: 'underline',
              fontWeight: 500,
              fontSize: '1rem'
            }}
          >
            Back to Home
          </a>
          <a
            href="/my-appointments"
            style={{
              color: COLORS.green,
              textDecoration: 'underline',
              fontWeight: 500,
              fontSize: '1rem'
            }}
          >
            My Appointments
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          div[style*="max-width: 400px"] {
            padding: 1.5rem 0.5rem !important;
            max-width: 95vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Verify;