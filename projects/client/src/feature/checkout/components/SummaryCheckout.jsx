import { H3 } from "../../../components/Typo";
import { numberFormat } from "../../../helper/number_format";

function SummaryCheckout({ subTotal = 0, shipping = 0 }) {
  return (
    <div className="w-full sm:w-4/12">
      <H3>Order Summary</H3>
      <div className="border-b-8">
        <div className="flex justify-between rounded-md w-full gap-3 py-2 border-y">
          <p className="font-body">Subtotal</p>
          <p className="font-body">{numberFormat(subTotal)}</p>
        </div>
        <div className="flex justify-between rounded-md w-full gap-3 py-2 ">
          <p className="font-body">Shipping</p>
          <p className="font-body">{numberFormat(shipping)}</p>
        </div>
      </div>
      <div className="flex justify-between py-3 mb-3 rounded-md w-full gap-3 border-y">
        <p className="font-body">Total</p>
        <p className="font-body">{numberFormat(subTotal + shipping)}</p>
      </div>
      {
        subTotal > 0 && shipping > 0 && (
          <button
            className="px-3 py-2 flex items-center rounded-md bg-primaryLight text-white font-medium font-title hover:bg-primary w-full"
          >
            Create Order
          </button>
        )
      }
    </div>
  );
}

export default SummaryCheckout;