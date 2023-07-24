import React from "react";

function HamburgToggle(props) {
  const { toggleNav, setToggleNav } = props;
  return (
    <div
      className={
        toggleNav
          ? `invisible absolute bottom-2 right-2 text-2xl text-center
             md:invisible hover:cursor-pointer z-0 h-10 w-10 bg-primary
             self-center text-white rounded-full flex flex-row justify-center
             items-center`
          : `visible absolute bottom-2 right-2 text-2xl text-center
             md:invisible hover:cursor-pointer z-0 h-10 w-10 bg-primary
             self-center text-white rounded-full flex flex-row justify-center
             items-center`
      }
      onClick={() => {
        setToggleNav(true);
      }}
    >
      <i className="uil uil-align-center-alt"></i>
    </div>
  );
}

export default HamburgToggle;
