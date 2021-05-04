import React, { useState, useMemo, useCallback } from "react";
import "./InputRating.css";

const iconCount = [1, 2, 3, 4, 5];
function InputRating({ setRatingValue }) {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = React.useState(0);
  return (
    <div className="text-center my-2" title="Rating">
      <h1>Star rating:</h1>
      {iconCount.map((circle, index) => {
        const ratingValue = index + 1;
        return (
          <RatingIcon
            key={index}
            ratingValue={ratingValue}
            setRating={setRating}
            hover={hover}
            rating={rating}
            setHover={setHover}
            setRatingValue={setRatingValue}
          />
        );
      })}
    </div>
  );
}
export default InputRating;

const RatingIcon = ({
  ratingValue,
  rating,
  setRating,
  hover,
  setHover,
  setRatingValue,
}) => {
  const ratingIcon = useCallback(() => {
    setRating(ratingValue);
    setRatingValue(ratingValue);
  }, [ratingValue]);
  const iconClass = useMemo(
    () =>
      `fa${
        ratingValue <= (hover || rating) ? "s" : "r"
      } fa-star px-1 cursor-pointer fa-sm`,
    [ratingValue, hover, rating]
  );
  return (
    <label>
      <input
        className="cursor-pointer"
        style={{ display: "none" }}
        type="radio"
        name="rating"
        value={ratingValue}
        onClick={ratingIcon}
      />
      <Icon
        iconClass={iconClass}
        setHover={setHover}
        ratingValue={ratingValue}
      />
    </label>
  );
};
const Icon = ({ iconClass, setHover, ratingValue }) => {
  const hoverIcon = useCallback(
    (value) => {
      setHover(value);
    },
    [setHover]
  );
  return (
    <i
      className={iconClass}
      onMouseEnter={() => hoverIcon(ratingValue)}
      onMouseLeave={() => hoverIcon(null)}
    ></i>
  );
};
