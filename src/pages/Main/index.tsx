import React from "react";
import Slider from "../../components/Slider";
import BrandsSlider from "../../components/BrandsSlider";
export const Main: React.FC = () => {
  const slides = [
    {
      id: 1,
      title: "Big title for you",
      discription:
        "Профессиональные стойки и аксессуары Gravity концерна Adam Hall Group",
      img: "../../assets/photo/1.jpg",
    },
    {
      id: 2,
      title: "Gravity",
      discription:
        "Профессиональные стойки и аксессуары Gravity концерна Adam Hall Group",
      img: "../../assets/photo/2.jpg",
    },
    {
      id: 3,
      title: "Big titler for you",
      discription:
        "Профессиональные стойки и аксессуары Gravity концерна Adam Hall Group",
      img: "../../assets/photo/2.jpg",
    },

    {
      id: 4,
      title: "Big titles for you",
      discription:
        "Профессиональные стойки и аксессуары Gravity концерна Adam Hall Group",
      img: "../../assets/photo/2.jpg",
    },
    {
      id: 5,
      title: "Big for you",
      discription:
        "Профессиональные стойки и аксессуары Gravity концерна Adam Hall Group",
      img: "../../assets/photo/2.jpg",
    },
  ];

  return (
    <>
      <Slider SliderInfo={slides} />
      <BrandsSlider />
    </>
  );
};

export default Main;
