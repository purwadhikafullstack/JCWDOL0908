import React from "react";

function NoData(props) {
  const { text } = props;
  return (
    <div
      className="h-full w-full row-span-full md:row-span-auto text-primary
    md:col-span-2 grid items-center text-center text-2xl md:text-3xl lg:text-4xl
    font-bold"
    >
      <h1>No {text}</h1>
    </div>
  );
}

export default NoData;
