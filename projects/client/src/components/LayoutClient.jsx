function LayoutClient({ children }) {
  return (
    <div className="flex flex-col">
      <nav>Disini Navbar Client</nav>
      <main>{children}</main>
      <footer>
        <p>Disini Footer Client</p>
      </footer>
    </div>
  );
}

export default LayoutClient;
