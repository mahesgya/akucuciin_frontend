import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const END_DATE = "2025-08-27T23:59:59+07:00";
const END_DATE_NGEKOS = "2025-09-09T23:59:59+07:00";
const START_DATE = "2025-07-27T00:00:00+07:00";

const VOUCHERS = [
  { code: "AKUMABA", start: START_DATE, end: END_DATE, accent: "indigo" },
  { code: "AKUNGEKOS", start: START_DATE, end: END_DATE_NGEKOS, accent: "fuchsia" },
];

const TERMS = [
  { id: 1, title: "Voucher hanya berlaku 1x pakai untuk 1 akun", desc: "Jika pesanan dibatalkan, voucher tidak dapat digunakan kembali untuk akun tersebut." },
  { id: 2, title: "Diskon acak hingga 62%", desc: "Setiap pengguna yang memasukkan kode akan memperoleh nominal diskon acak. Cek di halaman detail order setelah pemesanan." },
  { id: 3, title: "Masa berlaku", desc: "Voucher berlaku pada 27 Juli 2025 hingga 27 Agustus 2025 sesuai zona waktu WIB." },
  { id: 4, title: "Tidak dapat digabung dengan promo lain", desc: "Kode ini tidak bisa digabung dengan promo atau kode voucher lainnya." },
  { id: 5, title: "Penggunaan melanggar akan dibatalkan", desc: "Penyalahgunaan seperti spam akun atau manipulasi transaksi akan dibatalkan secara sepihak oleh Akucuciin." },
  { id: 6, title: "Tidak dapat diuangkan", desc: "Voucher tidak dapat ditukar dengan uang tunai atau dikembalikan." },
];

function useCountdown(targetIso) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds, finished: diff <= 0 };
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center px-3">
      <div className="text-2xl sm:text-3xl font-bold tabular-nums dark:text-dark-text">{value}</div>
      <div className="text-[11px] sm:text-xs text-gray-600 dark:text-dark-text/70">{label}</div>
    </div>
  );
}

