import LayoutAdmin from "../components/LayoutAdmin";

function AdminDashboard() {
  return (
    <LayoutAdmin>
      <div className="maxvh w-full flex flex-row justify-center items-center">
        <div className=" text-center">
          <h1
            className="md:text-5xl font-extrabold text-slate-800 
            text-3xl"
          >
            ADMIN DASHBOARD
          </h1>
          <p className="text-slate-400 md:text-2xl text-xl md:my-4 my-1">Welcome, User</p>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default AdminDashboard;
