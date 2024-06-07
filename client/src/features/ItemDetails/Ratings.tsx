import { useMemo, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAppDispatch } from "../../store/hooks/hooks";
import { giveRating } from "../../store/slice/productDetail";
import { Button } from "../../components";

const Ratings = () => {
  const [ratedStars, setRatedStars] = useState<number>(0);
  const [starArray, setStarArray] = useState<boolean[]>([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmitRating = () => {
    if (ratedStars && !submittingReview) {
      setSubmittingReview(true);
      dispatch(giveRating(ratedStars));
    }
  };

  useMemo(() => {
    const starArray: boolean[] = [];
    for (let index = 0; index < 5; index++) {
      if (ratedStars > index) starArray.push(true);
      else starArray.push(false);
    }
    setStarArray(starArray);
  }, [ratedStars]);

  return (
    <div className="flex flex-col my-10 items-center md:mx-10 gap-y-4">
      <div className="text-gray-400 mb-1.5 text-lg no-underline">
        Rate Product
      </div>
      <div className="flex gap-x-4 items-center text-2xl md:text-4xl lg:text-5xl">
        {starArray.map((star, index) =>
          star ? (
            <AiFillStar
              key={index}
              className="text-yellow-500 cursor-pointer"
              data-fill={index + 1}
              onClick={() => setRatedStars(index + 1)}
            />
          ) : (
            <AiOutlineStar
              key={index}
              className="text-yellow-300 cursor-pointer "
              data-fill={index + 1}
              onClick={() => setRatedStars(index + 1)}
            />
          )
        )}
      </div>
      {ratedStars > 0 && (
        <Button
          type="button"
          text="submit"
          classes={`px-2.5 py-0.5 md:text-lg lg:text-xl  rounded-full flex justify-center items-center ${
            submittingReview
              ? "bg-gray-500"
              : "bg-orange-600 hover:bg-orange-500"
          }`}
          disabled={submittingReview}
          onclick={handleSubmitRating}
        />
      )}
    </div>
  );
};

export default Ratings;
