import React from "react";
import { Formik, Form } from "formik";
import CustomForm from "../../../../../components/CustomForm";
import CustomSelect from "../../../../../components/CustomSelect";
import ConfirmationModal from "./ConfirmationModal";
import RenderCity from "./RenderCity";
import RenderWarehouse from "./RenderWarehouse";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import { useEditAdmin } from "../../../util/useEditAdmin";

function EditAdminModal(props) {
  const { warehouseCities, setModal, page } = props;
  const {
    setCity,
    setSecondButtonValue,
    warehouses,
    confirmationModal,
    setConfirmationModal,
    singleData,
    editSchema,
    onSubmit,
  } = useEditAdmin(setModal, page);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setModal} />
        <Formik
          initialValues={{
            username: singleData.username,
            email: singleData.email,
            password: "",
            phoneNumber: singleData.phone_number,
            id_city: singleData.id_city,
            id_warehouse: singleData.id_warehouse,
          }}
          validationSchema={editSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            setCity(formikProps.values.id_city);
            return (
              <Form className="form-container">
                <h1 className="font-semibold">Edit Data</h1>
                <CustomForm label="username" name="username" type="text" id="username" />
                <CustomForm label="email" name="email" type="email" id="email" />
                <CustomForm label="reset password" name="password" type="password" id="password" />
                <CustomForm label="phone" name="phoneNumber" type="text" id="phoneNumber" />
                <CustomSelect onChange={formikProps.handleChange} label="city" name="id_city">
                  <option value="">Select City</option>
                  <RenderCity warehouseCities={warehouseCities} />
                </CustomSelect>
                <CustomSelect label="warehouse" name="id_warehouse">
                  <option value="">Select Warehouse</option>
                  <RenderWarehouse warehouses={warehouses} />
                </CustomSelect>
                <div className="row-start-8 row-span-1">
                  <div className="grid grid-cols-2 gap-8 text-sm h-5/6 mt-4">
                    <button className="bg-primary text-white" type="" onClick={() => setSecondButtonValue(true)}>
                      Submit
                    </button>
                    {confirmationModal ? (
                      <ConfirmationModal setConfirmationModal={setConfirmationModal} formikProps={formikProps} />
                    ) : null}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default EditAdminModal;
