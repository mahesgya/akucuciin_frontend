import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FotoCarousel = ( {img} ) => {

  const settings = {
    dots: false,
    infinite: img.length > 1,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-screen h-[240px] relative z-10 lg:h-[300px]">
      {img.length > 0 ? (
        <Slider {...settings}>
          {img.map((item) => (
            <div key={item.id}>
              <img src={`${process.env.REACT_APP_BASE_BACKEND_URL}/static/${item.filepath}`} alt="" className="w-screen h-[240px] object-cover hover:shadow-2xl transition-all duration-300 lg:h-[300px] lg:w-screen lg:object-cover"/>
            </div>
          ))}  
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Tidak ada foto laundry.</p>
      )}
      
    </div>
  );
};

export default FotoCarousel;
