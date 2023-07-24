import { useEffect, useState } from "react";
import { createNewWarehouse, getCitiesByProvinces, getProvinces, getWarehouses } from "../";
import * as Yup from "yup";

export const useAddWarehouse = (setIsCreateBtnClicked, pageNum, setWarehouses) => {
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
    const addWarehouseBtn = document.getElementById("add-warehouse-btn");
    addWarehouseBtn.disabled = true;
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
    addWarehouseBtn.disabled = false;
    setIsCreateBtnClicked(false);
  };

  return {
    provinceList,
    setProvinceList,
    selectedProvince,
    setSelectedProvince,
    cityList,
    setCityList,
    createWarehouseSchema,
    onSubmit,
    addressRegex,
  };
};
