import type { RenderedInfo } from "../../pages/auth/dashboard";

interface DashboardNavProps {
  setRenderedInfo: React.Dispatch<
    React.SetStateAction<RenderedInfo | undefined>
  >;
}

export const DashboardNavigation = ({ setRenderedInfo }: DashboardNavProps) => {
  return (
    <nav className="flex items-center lg:items-start flex-1 lg:ml-4 w-full">
      <ul className="font-comfortaa text-xl text-center lg:text-start w-full text-midnight">
        <li className="mt-10 lg:mt-14">
          <button onClick={() => setRenderedInfo("UserDetails")}>
            User details
          </button>
        </li>
        <li className="my-7">
          <button onClick={() => setRenderedInfo("ShippingAdddress")}>
            Shipping address
          </button>
        </li>
        <li>
          <button onClick={() => setRenderedInfo("OrderHIstory")}>
            Order history
          </button>
        </li>
      </ul>
    </nav>
  );
};