function Chevron({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d={open ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SnkVoucherGacha() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0); 
  const [copied, setCopied] = useState(false);
  const [openId, setOpenId] = useState(1);

  const activeVoucher = VOUCHERS[activeIdx];
  const { days, hours, minutes, seconds, finished } = useCountdown(activeVoucher.end);

  const activeWindowText = useMemo(() => {
    const start = new Date(activeVoucher.start);
    const end = new Date(activeVoucher.end);
    const fmt = (d) => d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
    return `${fmt(start)} — ${fmt(end)} WIB`;
  }, [activeVoucher]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeVoucher.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const accentBg = activeVoucher.accent === "fuchsia" ? "from-fuchsia-600" : "from-indigo-600";
  const accentSolid = activeVoucher.accent === "fuchsia" ? "bg-fuchsia-600 hover:bg-fuchsia-700" : "bg-indigo-600 hover:bg-indigo-700";
  const accentChip = activeVoucher.accent === "fuchsia" ? "bg-fuchsia-100 text-fuchsia-700" : "bg-indigo-100 text-indigo-700";
  const accentDot = activeVoucher.accent === "fuchsia" ? "bg-fuchsia-500" : "bg-indigo-500";

  return (
    <div className='font-["Montserrat"] min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:bg-dark-bg dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg dark:text-dark-text'>
      <header className="relative">
        <div
          className={`absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${
            activeVoucher.accent === "fuchsia" ? "from-fuchsia-200/60" : "from-indigo-200/60"
          } via-white to-white dark:from-black/20 dark:via-transparent dark:to-transparent`}
        />

        <button
          onClick={() => navigate(-1)}
          aria-label="Kembali"
          className="absolute top-4 left-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur border border-gray-200 dark:border-neutral-700 hover:shadow-md transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </button>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20">
          <div className="text-center">
            <div className="mx-auto mb-4 inline-flex items-center rounded-2xl p-1 bg-white/80 dark:bg-dark-card/80 border border-gray-200 dark:border-neutral-700 gap-1">
              {VOUCHERS.map((v, i) => {
                const active = i === activeIdx;
                return (
                  <button
                    key={v.code}
                    onClick={() => setActiveIdx(i)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${active ? "text-white " + accentSolid : "text-gray-700  hover:bg-gray-100 dark:text-gray-800 dark:hover:text-gray-300 dark:hover:bg-dark-card-darker"}`}
                  >
                    {v.code}
                  </button>
                );
              })}
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${accentChip} text-xs font-semibold`}>
              Voucher Gacha
              <span className={`inline-flex h-2 w-2 rounded-full ${accentDot} animate-pulse`} />
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Gunakan Kode <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accentBg} to-fuchsia-600`}>{activeVoucher.code}</span> dan raih diskon hingga 62%
            </h1>

            <div className="mt-6 mx-auto max-w-md rounded-2xl bg-white/70 dark:bg-dark-card/60 backdrop-blur border border-gray-200 dark:border-neutral-700 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg sm:text-xl font-bold tracking-widest dark:text-dark-text">{activeVoucher.code}</div>
                <button onClick={handleCopy} className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${copied ? "bg-emerald-500 text-white" : `${accentSolid} text-white`}`}>
                  {copied ? "Tersalin" : "Salin Kode"}
                </button>
              </div>
              <div className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-dark-text/80">Periode: {activeWindowText}</div>
              <div className="mt-4 flex items-center justify-center">
                {finished ? (
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">Promo berakhir</span>
                ) : (
                  <div className="flex items-center divide-x divide-gray-200 dark:divide-neutral-700 rounded-xl bg-gray-50 dark:bg-dark-card-darker px-2 py-1">
                    <Stat label="hari" value={String(days).padStart(2, "0")} />
                    <Stat label="jam" value={String(hours).padStart(2, "0")} />
                    <Stat label="menit" value={String(minutes).padStart(2, "0")} />
                    <Stat label="detik" value={String(seconds).padStart(2, "0")} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Syarat & Ketentuan</h2>
        <p className="text-gray-600 dark:text-dark-text/80 mb-6">Baca ringkasannya di bawah ini. Klik baris untuk membuka detail.</p>

        <div className="space-y-3">
          {TERMS.map((t) => {
            const open = openId === t.id;

            const accentBorderOpen = activeVoucher.accent === "fuchsia" ? "border-fuchsia-300 dark:border-fuchsia-400/40" : "border-indigo-300 dark:border-indigo-400/40";
            const accentTextOpen = activeVoucher.accent === "fuchsia" ? "text-fuchsia-600 dark:text-fuchsia-300" : "text-indigo-700 dark:text-indigo-300";

            return (
              <div
                key={t.id}
                className={`rounded-xl border transition-colors
          ${open ? `${accentBorderOpen} bg-indigo-50/60 dark:bg-dark-card-darker` : "border-gray-200 bg-white dark:border-neutral-700 dark:bg-dark-card"}`}
              >
                <button onClick={() => setOpenId(open ? 0 : t.id)} className="w-full flex items-center justify-between gap-4 px-4 bg-white dark:border-neutral-700 dark:bg-dark-card sm:px-5 py-4" aria-expanded={open}>
                  <div
                    className={`text-sm sm:text-base font-semibold
              ${open ? accentTextOpen : "text-gray-800 dark:text-dark-text"}`}
                  >
                    {t.id}. {t.title}
                  </div>
                  <div className={`text-gray-500 dark:text-gray-300 ${open ? "rotate-180" : ""} transition-transform`}>
                    <Chevron open={open} />
                  </div>
                </button>

                {open && <div className="px-4 sm:px-5 pb-4 -mt-1 text-sm sm:text-base text-gray-700 dark:text-dark-text/90">{t.desc}</div>}
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 p-4 bg-white dark:bg-dark-card">
            <div className="text-sm text-gray-500 dark:text-dark-text/70">Kode</div>
            <div className="text-xl font-bold tracking-widest mt-1 dark:text-dark-text">{activeVoucher.code}</div>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 p-4 bg-white dark:bg-dark-card">
            <div className="text-sm text-gray-500 dark:text-dark-text/70">Periode Berlaku</div>
            <div className="text-base font-semibold mt-1 dark:text-dark-text">{activeWindowText}</div>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-dark-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-lg sm:text-xl font-bold dark:text-dark-text">Siap coba peruntunganmu?</div>
            <div className="text-sm text-gray-600 dark:text-dark-text/80">Masukkan kode di halaman checkout dan lihat potongan yang kamu dapat.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
