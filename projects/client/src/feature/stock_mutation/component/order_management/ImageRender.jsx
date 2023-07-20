import React from "react";

function ImageRender(props) {
  const { preview, alt } = props;
  return (
    <>
      <div className="mx-auto items-center gap-1 h-40 overflow-y-scroll px-5 flex flex-col">
        <h1></h1>
        <img src={preview} alt={alt} id="image_preview" className={`mx-auto h-fit w-full md:w-[22.5rem]`} />
        <i className="mx-auto text-xs scale-90 md:text-sm font-medium">proof of payment</i>
      </div>
    </>
  );
}

export default ImageRender;
