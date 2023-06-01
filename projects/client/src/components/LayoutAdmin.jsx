function LayoutAdmin({ children }) {
  return (
    <div className="flex flex-col">
      <nav>Disini Navbar</nav>
      <main>{children}</main>
    </div>
  );
}

export default LayoutAdmin;
