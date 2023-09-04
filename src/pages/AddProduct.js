import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useDropzone } from "react-dropzone";
import { HiPhoto } from "react-icons/hi2";
import { useFormik } from "formik";
import { AddProdForm } from "../schemas/AddProdForm";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createProduct,
  resetState,
  restESL,
  showProduct,
  updateProduct,
} from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, products, updatePage, message } =
    newProduct;

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("token changes :", token);
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      updatePage
        ? toast.success("Product updated Successfullly!")
        : toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, updatePage]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChanges = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setFieldValue("image_url", newFileList);
    console.log("file list :", fileList);
  };

  useEffect(() => {
    const updatedUrls = fileList.map((file) => file.originFileObj);
    setFieldValue("image_url", updatedUrls);
    // console.log("update urls : ", updatedUrls);
  }, [fileList]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const newProduct_initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    category_id: "",
    quantity: "",
    image_url: [],
  };
  const updateProduct_initialValues = {
    title: products.title,
    description: products.description,
    price: products.price,
    category: products.category,
    category_id: "",
    quantity: products.quantity,
    image_url: products.image_url,
    _method: "PUT",
  };

  // useEffect(()=>{
  //  const {image_url} = updateProduct_initialValues ;
  //  console.log("image urls : ",image_url);
  //  if (image_url.length > 0) {
  //    const imagesFile =  image_url.map( image =>{
  //      const file = new File([image.slice(17)], image.slice(17));
  //      return file ;
  //     })
  //     console.log("images slice ", imagesFile);
  //      handleChanges({fileList : imagesFile})
  //  }
  // },[updatePage])

  const submitNewProduct = async (values, actions) => {
    console.log("new product :", values);
    const payload = values;
    console.log(payload);
    dispatch(createProduct(payload));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    setFileList([]);
    dispatch(resetState());
  };

  const submitUpdatingProduct = async (values, actions) => {
    console.log("update product :", values);
    const payload = values;
    dispatch(updateProduct(payload));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    dispatch(resetState());
    navigate("/admin/list-product");
  };
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    isSubmitting,
    touched,
    errors,
  } = useFormik({
    initialValues: updatePage
      ? updateProduct_initialValues
      : newProduct_initialValues,
    validationSchema: AddProdForm,
    onSubmit: updatePage ? submitUpdatingProduct : submitNewProduct,
    enableReinitialize: true,
  });

  return (
    <div>
      <h3 className="mb-4 title">{updatePage ? "Update" : "Add"} Poduct</h3>
      <form
        action=""
        className="d-flex gap-4 flex-column"
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >
        <CustomInput
          type="text"
          label="Enter Product title"
          name="title"
          value={values.title}
          onChange={handleChange("title")}
          onBlur={handleBlur}
        />
        {touched.title && errors.title && (
          <p className="input-error"> {errors.title}</p>
        )}
        <SimpleMDE
          className="mt-3"
          name="description"
          value={values.description}
          onChange={handleChange("description")}
          onBlur={handleBlur("description")}
        />
        {errors.description && touched.description && (
          <p className="input-error"> {errors.description}</p>
        )}
        <CustomInput
          type="number"
          label="Enter Product price"
          name="price"
          value={values.price}
          onChange={handleChange("price")}
          onBlur={handleBlur}
        />
        {errors.price && touched.price && (
          <p className="input-error"> {errors.price}</p>
        )}
        <select
          className="form-control mt-3"
          name="brand"
          value={values.brand}
          onChange={handleChange("brand")}
          onBlur={handleBlur}
        >
          <option value="" disabled>
            Select Brand
          </option>
          <option value="califit">CaliFit</option>
        </select>
        {/* {errors.brand && touched.brand && (
          <p className="input-error"> {errors.brand}</p>  
        )} */}

        <select
          className="form-control mt-3"
          name="category"
          value={values.category}
          onChange={handleChange("category")}
          onBlur={handleBlur}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="legs">Legs</option>
          <option value="others">Others</option>
        </select>
        {errors.category && touched.category && (
          <p className="input-error"> {errors.category}</p>
        )}
        <CustomInput
          type="number"
          label="Enter Product Quantity"
          name="quantity"
          value={values.quantity}
          onChange={handleChange("quantity")}
          onBlur={handleBlur}
        />
        {errors.quantity && touched.quantity && (
          <p className="input-error"> {errors.quantity}</p>
        )}

        <div className="dropzone mt-3">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChanges}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </div>
        <div className="d-flex gap-2">
          <button
            className="addproduct btn btn-success rounded-3 my-5"
            type="submit"
          >
            {updatePage ? "Update" : "Add"} Poduct
          </button>
          {updatePage ? (
            <button
              className="addproduct btn btn-success rounded-3  my-5"
              type="button"
              onClick={() => {
                navigate("/admin/list-product");
                dispatch(restESL());
              }}
            >
              cancel
            </button>
          ) : (
            ""
          )}
        </div>
        <ToastContainer autoClose={2000} />
      </form>
    </div>
  );
};

export default AddProduct;
