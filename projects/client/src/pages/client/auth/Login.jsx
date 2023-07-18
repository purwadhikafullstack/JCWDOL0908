import LayoutClient from "../../../components/LayoutClient";
import BannerLogin from "../../../images/banner/login.avif";
import { useState } from "react";
import RegisterForm from "../../../feature/auth/components/RegisterForm";
import LoginForm from "../../../feature/auth/components/LoginForm";
import ResetForm from "../../../feature/auth/components/ResetForm";

const RenderForm = ({ page, handlePage }) => {
  switch (page) {
    case "register":
      return <RegisterForm handlePage={handlePage} />;
    case "reset":
      return <ResetForm handlePage={handlePage} />;
    default:
      return <LoginForm handlePage={handlePage} />;
  }
};

function Login() {
  const [page, setPage] = useState("login");

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <LayoutClient>
      <section className="py-6">
        <div className="page_container grid sm:grid-cols-2 grid-cols-1 gap-5 ">
          <div className="form flex flex-col justify-center">
            <RenderForm page={page} handlePage={handlePage} />
          </div>
          <div className="banner">
            <div className="image">
              <img className="h-[560px] w-full object-cover" src={BannerLogin} alt="Banner Login" />
            </div>
          </div>
        </div>
      </section>
    </LayoutClient>
  );
}

export default Login;
