import React, { useEffect, useState } from "react";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";
import { getProductJournalDetail } from "../../";

function DetailJournal(props) {
  const { setSingleItemClicked, singleJournal, months, filterState, selectingDate } = props;
  const currentMonth = selectingDate(filterState.month, filterState.year, 1);
  const [detailJournal, setDetailJournal] = useState([]);

  useEffect(() => {
    (async () => {
      const dataInput = {
        id_product: singleJournal.id_product,
        id_warehouse: singleJournal.id_warehouse,
        currentMonth: JSON.stringify(currentMonth),
      };
      const response = await getProductJournalDetail(dataInput);
      setDetailJournal([...response?.result]);
    })();
  }, []);

  const RenderData = () => {
    return detailJournal.map((singleData, index) => {
      const activityAndMessage = [
        `${singleData.quantity} item stock(s) of ${
          singleJournal.product_name
        }, was bought by a user and directly sent into user's address from ${
          singleJournal.warehouse_name
        }-warehouse at ${new Date(singleData.updatedAt).toLocaleString()}. stock reduce from ${
          index === detailJournal.length - 1
            ? singleJournal.qty_before || "0"
            : detailJournal[index + 1].resultant_quantity
        } item(s) into ${singleData.resultant_quantity} item(s).`,
        `The stock count of ${singleJournal.product_name},  has been reduced by ${
          singleData.quantity
        } item(s) under the supervision of an admin-warehouse/super-admin. This action was taken in response to the identification of product defect(s) on ${new Date(
          singleData.updatedAt,
        ).toLocaleString()}. Consequently, the stock quantity has decreased from ${
          index === detailJournal.length - 1
            ? singleJournal.qty_before || "0"
            : detailJournal[index + 1].resultant_quantity
        } item(s) to ${singleData.resultant_quantity} item(s).`,
        `An administrator from the warehouse/super-admin role has added ${singleData.quantity} item(s) of ${
          singleJournal.product_name
        }, as a stock replenishment within the ${
          singleJournal.warehouse_name
        }-warehouse. This action took place on ${new Date(
          singleData.updatedAt,
        ).toLocaleString()}. Consequently, the stock quantity has been augmented from ${
          index === detailJournal.length - 1
            ? singleJournal.qty_before || "0"
            : detailJournal[index + 1].resultant_quantity
        } item(s) to ${singleData.resultant_quantity} item(s).`,
        `${singleData.quantity} item(s) of ${singleJournal.product_name}, has been added to the ${
          singleJournal.warehouse_name
        }-warehouse. This addition occurred as the warehouse receiving a mutationed-product from another warehouse on ${new Date(
          singleData.updatedAt,
        ).toLocaleString()}. Consequently, the stock level has increased from ${
          index === detailJournal.length - 1
            ? singleJournal.qty_before || "0"
            : detailJournal[index + 1].resultant_quantity
        } item(s) into ${singleData.resultant_quantity} item(s).`,
        `${singleData.quantity} item(s) of ${singleJournal.product_name}, was reducted in ${
          singleJournal.warehouse_name
        }-warehouse as mutation-request was approved and the product(s) were sent from this warehouse to another warehouse at ${new Date(
          singleData.updatedAt,
        ).toLocaleString()}. stock decrease from ${
          index === detailJournal.length - 1
            ? singleJournal.qty_before || "0"
            : detailJournal[index + 1].resultant_quantity
        } item(s) into ${singleData.resultant_quantity} item(s).`,
        `Commencing stock initialization at the ${singleJournal.warehouse_name}-warehouse, on ${new Date(
          singleData.updatedAt,
        ).toLocaleString()}, in response to the introduction of a new product, ${
          singleJournal.product_name
        }. The initial stock level begins at 0 item.`,
      ];
      return (
        <div key={index + 1} className="w-full pr-1 md:px-4 flex gap-2 py-1 md:gap-4">
          <h1 className="font-bold">{index + 1}.</h1>
          <h1>{activityAndMessage[singleData.id_activity - 1]}</h1>
        </div>
      );
    });
  };

  return (
    <div className="modal-background">
      <div className="modal-container h-fit w-5/6">
        <ClosedBtnModal setModal={setSingleItemClicked} />
        <div>
          <h1 className="modal-header-text">Detail Journal</h1>
          <div
            className="flex flex-col text-xs md:text-sm md:-gap-2 md:-mt-4
            lg:text-base"
          >
            <h1>{singleJournal.product_name}</h1>
            <h1>
              on{" "}
              <i className="font-bold">
                {months[parseInt(filterState.month)]}, {filterState.year},
              </i>{" "}
              at {singleJournal.warehouse_name}-warehouse
            </h1>
          </div>
          <div
            className="text-xs md:text-sm overflow-auto max-h-[27.5rem] mt-3 mb-4
          flex flex-col gap-1 md:gap-2 shadow-inner bg-slate-100 p-2"
          >
            <RenderData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailJournal;
