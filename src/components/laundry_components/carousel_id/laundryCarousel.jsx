import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LaundryCarousel = ( {img} ) => {


  const CustomPrevArrow = (props) => (
    <button
      className="absolute -left-[30px] lg:-left-[150px] bottom-12 transform -translate-y-1/2 text-white bg-indigo-500 text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all focus:outline-none active:scale-90 z-10"
      onClick={props.onClick}
    >
      ◀
    </button>
  );

  const CustomNextArrow = (props) => (
    <button
      className="absolute -right-[30px] lg:-right-[150px] bottom-12 transform -translate-y-1/2 text-white bg-indigo-500 text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all focus:outline-none active:scale-90 z-10"
      onClick={props.onClick}
    >
      ▶
    </button>
  );

  const settings = {
    dots: false,
    infinite: img.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };



  return (
    <div className="w-[300px] overflow-visible relative z-20">
      {img.length > 0 ? (
        <Slider {...settings}>
          {img.map((item) => (
            <div key={item.id}>
              <img src={`${process.env.REACT_APP_BASE_BACKEND_URL}/static/${item.filepath}`} alt="" className="w-[320px] h-[180px] object-cover border-4 border-indigo-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"/>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Tidak ada foto laundry.</p>
      )}
      
    </div>
  );
};

export default LaundryCarousel;
