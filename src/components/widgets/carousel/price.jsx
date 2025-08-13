import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";

const PriceCarousel = ({ data, setActivePaket }) => {
  const packages = data.packages;
  const [activeIndex, setActiveIndex] = useState(0);

  const CustomPrevArrow = (props) => (
    <button
      className="absolute -left-[30px] lg:-left-[150px] bottom-20 transform -translate-y-1/2 bg-[#F0EDFF] text-gray-500 text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all focus:outline-none active:scale-90 z-10"
      onClick={props.onClick}
    >
      ◀
    </button>
  );

  const CustomNextArrow = (props) => (
    <button
      className="absolute -right-[30px] lg:-right-[150px] bottom-20 transform -translate-y-1/2  bg-[#F0EDFF] text-gray-500 text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all focus:outline-none active:scale-90 z-10"
      onClick={props.onClick}
    >
      ▶
    </button>
  );

  const settings = {
    dots: false,
    infinite: packages.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex), 

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

    useEffect(() => {
      if (packages.length > 0) {
        setActivePaket(packages[activeIndex]?.id);
      }
    }, [activeIndex, packages, setActivePaket]);

  return (
    <div className="w-[300px] overflow-visible relative z-20 bg-[#F0EDFF]">
      {packages.length > 0 ? (
        <Slider {...settings}>
          {packages.map((item) => (
            <div key={item.id} className="w-[300px] p-6 rounded-lg  transition-all hover:scale-105 ">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#231D4F]">
                  Rp {item.price_text.toLocaleString()}
                  <span className="text-sm font-normal"> /kg</span>
                </h3>

                <p className="text-lg font-semibold mt-2">{item.name}</p>

                <p className="text-sm text-gray-600 mt-1">{item.description}</p>

                <div className="pt-4 space-y-2">
                  {item.features.map((fitur, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">✔</span>
                      <p>{fitur}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Tidak ada price list.</p>
      )}
    </div>
  );
};

export default PriceCarousel;
