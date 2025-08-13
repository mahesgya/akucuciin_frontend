import { useState, useEffect } from "react";

const TrackOrderTimeline = ({ status }) => {
  const [orderPhases, setOrderPhases] = useState([]);

  useEffect(() => {
    const basePhases = [
      "Pembuatan order",
      "Penjemputan",
      "Penimbangan dan pencucian",
      "Pengantaran",
      "Selesai"
    ];

    const statusOrderMap = {
      pending: 0,
      penjemputan: 1,
      pencucian: 2,
      pengantaran: 3,
      selesai: 4
    };

    const currentIndex = statusOrderMap[status] ?? 0;

    const phases = basePhases.map((phase, index) => ({
      name: phase,
      isPassed: index <= currentIndex
    }));

    setOrderPhases(phases);
  }, [status]);

  return (
      <div className="flex flex-col items-start mt-4 w-full">
        {orderPhases.map((phase, index) => (
          <div key={index} className="flex items-start relative mb-6">
            {index !== orderPhases.length - 1 && (
              <span className={`absolute left-[8px] top-6 w-1 h-full ${phase.isPassed ? 'bg-[#687EFF]' : 'bg-gray-300'}`} />
            )}

            <span
              className={`w-5 h-5 font-['Montserrat'] rounded-full z-10 mt-1 mr-4 ${
                phase.isPassed ? 'bg-[#687EFF]' : 'bg-gray-300'
              }`}
            ></span>

            <span
              className={`font-['Montserrat'] lg:text-lg text-sm ${
                phase.isPassed ? 'text-black font-semibold' : 'text-gray-400'
              }`}
            >
              {phase.name}
            </span>
          </div>
        ))}
    </div>
  );
};

export default TrackOrderTimeline