import { useGetReviewsForProductSlugQuery } from "../../generated/graphql";
import { ProductReviewItem } from "./ProductReviewItem";

interface ProductReviewListProps {
  slug: string;
}

export const ProductReviewList = ({ slug }: ProductReviewListProps) => {
  const { data } = useGetReviewsForProductSlugQuery({ variables: { slug } });

  if (!data?.product) return null;

  return (
    <ul className="max-h-[700px] overflow-auto p-4">
      {data.product.reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
};
