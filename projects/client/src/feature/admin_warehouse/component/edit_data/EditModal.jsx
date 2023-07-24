import React from "react";
import { Formik, Form } from "formik";
import CustomForm from "../../../../components/CustomForm";
import RenderProvince from "../../../../feature/admin_warehouse/component/add_data/RenderProvince";
import RenderCity from "../../../../feature/admin_warehouse/component/add_data/RenderCity";
import CustomSelect from "../../../../components/CustomSelect";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";
import { useEditWarehouse } from "../../util/useEditWarehouse";

function EditModal(props) {
  const { setIsEditBtnClicked, warehouseData, setWarehouses, pageNum } = props;
  const { provinceList, setSelectedProvince, cityList, editWarehouseSchema, onSubmit } = useEditWarehouse(
    setIsEditBtnClicked,
    warehouseData,
    setWarehouses,
    pageNum,
  );

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setIsEditBtnClicked} />
        <div>
          <h1 className="modal-header-text">Edit Warehouse</h1>
          <Formik
            initialValues={{
              warehouse_name: warehouseData.warehouse_name,
              address: warehouseData.address.split(",")[0],
              number: "",
              id_province: `${warehouseData.id_province}:::${warehouseData.province}`,
              id_city: `${warehouseData.id_city}:::${warehouseData.city}`,
            }}
            validationSchema={editWarehouseSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              setSelectedProvince(formikProps.values.id_province);
              return (
                <Form className="form-container">
                  <CustomForm label="warehouse" name="warehouse_name" type="text" id="warehouse_name" />
                  <CustomForm label="address" name="address" type="text" id="address" />
                  <CustomSelect onChange={formikProps.handleChange} label="province" name="id_province">
                    <option value="">Select Province</option>
                    <RenderProvince provinceList={provinceList} />
                  </CustomSelect>
                  <CustomSelect label="city" name="id_city">
                    <option value="">Select City</option>
                    <RenderCity cityList={cityList} />
                  </CustomSelect>
                  <div className="invisible"></div>
                  <div className="invisible"></div>
                  <div className="invisible"></div>
                  <div className=" row-span-1">
                    <div className="grid grid-cols-2 gap-8 text-sm h-5/6 mt-4">
                      <button id="edit-warehouse-btn" className="bg-primary text-white btn-disabled" type="submit">
                        Submit
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

export default EditModal;
