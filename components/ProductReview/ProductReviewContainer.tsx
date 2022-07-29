import { ProductReviewForm } from "../Forms/ProductReviewForm";
import { ProductReviewList } from "../ProductReview/ProductReviewList";

interface ProductReviewContainerProps {
  slug: string;
}

export const ProductReviewContainer = ({
  slug,
}: ProductReviewContainerProps) => {
  return (
    <div className="p-4 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <ProductReviewForm slug={slug} />
      </div>
      <div className="lg:col-span-7">
        <ProductReviewList slug={slug} />
      </div>
    </div>
  );
};
