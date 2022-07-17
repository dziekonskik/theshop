import { P24BankElement } from "@stripe/react-stripe-js";

export const P24Component = () => {
  return (
    <section className="w-full">
      <P24BankElement
        className="w-full p-3 shadow-sm bg-transparent border border-b-purple border-l-purple relative z-10"
        options={{
          classes: { focus: "bg-purple" },
          style: {
            base: {
              padding: "12px",
              fontFamily: "Anonymous Pro, sans-serif",
              fontSize: "16px",
              fontSmoothing: "antialiased",
              backgroundColor: "#E1EDED",
            },
          },
        }}
      />
    </section>
  );
};
