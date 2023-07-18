import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomForm from "../../../../components/CustomForm";
import CustomSelect from "../../../../components/CustomSelect";
import RenderProvince from "./RenderProvince";
import RenderCity from "./RenderCity";
import { createNewWarehouse, getCitiesByProvinces, getProvinces, getWarehouses } from "../..";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";
//hooks formik
function AddDataModal(props) {
  const { setIsCreateBtnClicked, pageNum, setWarehouses } = props;
  const addressRegex = /^[A-Za-z\s]+$/;
  const [provinceList, setProvinceList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState();
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    (async () => {
      const provinces = await getProvinces();
      setProvinceList([...provinces]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedProvince) {
        const cities = await getCitiesByProvinces(selectedProvince.split(":::")[0]);
        setCityList([...cities]);
      }
    })();
  }, [selectedProvince]);

  const createWarehouseSchema = Yup.object().shape({
    warehouse_name: Yup.string().required("must not blank"),
    address: Yup.string().required("must not blank").matches(addressRegex, "alphabet only"),
    id_province: Yup.string("required").required("required"),
    id_city: Yup.string("required").required("required"),
  });

  const onSubmit = async (values, action) => {
    let { id_province, id_city, warehouse_name } = values;
    const [idProvince, province] = id_province.split(":::");
    let [idCity, city] = id_city.split(":::");
    idCity = parseInt(idCity);
    const address = `${values.address}, ${city}, ${province}`;
    const data = { address, id_province: idProvince, id_city: idCity, warehouse_name };
    const response = await createNewWarehouse(data);
    const fetching = await getWarehouses(pageNum);
    setWarehouses([...fetching.result]);
    alert(response.data.message);
    setIsCreateBtnClicked(false);
  };

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
                      <button className="bg-primary text-white" type="submit">
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
