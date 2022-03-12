interface TheDotsProps {
  condition: boolean;
}

export const PaginationDots = ({ condition }: TheDotsProps) => {
  return condition ? (
    <>
      <span className="mx-1 font-bold">.</span>
      <span className="mx-1 font-bold text-indigo-600">.</span>
      <span className="mx-1 font-bold">.</span>
    </>
  ) : null;
};
