function FooterClient() {
  return (
    <>
      <section className="footer py-6 bg-secondary mt-6">
        <div className="page_container grid sm:grid-cols-4 grid-cols-2 gap-3">
          <div className="col-span-2 flex flex-col gap-3">
            <h3 className=" font-bold sm:text-3xl text-xl font-title text-black">
              Furniture<span className="text-white">.co</span>
            </h3>
            <p className="text-white text-sm font-body">
              Welcome to Furniture.co, your one-stop destination for all your furniture needs. We offer a wide range of
              high-quality furniture pieces for every room in your home. From stylish living room sofas to elegant
              bedroom sets, our collection is designed to enhance your living space and provide comfort and
              functionality.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-xl font-title">Links</h3>
            <div className="flex flex-col gap-1 pl-2">
              <a href="#" className="text-white text-sm font-body">
                Home
              </a>
              <a href="#" className="text-white text-sm font-body">
                Products
              </a>
              <a href="#" className="text-white text-sm font-body">
                About
              </a>
              <a href="#" className="text-white text-sm font-body">
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="footer p-3 bg-secondary">
        <div className="page_container text-right text-white font-body text-sm">
          &copy; 2023 Furniture.co. All rights reserved.
        </div>
      </section>
    </>
  );
}

export default FooterClient;
