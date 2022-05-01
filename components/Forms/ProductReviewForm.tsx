import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "../Forms/FormAtoms/FormInput";
import { useCreateProductReviewMutation } from "../../generated/graphql";

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
  const [createReview, { data }] = useCreateProductReviewMutation();
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
    createReview({
      variables: {
        review: {
          ...data,
          product: {
            connect: slug,
          },
        },
      },
    });
    reset();
  });
  return (
    <form onSubmit={onSubmit}>
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
      <input
        type="submit"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      />
    </form>
  );
};
