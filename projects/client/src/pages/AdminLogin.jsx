import React from "react";
import FormLogin from "../components/admin/login/FormLogin";

function AdminLogin() {
  return (
    <div className="maxvh maxvw bg-slate-50 flex flex-col gap-6 items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold lg:text-3xl">Admin Login Page</h1>
        <h3 className="text-base text-slate-500 lg:text-xl">manage your warehouse easily</h3>
      </div>
      <div className="bg-white w-2/3 shadow-slate-200 shadow-sm p-8 lg:w-1/3 lg:text-lg">
        <FormLogin />
      </div>
    </div>
  );
}

export default AdminLogin;
