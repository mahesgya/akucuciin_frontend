import React from "react";

const CloseModal = ({ onClose }) => {
    return (
      <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
          <h2 className="text-xl text-blue-500 font-sans font-bold mb-4 text-center">Mohon maaf pemesanan sedang kami tutup sementara</h2>
          <p className="text-gray-600 text-center">
           Kami akan buka kembali pada tanggal 30 Desember 2025, Ditunggu yaa!
          </p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    );
  };
  export default CloseModal;
  