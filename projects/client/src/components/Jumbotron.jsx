import Banner from "../images/banner/slide_1.avif";
function Jumbotron({ title, description = "" }) {
  return (
    <div className="relative bg-cover bg-center sm:h-64 h-32" style={{ backgroundImage: `url(${Banner})` }}>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="sm:text-4xl text-xl font-bold mb-4 font-title">{title}</h1>
          <p className="sm:text-xl text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
