import { useEffect, useState } from "react";
import { editWarehouse, getCitiesByProvinces, getProvinces, getWarehouses } from "../";
import * as Yup from "yup";

export const useEditWarehouse = (setIsEditBtnClicked, warehouseData, setWarehouses, pageNum) => {
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
    const editWarehouseBtn = document.getElementById("edit-warehouse-btn");
    editWarehouseBtn.disabled = true;
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
    editWarehouseBtn.disabled = false;
    setIsEditBtnClicked(false);
  };

  return {
    provinceList,
    setProvinceList,
    selectedProvince,
    setSelectedProvince,
    cityList,
    setCityList,
    addressRegex,
    editWarehouseSchema,
    onSubmit,
  };
};
