import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomForm from "../../../../components/CustomForm";
import RenderProvince from "../../../../feature/admin_warehouse/component/add_data/RenderProvince";
import RenderCity from "../../../../feature/admin_warehouse/component/add_data/RenderCity";
import CustomSelect from "../../../../components/CustomSelect";
import { editWarehouse, getCitiesByProvinces, getProvinces, getWarehouses } from "../../../../feature/admin_warehouse";

function EditModal(props) {
  const { setIsEditBtnClicked, warehouseData, setWarehouses, pageNum } = props;
  const [provinceList, setProvinceList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState();
  const [cityList, setCityList] = useState([]);
  const addressRegex = /^[A-Za-z\s]+$/;

  useEffect(() => {
    (async () => {
      const provinces = await getProvinces();
      setProvinceList([...provinces]);
      setSelectedProvince(`${warehouseData.id_province}:::${warehouseData.province}`);
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

  const editWarehouseSchema = Yup.object().shape({
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
    const data = {
      id_warehouse: warehouseData.id_warehouse,
      address,
      id_province: idProvince,
      id_city: idCity,
      warehouse_name,
    };
    const response = await editWarehouse(data);
    const fetching = await getWarehouses(pageNum);
    setWarehouses([...fetching.result]);
    alert(response.data.message);
    setIsEditBtnClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="close-btn-modal" onClick={() => setIsEditBtnClicked(false)}>
          <i className="uil uil-times-circle"></i>
        </button>
        <div>
          <h1 className="my-4 font-bold">Edit Warehouse</h1>
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
                      <button className="bg-slate-800 text-white" type="submit">
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
