import React from "react";
import { Formik, Form } from "formik";
import CustomForm from "../../../../../components/CustomForm";
import CustomSelect from "../../../../../components/CustomSelect";
import RenderCity from "../edit_data/RenderCity";
import RenderWarehouse from "../edit_data/RenderWarehouse";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import { useAddAdmin } from "../../../util/useAddAdmin";

function AddNewAdmin(props) {
  const { setNewAdminClicked, warehouseCities, page } = props;
  const { setCity, warehouses, registerSchema, onSubmit } = useAddAdmin(setNewAdminClicked, page);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setNewAdminClicked} />
        <div>
          <h1 className="modal-header-text">Create Warehouse Admin</h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone_number: "",
              id_city: "",
              id_warehouse: "",
            }}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              // get warehouse list after select city
              setCity(formikProps.values.id_city);
              // =========================================
              return (
                <Form className="form-container">
                  <CustomForm label="username" name="username" type="text" id="username" />
                  <CustomForm label="email" name="email" type="email" id="email" />
                  <CustomForm label="password" name="password" type="password" id="password" />
                  <CustomForm label="confirm password" name="confirmPassword" type="password" id="confirm-password" />
                  <CustomForm label="phone number" name="phone_number" type="text" id="phoneNumber" />
                  <CustomSelect
                    // get warehouse list after select city
                    onChange={formikProps.handleChange}
                    // =========================================
                    label="city"
                    name="id_city"
                  >
                    <option value="">Select City</option>
                    <RenderCity warehouseCities={warehouseCities} />
                  </CustomSelect>
                  <CustomSelect label="warehouse" name="id_warehouse">
                    <option value="">Select Warehouse</option>
                    <RenderWarehouse warehouses={warehouses} />
                  </CustomSelect>
                  <div className="row-start-8 row-span-1">
                    <div className="grid grid-cols-2 gap-8 text-sm h-5/6 mt-4">
                      <button id="create-admin-btn" className="bg-primary text-white btn-disabled" type="submit">
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

export default AddNewAdmin;
