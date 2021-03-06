import React from "react";

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return <div className="text-blue font-bold">{rating}</div>;
};
