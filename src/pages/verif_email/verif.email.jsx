import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authService from "../../services/auth.services";

const EmailVerificationPage = () => {
  const { email } = useParams();

  const [timer, setTimer] = useState(() => {
    const storedEndTime = localStorage.getItem("resendEmailEndTime");
    if (storedEndTime) {
      const remainingTime = Math.floor((parseInt(storedEndTime) - Date.now()) / 1000);
      return remainingTime > 0 ? remainingTime : 0;
    }
    return 0;
  });

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            localStorage.removeItem("resendEmailEndTime");
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const resendVerificationEmail = async () => {
    if (timer > 0) return;
    await authService.resendEmail(email);

    const endTime = Date.now() + 60000;
    localStorage.setItem("resendEmailEndTime", endTime.toString());
    setTimer(60);
  };

  return (
    <div className="min-h-screen w-screen flex flex-row items-center justify-center">
      <img src="/Images/woman.png" alt="" className="hidden h-screen md:block md:w-[40%] object-fit" />
      <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-6 md:justify-center md:mt-0 md:mx-0 md:w-[60%]">
        <a href="/">
          <img alt="backbiru" src="/Images/backbiru.png" className="absolute top-8 left-5"></img>
        </a>
        <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem] md:w-[15rem]" />
        <div className="shadow-lg  rounded-lg p-4 flex flex-col items-center justify-center">
          <h1 className="font-quick text-xl font-bold text-[#687eff]">Verifikasi Email</h1>
          <p className="font-quick text-gray-600 text-center py-2 ">
            Kami telah mengirim email verifikasi ke: <strong>{email}</strong>
          </p>
          <p className="font-quick text-sm text-gray-500">Silakan cek email dan klik link verifikasinya.</p>

          <button onClick={resendVerificationEmail} className={`font-quick mt-4 px-4 py-2 text-white rounded-lg ${timer > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`} disabled={timer > 0}>
            {timer > 0 ? `Kirim ulang dalam ${timer}s` : "Kirim Ulang Email Verifikasi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
