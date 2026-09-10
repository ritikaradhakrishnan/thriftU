import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const requestOtp = async () => {
    setError("");
    setStatus("");

    if (!user.email) {
      setError("Add your email first so thriftU knows where to send the code.");
      return;
    }

    setIsSendingOtp(true);
    try {
      const res = await newRequest.post("/auth/request-otp", {
        email: user.email,
      });
      const devCode = res.data?.devOtp ? ` Dev code: ${res.data.devOtp}` : "";
      setStatus(`Code sent to ${user.email}.${devCode}`);
    } catch (err) {
      setError(err.response?.data || "Could not send the code. Try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!otp.trim()) {
      setError("Enter the email code before creating your account.");
      return;
    }

    setIsRegistering(true);
    try {
      const url = file ? await upload(file) : "";
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
        otp,
      });
      navigate("/")
    } catch (err) {
      setError(err.response?.data || "Could not create the account. Check the code and try again.");
    } finally {
      setIsRegistering(false);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <div className="otpRow">
            <input
              value={otp}
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="6-digit code"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="button" onClick={requestOtp} disabled={isSendingOtp}>
              {isSendingOtp ? "Sending..." : "Send code"}
            </button>
          </div>
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          {status && <p className="formStatus">{status}</p>}
          {error && <p className="formError">{error}</p>}
          <button type="submit" disabled={isRegistering}>
            {isRegistering ? "Creating..." : "Register"}
          </button>
        </div>
        <div className="right">
          <h1>I want to become a thriftU seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
