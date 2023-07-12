import { useSelector } from "react-redux";

const Loader = () => {
  const loader = useSelector((state) => state.loader);
  return (
    <>
      {loader.isLoading ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-[999999] flex justify-center items-center flex-col">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Loader;
