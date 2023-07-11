import LayoutClient from "../../../components/LayoutClient";
import Jumbotron from "../../../components/Jumbotron";
import ProfileContainer from "../../../feature/profile/components/ProfileContainer";
import { H3 } from "../../../components/Typo";
import TransactionItem from "../../../feature/checkout/components/TransactionItem";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { historyOrder } from "../../../feature/checkout";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../feature/LoaderSlice";
import { ToastError } from "../../../helper/Toastify";
import Pagination from "../../../components/Pagination";
import ModalPayment from "../../../feature/checkout/components/ModalPayment";
import CancelOrder from "../../../feature/checkout/components/CancelOrder";

function Transaction() {
  const [search, setSearch] = useSearchParams();
  const [transaction, setTransaction] = useState({ metadata: {}, transactions: [] });
  const [page, setPage] = useState(search.get("page") || 1);
  const [trigger, setTrigger] = useState({
    action: "",
    transaction: {},
  });
  const dispatch = useDispatch();

  const fetchTransaction = async () => {
    dispatch(setLoading(true));
    try {
      const response = await historyOrder(page);
      setTransaction(response.data.data);
    } catch (error) {
      ToastError(error.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setSearch((searchParams) => {
      searchParams.set("page", page);
      return searchParams;
    });
  }, [page]);

  useEffect(() => {
    (async () => {
      if (trigger.action === "") await fetchTransaction();
    })();
  }, [page, trigger]);


  const { metadata, transactions } = transaction;

  return (
    <LayoutClient>
      <ModalPayment
        isOpen={trigger.action === "payment"}
        onClose={() => setTrigger({ action: "", transaction: {} })}
        setTrigger={setTrigger}
        transaction={trigger.transaction}
      />
      <CancelOrder
        isOpen={trigger.action === "cancel"}
        setTrigger={setTrigger}
        transaction={trigger.transaction}
      />
      <Jumbotron title="Transaction" />
      <section className="py-6">
        <ProfileContainer pageName="transactions">
          <H3>History Transaction </H3>
          <div className="flex flex-col gap-3">
            {
              transactions.length > 0 ? (
                <>
                  {
                    transactions.map((item, index) => (
                      <TransactionItem key={index} transaction={item} setTrigger={setTrigger} />
                    ))
                  }
                  {
                    metadata.total_page > 1 && (<Pagination metadata={metadata} setPage={setPage} />)
                  }
                </>
              ) : (
                <div className="flex justify-center items-center">
                  <p className="text-gray-500">No transaction</p>
                </div>
              )
            }
          </div>

        </ProfileContainer>
      </section>
    </LayoutClient>
  );
}

export default Transaction;