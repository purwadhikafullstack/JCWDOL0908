import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const links = [
  {
    title: "profile",
    link: "/account",
    icon: "uil uil-user",
  },
  {
    title: "transactions",
    link: "/account/transactions",
    icon: "uil uil-wallet",
  },
  {
    title: "logout",
    link: "/logout",
    icon: "uil uil-sign-out-alt",
  },
];

const ProfileNav = ({ user }) => {

  if (user.email === "") {
    return (
      <Link to="/client" className="flex">
        <i className="uil uil-user"></i>
      </Link>
    );
  } else {
    return (
      <Menu as="div" className="relative flex">
        <Menu.Button className="flex relative w-full">
          <i className="uil uil-user"></i>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            as="div"
            className="absolute mt-2 text-base shadow-lg rounded-lg w-48 py-2 z-10 left-[-160px] top-[20px] bg-gray-50 border">
            {links.map((link, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    to={link.link}
                    className={`${active ? "bg-gray-100 text-primaryLight" : "text-gray-700"} flex w-full px-4 py-2 text-sm leading-5 capitalize`}
                  >
                    <i className={`${link.icon} mr-2`}></i>
                    {link.title}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

};


export default ProfileNav;