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
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-screen h-[280px] relative z-10 lg:h-[300px]">
      {img.length > 0 ? (
        <Slider {...settings}>
          {img.map((item) => (
            <div key={item.id}>
              <img src={`https://akucuciin.com/Images/promo/${item.filename}`} alt="" className="rounded-b-[30px] shadow-lg w-screen h-[280px] object-fit hover:shadow-2xl transition-all duration-300 lg:h-[300px]  lg:object-cover"/>
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
