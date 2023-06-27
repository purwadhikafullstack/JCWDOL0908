function AddressItem({ address, setTrigger, withAction = true, selectedAddress = null, className = "" }) {
  let isPrimary = false;
  if (withAction) {
    isPrimary = address?.isPrimary;
  } else {
    isPrimary = selectedAddress === address?.id;
  }

  return (
    <div
      className={`flex flex-col justify-between p-3 mb-3 rounded-md shadow-md shadow-gray-200 w-full gap-3 
      ${isPrimary ? "border border-primary bg-teal-50" : "bg-white border"} ${className}`}>
      {
        address?.isPrimary && (
          <span className="font-bold font-title text-white bg-gray-900 px-2 rounded-sm w-fit">Default</span>
        )
      }
      <h3 className="text-lg font-semibold font-title capitalize">{address?.notes}</h3>
      <p className="text-gray-500 font-body">
        {address?.address}, {address?.city}, {address?.province}
      </p>
      {
        withAction && (
          <div className="flex flex-row gap-3 items-center">
            <button
              onClick={() => {
                setTrigger({
                  action: "edit",
                  address: address,
                });
              }}
              className="hover:text-gray-700 text-primaryLight font-bold font-title">
              Edit
            </button>
            {
              address?.isPrimary === false && (
                <>
                  <button
                    onClick={() => {
                      setTrigger({ action: "set-default", address: address });
                    }}
                    className="hover:text-gray-700 text-primaryLight font-bold font-title">
                    Set as default
                  </button>
                  <button
                    onClick={() => {
                      setTrigger({ action: "delete", address: address });
                    }}
                    className="hover:text-gray-700 text-primaryLight font-bold font-title">
                    Delete
                  </button>
                </>
              )
            }
          </div>
        )
      }
    </div>
  );
}

export default AddressItem;