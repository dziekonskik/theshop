import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "../Forms/FormAtoms/FormInput";
import {
  useCreateProductReviewMutation,
  usePublishReviewByIdMutation,
  GetReviewsForProductSlugDocument,
  GetReviewsForProductSlugQuery,
} from "../../generated/graphql";
import { Button } from "../ButtonsAndLinks/Button";
import useMediaQuery from "../../util/useMediaquery";

const reviewFormSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  headline: yup.string().required(),
  content: yup.string().required(),
  rating: yup.number().min(1).max(5).required(),
});

type FormData = yup.InferType<typeof reviewFormSchema>;

interface ProductReviewProps {
  slug: string;
}

export const ProductReviewForm = (slug: ProductReviewProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const matches = useMediaQuery("(max-width: 1023px)");
  useEffect(() => {
    if (matches) setIsMobile(true);
  }, [matches]);

  const [createReview, createdReview] = useCreateProductReviewMutation();
  const [publishReview, { error }] = usePublishReviewByIdMutation({
    // refetchQueries: [
    //   { query: GetReviewsForProductSlugDocument, variables: slug },
    // ],
    update(cache, result) {
      const publishedReviewsQuery =
        cache.readQuery<GetReviewsForProductSlugQuery>({
          query: GetReviewsForProductSlugDocument,
          variables: slug,
        });

      if (!publishedReviewsQuery || !publishedReviewsQuery.product?.reviews) {
        return;
      }

      const updatedPublishedReviewsQuery = {
        ...publishedReviewsQuery,
        product: {
          ...publishedReviewsQuery.product,
          reviews: [
            ...publishedReviewsQuery.product?.reviews,
            result.data?.publishReview,
          ],
        },
      };

      cache.writeQuery({
        query: GetReviewsForProductSlugDocument,
        variables: slug,
        data: updatedPublishedReviewsQuery,
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(reviewFormSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    const { data: reviewData } = await createReview({
      variables: {
        review: {
          ...data,
          product: {
            connect: slug,
          },
        },
      },
    });
    publishReview({
      variables: { reviewId: { id: reviewData?.createReview?.id } },
      optimisticResponse: {
        publishReview: {
          __typename: "Review",
          ...data,
          id: `-${Math.random()}`,
        },
      },
    });
    reset();
  });

  if (error) {
    return <div>error</div>;
  }
  return (
    <form className="w-full">
      <FormInput
        label="email"
        type="email"
        register={register}
        errors={errors}
        placeholder="Email"
      />
      <FormInput
        label="rating"
        type="number"
        register={register}
        errors={errors}
        placeholder="Rating"
      />
      <FormInput
        label="name"
        type="text"
        register={register}
        errors={errors}
        placeholder="Name"
      />
      <FormInput
        label="headline"
        type="text"
        register={register}
        errors={errors}
        placeholder="Title"
      />
      <FormInput
        label="content"
        type="textarea"
        register={register}
        errors={errors}
        placeholder="Description"
      />
      <Button
        type="submit"
        onClick={onSubmit}
        bgColor="#F4F3FF"
        fullWidth={isMobile}
      >
        Submit
      </Button>
    </form>
  );
};
