import React from "react";
import { useNavigate } from "react-router-dom";

function NavbarRenderIcon(props) {
  const { listNav } = props;
  const navigate = useNavigate();
  return listNav.map((navItem) => {
    return (
      <li key={navItem.text} className="text-center hover:text-black hover:cursor-pointer">
        <button
          onClick={() => {
            navigate(navItem.navlink);
          }}
        >
          <i className={navItem.class}></i>
          <h2 className=" text-sm md:text-lg">{navItem.text}</h2>
        </button>
      </li>
    );
  });
}

export default NavbarRenderIcon;
