const VerifyModal = ({ onClose }) => {
    return (
      <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">Verifikasi Berhasil!</h2>
          <p className="text-gray-600 text-center">
            Silakan cek email Anda untuk aktivasi akun.
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
  export default VerifyModal;
  