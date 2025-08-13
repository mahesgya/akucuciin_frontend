import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LaundryCard from "../card/laundry";

const LaundryCarousel = ( {data, city, setActiveLaundry} ) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isSingleItem = data.length === 1

  const CustomPrevArrow = (props) => (
    <button
      className="absolute -left-[30px] lg:-left-[150px] bottom-10 transform -translate-y-1/2 bg-indigo-500 text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-all focus:outline-none active:scale-90 z-10"
      onClick={props.onClick}
    >
      ◀
    </button>
  );

  const CustomNextArrow = (props) => (
    <button
      className="absolute -right-[30px] lg:-right-[150px] bottom-10 transform -translate-y-1/2 bg-indigo-500 text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-all focus:outline-none active:scale-90 z-10"
      onClick={props.onClick}
    >
      ▶
    </button>
  );

  const settings = {
    dots: false,
    infinite: !isSingleItem,
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
    if (data.length > 0) {
      setActiveLaundry(data[activeIndex]?.id);
    }
  }, [activeIndex, data, setActiveLaundry]);

  return (
    <div className="w-[300px] overflow-visible relative z-20">
      <h2 className="font-quick text-2xl font-bold text-center  md:text-3xl  lg:text-3xl">Mitra Laundry di {city}</h2>
      <h2 className="font-normal text-center font-quick text-[12px] mb-3 md:mb-4">Silahkan pilih mitra unggulan anda</h2>

      {data.length > 0 ? (
        <Slider {...settings}>
          {data.map((item) => (
            <div key={item.id}>
              <LaundryCard
                id={item.id} 
                name={item.name}
                address={item.address}
                description={item.description}
                image={item.image.filepath}
                area={item.area}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Tidak ada mitra laundry yang tersedia di {city}.</p>
      )}
      
    </div>
  );
};

export default LaundryCarousel;
