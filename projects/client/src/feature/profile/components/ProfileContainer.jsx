import { Link } from "react-router-dom";

const Links = [
  {
    name: "profile",
    icon: "uil uil-user",
    link: "/account",
  },
  {
    name: "transactions",
    icon: "uil uil-wallet",
    link: "/account/transactions",
  },
  {
    name: "address",
    icon: "uil uil-location-point",
    link: "/account/address",
  },
  {
    name: "reset password",
    icon: "uil uil-lock",
    link: "/account/reset-password",
  },
];

function ProfileContainer({ children, pageName }) {
  return (
    <div className="page_container flex sm:flex-row flex-col gap-5">
      <div className="sm:w-4/12 w-full  sm:mb-4 mb-0">
        <div className="bg-white shadow-lg rounded-lg p-4 sticky top-14">
          <h3 className="text-xl font-semibold mb-4 font-title">My Account</h3>
          <ul className="flex flex-col">
            {Links.map((link) => (
              <li key={link.name} className="mb-2">
                <Link
                  to={link.link}
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 capitalize font-title ${
                    pageName === link.name ? "bg-gray-100" : ""
                  }`}
                >
                  <i className={link.icon}></i>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sm:w-8/12 w-full">{children}</div>
    </div>
  );
}

export default ProfileContainer;
