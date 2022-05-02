import { ReviewContentFragment } from "../../generated/graphql";

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}
export const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  const isOptimistic = review.id.startsWith("-");
  return (
    <li
      className={`mx-auto shadow-yellow-100 shadow-md p-4 rounded-md drop-shadow-xl bg-yellow-100 mb-5 ${
        isOptimistic ? "opacity-50" : ""
      }`}
    >
      <h3 className="font-play text-xl font-semibold">{review.headline}</h3>
      <div>{review.rating}</div>
      <p className="text-lg my-2">{review.content}</p>
      <footer className="">{review.name}</footer>
    </li>
  );
};
