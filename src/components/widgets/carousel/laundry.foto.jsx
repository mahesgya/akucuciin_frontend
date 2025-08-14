import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FotoCarousel = ( {img} ) => {

  const settings = {
    arrows: false, 
    dots: false,
    infinite: img.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-screen h-[280px] relative z-10 lg:h-[380px] lg:w-[85dvw] lg:self-center lg:rounded-[30px]">
      {img.length > 0 ? (
        <Slider {...settings}>
          {img.map((item) => (
            <div key={item.id}>
              <img src={`${process.env.REACT_APP_BASE_BACKEND_URL}/static/${item.filepath}`} alt="" className="rounded-b-[30px] w-screen h-[280px] object-cover hover:shadow-2xl transition-all duration-300 lg:h-[380px] lg:w-[85dvw] lg:self-center lg:object-cover lg:rounded-[30px]"/>
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
