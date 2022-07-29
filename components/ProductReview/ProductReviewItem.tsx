import { ReviewContentFragment } from "../../generated/graphql";
import { Rating } from "../Product/ProductRating";

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}
export const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  const isOptimistic = review.id.startsWith("-");
  return (
    <li
      className={`mx-auto p-4 font-comfortaa rounded-md drop-shadow-xl bg-bubble-gum mb-5 bg-opacity-70 ${
        isOptimistic ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-play text-lg font-semibold capitalize">
          {review.headline}
        </h3>
        <span className="flex items-center font-anonymous">
          <span className="mr-2 ">rating:</span>{" "}
          <Rating rating={review.rating as number} />
        </span>
      </div>
      <p className="my-2">{review.content}</p>
      <footer className="text-sm font-anonymous">{review.name}</footer>
    </li>
  );
};
