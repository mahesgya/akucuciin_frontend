import { FaRegClock, FaTruckMoving, FaTint, FaBoxOpen, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

export const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "#FC8621",
    Icon: FaRegClock,
  },
  penjemputan: {
    label: "Penjemputan",
    color: "rgba(87, 143, 202, 0.85)", 
    Icon: FaTruckMoving,
  },
  pencucian: {
    label: "Pencucian",
    color: "#578FCA",
    Icon: FaTint,
  },
  pengantaran: {
    label: "Pengantaran",
    color: "#578FCA",
    Icon: FaBoxOpen,
  },
  selesai: {
    label: "Selesai",
    color: "#40A578",
    Icon: FaCheckCircle,
  },
  batal: {
    label: "Dibatalkan",
    color: "#E52020",
    Icon: FaTimesCircle,
  },
  kesalahan: {
    label: "Kesalahan",
    color: "#B0B0B0", 
    Icon: FaExclamationTriangle,
  },
  default: {
    label: "Status Tidak Diketahui",
    color: "#888888",
    Icon: FaExclamationTriangle,
  },
};

export const filterOptions = ["all", ...Object.keys(STATUS_CONFIG).filter(k => k !== 'default')];