import { numberFormat } from "../../../helper/number_format";

function TransactionItem({ transaction, setTrigger }) {
  const {
    id_transaction,
    createdAt,
    is_approve,
    is_sending,
    is_accepted,
    is_canceled,
    total_price,
    transaction_product_rlts,
    payment_proof,
  } = transaction;

  const { product } = transaction_product_rlts[0];
  
  let status = is_canceled ? "Canceled" : is_accepted ? "Success" : is_sending ? "On Delivery" : is_approve ? "On Process" : "Waiting admin approval";
  if (!payment_proof) status = "Waiting for Payment";

  return (
    <div className="flex flex-col gap-1 shadow p-2 rounded-md shadow-gray-200 border">
      <div className="flex sm:flex-row flex-col gap-3">
        <div className="hidden sm:flex"><span className="font-bold pr-1">Order ID:</span> {id_transaction}</div>
        <div><span className="font-bold sm:ml-auto ml-0 pr-1">Date: </span> {createdAt.slice(0, 10)}</div>
        <div><span className="font-bold sm:ml-auto ml-0 pr-1">Status:  </span> {status}</div>
      </div>
      <div className="flex sm:flex-row flex-col justify-between">
        <div className="flex flex-row gap-2">
          <div className="flex w-[90px]">
            <img
              className="w-full h-full rounded-md"
              src="https://via.placeholder.com/80"
              alt="product" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{product.product_name}</span>
            <span className="">{numberFormat(product.price)}</span>
            <span className="">{transaction_product_rlts[0].quantity} item</span>
            {
              transaction_product_rlts.length > 1 && (
                <span className="font-semibold">+{transaction_product_rlts.length - 1} more product</span>)
            }
          </div>
        </div>
        <div className="flex sm:flex-col flex-row border-l sm:pl-3 pl-0 min-w-[120px]">
          <span className="font-bold">Total</span>
          <span className="font-bold">{numberFormat(total_price)}</span>
        </div>
      </div>
      {/* button */}
      <div className="flex flex-row gap-2 mt-3 ml-auto">
        {/*<button className="px-2 text-primary border-b border-primary font-semibold">See Detail</button>*/}
        {
          !payment_proof && (
            <>
              <button
                onClick={() => setTrigger({ action: "payment", transaction: transaction })}
                className="py-1 px-3  rounded-md bg-primaryLight hover:bg-primary text-white font-semibold">Upload
                Payment
              </button>
              <button className="py-1 px-3  rounded-md bg-amber-500 hover:bg-amber-700 text-white font-semibold">Cancel
              </button>
            </>
          )
        }
      </div>
    </div>
  );
}

export default TransactionItem;