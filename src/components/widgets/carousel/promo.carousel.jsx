import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PromoCarousel = ( {img} ) => {

  const settings = {
    dots: false,
    infinite: img.length > 1,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-screen h-[250px] relative z-10 lg:h-[300px] lg:w-[800px]">
      {img.length > 0 ? (
        <Slider {...settings}>
          {img.map((item) => (
            <div key={item.id} className="lg:w-[800px]">
              <img src={`${process.env.REACT_APP_BASE_FRONTEND_URL}/Images/promo/${item.filename}`} alt="" className="rounded-b-[30px] shadow-lg w-screen h-[250px] object-fit hover:shadow-2xl transition-all duration-300 lg:h-[300px] lg:w-![800px] lg:object-cover lg:shadow-none lg:hover:shadow-none lg:rounded-[20px]"/>
            </div>
          ))}  
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Tidak ada promo.</p>
      )}
      
    </div>
  );
};

export default PromoCarousel;
