import Jumbotron from "../../components/Jumbotron";
import LayoutClient from "../../components/LayoutClient";
import BannerLogin from "../../images/banner/login.avif";

function Contact() {
  return (
    <LayoutClient>
      <Jumbotron title="Contact | How can we help you?" />
      <section className="py-6">
        <div className="page_container">
          <div className="flex sm:flex-row flex-col gap-5">
            <div className="sm:w-5/12 w-full">
              <div className="banner">
                <div className="image">
                  <img className="sm:h-[450px] h-[200px] w-full object-cover" src={BannerLogin} alt="Banner Login" />
                </div>
              </div>
            </div>
            <div className="sm:w-7/12 w-full font-title text-primary py-3">
              <div className="flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="uil uil-phone-alt text-4xl"></div>
                  <div className="text-2xl font-bold">+62 812 3456 7890</div>
                </div>
                <div className="flex items-center">
                  <div className="uil uil-envelope text-4xl"></div>
                  <div className="text-2xl font-bold">
                    <a href="mailto:help@furniture.com" className="hover:text-primary">
                      help@furniture.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="uil uil-instagram text-4xl"></div>
                  <div className="text-2xl font-bold">
                    <a href="https://www.instagram.com/furniture/" className="hover:text-primary">
                      furniture.co
                    </a>
                  </div>
                </div>

                <p className="font-body">
                  Feel free to contact us for any assistance or inquiries. We are here to help you make the best choices
                  for your furniture needs.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutClient>
  );
}

export default Contact;
