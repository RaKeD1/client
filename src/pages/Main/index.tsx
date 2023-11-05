import React, { useEffect } from "react";
import Slider from "../../components/common/Slider";
import BrandsSlider from "../../components/BrandsSlider";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { fetchSliderHome } from "../../redux/reducers/SliderSlice";
export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSliderHome());
  }, []);
  const slides = useAppSelector((state) => state.sliders.sliderHome);
  return (
    <>
      {slides ? <Slider SliderInfo={slides} urlOf={"slider"} /> : ""}
      <BrandsSlider />
    </>
  );
};

export default Main;
