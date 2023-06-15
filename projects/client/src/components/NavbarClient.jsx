import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileNav from "./ProvileNav";




function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Products",
      link: "/products",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  return (
    <>
      <nav
        className={`flex justify-between items-center h-16 bg-white text-black relative font-title text-xl shadow-sm
      ${scrolled ? "fixed top-0 z-50 bg-white-transparent" : null}`}
        role="navigation"
      >
        <div className="flex items-center pl-8">
          <Link to="/" className="sm:pl-2 pl-0 font-bold text-primary sm:text-3xl text-xl">
            Furniture<span className="text-primaryLight">.co</span>
          </Link>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {links.map((link, index) => (
            <Link key={index} to={link.link} className="px-3 py-2 text-black font-medium hover:text-primaryLight">
              {link.title}
            </Link>
          ))}
        </div>

        <div className="pr-8 flex flex-row sm:gap-10 gap-3">
          {/* Responsive navigation menu */}
          <div className="md:hidden flex">
            <button className="flex" onClick={toggleMenu}>
              <i className="uil uil-bars"></i>
            </button>
          </div>

          <button className="flex">
            <i className="uil uil-search"></i>
          </button>
          <button className="flex">
            <i className="uil uil-shopping-cart"></i>
          </button>
          <ProfileNav user={user} />
        </div>
      </nav>
      {/* Mobile View */}
      <div className="md:hidden">
        <Transition
          show={showMenu}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div className="fixed top-0 left-0 w-full h-full bg-white z-[99999]">
              <div className="flex justify-between flex-row">
                {/* title */}
                <div className="flex items-center pl-8">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#" className="sm:pl-2 pl-0 font-bold text-primary sm:text-3xl text-xl font-title">
                    Furniture<span className="text-primaryLight">.co</span>
                  </a>
                </div>
                <button className="p-4 text-black" onClick={() => setShowMenu(false)}>
                  <i className="uil uil-times text-2xl"></i>
                </button>
              </div>
              <ul className="flex flex-col items-left " ref={ref}>
                {links.map((link, index) => (
                  <li key={index} className="py-2">
                    <a href={link.link} className="px-3 py-2 text-black font-medium hover:text-primaryLight">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Transition>
      </div>
    </>
  );
}

export default NavbarClient;
