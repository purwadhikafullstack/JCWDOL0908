import { Dialog, Menu } from "@headlessui/react";
import { useState } from "react";
import { H3 } from "../../../components/Typo";
import FilterPrice from "./FilterPrice";

function FilterWrapper({ filter, setFilter }) {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOn(!isOn)}
        className="font-title text-left text-lg border rounded-md hover:border-primary px-3 py-1 cursor-pointer h-fit">Filter
      </button>
      <Dialog
        open={isOn}
        onClose={() => setIsOn(false)}
        as="div" className="relative">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        {/* right */}
        <div className="fixed flex flex-col justify-between right-0 top-0 w-80 bg-white shadow-lg h-screen py-3">
          <div className="flex flex-col gap-2">
            <div className="text-center border-b">
              <H3>Filter</H3>
            </div>
            <div className="border-b pb-3">
              <FilterPrice filter={filter} setFilter={setFilter} />
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <button
              onClick={() => setIsOn(false)}
              className="font-title text-left text-lg bg-primaryLight text-white border rounded-md hover:border-primary px-3 py-1 cursor-pointer">Cancel
            </button>
            <button
              className="font-title text-left text-lg bg-primary text-white border rounded-md hover:border-primary px-3 py-1 cursor-pointer">Apply
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default FilterWrapper;