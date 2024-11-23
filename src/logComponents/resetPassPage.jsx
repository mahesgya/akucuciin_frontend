import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { email, reset_password_token } = useParams();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password harus sama.");
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/request-reset-password/customer/${email}/${reset_password_token}`,
        {
          password,
          confirm_password: confirmPassword,
        }
      );

      setMessage(
        "Password berhasil diubah. Anda akan diarahkan ke halaman login."
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setMessage(error.response.data.message || "Terjadi kesalahan.");
      } else {
        setMessage("Gagal terhubung ke server. Coba lagi nanti.");
      }
    }
  };

  return (
    <div>
      <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8">
        <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem]" />
        <div className="flex flex-col items-center justify-center space-y-5">
          <h4 className="font-sans font-semibold text-[20px] text-gray55 text-center">
            Silahkan Masukkan Password Baru Anda untuk {`${email}`}
          </h4>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col align-center justify-center items-center"
          >
            <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
              <img src="/images/passwordReg.png" alt="" className="w-[25px]" />
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="h-[10px] flex justify-center align-center"
              >
                {showPassword ? (
                  <img
                    src="/images/invisible.png"
                    className="w-[25px]"
                    alt=""
                  />
                ) : (
                  <img
                    src="/images/visible.png"
                    className="w-[25px]"
                    alt=""
                  />
                )}
              </button>
            </div>
            <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
              <img src="/images/passwordReg.png" alt="" className="w-[25px]" />
              <input
                required
                type={showPassword2 ? "text" : "password"}
                name="confirm_password"
                placeholder="Masukkan Password Kembali"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="h-[10px] flex justify-center align-center"
              >
                {showPassword2 ? (
                  <img src="/images/invisible.png" className="w-[25px]" alt="" />
                ) : (
                  <img src="/images/visible.png" className="w-[25px]" alt="" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="shadow-md font-sans w-[10rem] bg-blue-500 text-white font-semibold py-4 px-4  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
          {message && <p className="text-red-500">{message}</p>}{" "}
          {/* Tampilkan pesan */}
        </div>
      </div>
    </div>
  );
}

export default ResetPassPage;
