import NavbarAdmin from "./NavbarAdmin";

function LayoutAdmin({ children }) {
  return (
    <div className="md:grid md:grid-cols-10 md:h-full">
      <NavbarAdmin />
      <main className="col-start-1 col-span-6 md:col-start-3 md:col-span-8">{children}</main>
    </div>
  );
}

export default LayoutAdmin;
