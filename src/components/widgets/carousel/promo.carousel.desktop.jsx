import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PromoCarouselDesktop = ({ img, className = "" }) => {
  const settings = {
    dots: false,
    infinite: img.length > 1,
    speed: 600,
    slidesToShow: 1,
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
    <div className={`w-full ${className}`}>
      {img.length > 0 ? (
        <Slider {...settings} className="w-full">
          {img.map((item) => (
            <div key={item.id} className="w-full">
              <img
                src={`${process.env.REACT_APP_BASE_FRONTEND_URL}/Images/promo/${item.filename}`}
                alt=""
                className="h-[290px] w-full object-fit rounded-[20px]"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Tidak ada promo.</p>
      )}
    </div>
  );
};

export default PromoCarouselDesktop;
