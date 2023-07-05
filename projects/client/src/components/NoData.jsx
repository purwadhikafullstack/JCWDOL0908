import React from "react";

function NoData(props) {
  const { text } = props;
  return (
    <div className="h-full w-full row-span-4 md:row-span-auto md:col-span-2 grid items-center text-center">
      <h1>No {text}</h1>
    </div>
  );
}

export default NoData;
