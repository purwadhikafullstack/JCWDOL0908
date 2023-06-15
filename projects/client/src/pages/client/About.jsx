import Jumbotron from "../../components/Jumbotron";
import LayoutClient from "../../components/LayoutClient";
import BannerLogin from "../../images/banner/login.avif";

function About() {
  return (
    <LayoutClient>
      <Jumbotron title="About Us | Welcome to Furniture.co!" />
      <section className="py-6">
        <div className="page_container">
          <div className="flex sm:flex-row flex-col gap-5">
            <div className="sm:w-5/12 w-full">
              <div className="banner">
                <div className="image">
                  <img className="sm:h-full h-[200px] w-full object-cover" src={BannerLogin} alt="Banner Login" />
                </div>
              </div>
            </div>
            <div className="sm:w-7/12 w-full">
              {/* Your content goes here */}
              <p className="text-lg">
                At Furniture.co, we strive to provide you with the finest selection of furniture for your home or office. Our vast catalog features a wide range of styles, from modern and contemporary to classic and traditional.
                <br /><br />
                Explore our collection of sofas, chairs, tables, beds, cabinets, and more. Whether you're looking to furnish a cozy living room, create a productive workspace, or transform your bedroom into a tranquil oasis, we have the perfect pieces to suit your needs and personal taste.
                <br /><br />
                Quality is our top priority, which is why we source our furniture from trusted manufacturers known for their craftsmanship and attention to detail. We carefully curate our offerings to ensure that every item meets our high standards of durability, functionality, and aesthetics.
                <br /><br />
                Shopping with us is a breeze. Simply browse our website, add items to your cart, and proceed to secure checkout. We offer convenient and secure payment options, and our dedicated customer support team is always ready to assist you with any questions or concerns.
                <br /><br />
                Experience the joy of finding the perfect furniture pieces that elevate your space and reflect your unique style. Start your furniture shopping journey with Furniture.co today!
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutClient>
  );
}

export default About;
