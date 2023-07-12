import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../images/banner/slide_1.avif";
import slide2 from "../images/banner/slide_2.avif";
import slide3 from "../images/banner/slide_3.avif";
import particle from "../images/particle.png";
import { Link } from "react-router-dom";

const Slide = ({
  src,
  title = "We Help You Make Modern Interior",
  description = "We will help you to make an elegant and luxurios interior designed by professional interior designer",
}) => {
  return (
    <div className="slide flex sm:flex-row flex-col relative">
      <div className="slide-content sm:w-3/12 w-full flex flex-col relative">
        <div className="absolute pt-3 sm:p-0 rounded-sm w-full h-[220px] top-1/2 transform sm:-translate-y-1/2 sm:right-[-20%] flex items-center right-0">
          <img src={particle} alt="particle" className="w-28 absolute -top-28 -left-10 animate-slide z-3" />
          <div className="py-6 px-3 bg-white bg-opacity-50 backdrop-filter backdrop-blur-none sm:backdrop-blur-md flex flex-col gap-1">
            <h3 className="sm:text-5xl text-3xl font-bold mb-5 font-title text-primaryLight">{title}</h3>
            <p className="text-lg font-body">{description}</p>
            <Link to="/products" className="px-6 py-2 bg-primary font-title w-fit rounded-sm text-white">
              See More
            </Link>
          </div>
        </div>
      </div>

      <div className="sm:w-9/12 w-full">
        <img src={src} className="sm:h-[650px] h-[450px] object-cover w-full" alt="Slide 1" />
      </div>
    </div>
  );
};
const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3500,
    autoplay: true,
    fade: true,
    cssEase: "linear",
    appendDots: (dots) => <ul className="custom-dots">{dots}</ul>,
    customPaging: (i) => (
      <div className="custom-dot">
        <span className="dot" />
      </div>
    ),
  };

  const images = [slide1, slide2, slide3];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <Slide key={index} src={image} />
      ))}
    </Slider>
  );
};

export default Carousel;
