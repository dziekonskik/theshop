import { DashboardShippingForm } from "../Forms/DashboardShippingForm";
import { OrderHistory } from "./OrderHistory";
import { UserDetails } from "./UserDetails";
import type { RenderedInfo } from "../../pages/auth/dashboard";

interface InformationPanelProps {
  setRenderedInfo: React.Dispatch<
    React.SetStateAction<RenderedInfo | undefined>
  >;
  renderedInfo: RenderedInfo | undefined;
  address: string[] | undefined;
  orders: string[] | undefined;
}

export const InformationPanel = (props: InformationPanelProps) => {
  const { renderedInfo, setRenderedInfo, address, orders } = props;

  return (
    <section className="flex-1 flex flex-col lg:max-h-[550px] overflow-y-auto scrollbar">
      {renderedInfo === "UserDetails" && (
        <UserDetails setRenderedInfo={setRenderedInfo} address={address} />
      )}
      {renderedInfo === "ShippingAdddress" && (
        <DashboardShippingForm setRenderedInfo={setRenderedInfo} />
      )}
      {renderedInfo === "OrderHIstory" && (
        <OrderHistory setRenderedInfo={setRenderedInfo} orderIds={orders} />
      )}
    </section>
  );
};
