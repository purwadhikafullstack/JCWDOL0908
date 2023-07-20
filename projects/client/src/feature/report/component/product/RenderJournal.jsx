import React from "react";

function RenderJournal(props) {
  const { journalData, singleItemHandler } = props;
  return journalData?.map((journal) => {
    return (
      <div
        key={journal.id_product}
        className="row-span-1 font-normal grid md:grid-cols-7 items-center
        grid-cols-5 text-xs pl-2 lg:text-sm text-primary bg-slate-100
        hover:cursor-pointer"
        onClick={() => singleItemHandler(journal)}
      >
        <p className="col-span-2 md:col-span-3">{journal.product_name}</p>
        <p className="hidden md:inline lg:col-span-1 lg:text-center">
          {journal.qty_before === null ? 0 : journal.qty_before} item
        </p>
        <p className="col-span-1 text-center">{journal.total_addition} item</p>
        <p className="col-span-1 text-center">{journal.total_substraction} item</p>
        <p className="col-span-1 text-center">{journal.qty_after} item</p>
      </div>
    );
  });
}

export default RenderJournal;
