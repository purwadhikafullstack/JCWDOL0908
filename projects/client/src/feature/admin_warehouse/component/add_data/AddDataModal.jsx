import React from "react";
import { Formik, Form } from "formik";
import CustomForm from "../../../../components/CustomForm";
import CustomSelect from "../../../../components/CustomSelect";
import RenderProvince from "./RenderProvince";
import RenderCity from "./RenderCity";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";
import { useAddWarehouse } from "../../util/useAddWarehouse";

function AddDataModal(props) {
  const { setIsCreateBtnClicked, pageNum, setWarehouses } = props;
  const { provinceList, setSelectedProvince, cityList, createWarehouseSchema, onSubmit } = useAddWarehouse(
    setIsCreateBtnClicked,
    pageNum,
    setWarehouses,
  );

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setIsCreateBtnClicked} />
        <div>
          <h1 className="modal-header-text">Create Warehouse</h1>
          <Formik
            initialValues={{
              warehouse_name: "",
              address: "",
              id_province: "",
              id_city: "",
            }}
            validationSchema={createWarehouseSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              setSelectedProvince(formikProps.values.id_province);
              return (
                <Form className="form-container">
                  <CustomForm
                    label="warehouse"
                    name="warehouse_name"
                    type="text"
                    id="warehouse_name"
                    placeholder="example: UPI"
                  />
                  <CustomForm
                    label="address"
                    name="address"
                    type="text"
                    id="address"
                    placeholder="example: Jalan Dokter Setiabudi"
                  />
                  <CustomSelect onChange={formikProps.handleChange} label="province" name="id_province">
                    <option value="">Select Province</option>
                    <RenderProvince provinceList={provinceList} />
                  </CustomSelect>
                  <CustomSelect label="city" name="id_city">
                    <option value="">Select City</option>
                    <RenderCity cityList={cityList} />
                  </CustomSelect>
                  <div className=" row-span-1 row-start-8">
                    <div className="grid grid-cols-2 gap-8 text-sm h-5/6 mt-4">
                      <button id="add-warehouse-btn" className="bg-primary text-white btn-disabled" type="submit">
                        Create
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddDataModal;
