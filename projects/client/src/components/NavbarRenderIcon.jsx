import React, { useState } from "react";

function NavbarRenderIcon(props) {
  const { listNav, onClickNavbarBtn } = props;

  return listNav.map((navItem) => {
    return (
      <li
        key={navItem.text}
        className={"text-center md:py-4 hover:text-white hover:bg-secondary hover:cursor-pointer"}
        onClick={() => {
          onClickNavbarBtn(navItem);
        }}
      >
        <div>
          <i className={navItem.class}></i>
          <h2 className="text-base md:text-lg lg:text-xl">{navItem.text}</h2>
        </div>
      </li>
    );
  });
}

export default NavbarRenderIcon;
