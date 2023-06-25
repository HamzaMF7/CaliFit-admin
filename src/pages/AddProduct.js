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
  showProduct,
  updateProduct,
} from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, products, updatePage, message } =
    newProduct;

  // console.log("**********");
  // console.log(products);
  // console.log("**********");
  // console.log(isSuccess);

  useEffect(() => {
    console.log(products);
    console.log(isError);
    console.log(isLoading);
    console.log(isSuccess);
    console.log("***********");
    // toast("welcome");
  }, []);

  const newProduct_initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    category_id: "",
    quantity: "",
    image_url: "",
  };
  const updateProduct_initialValues = {
    title: products.title,
    description: products.description,
    price: products.price,
    category: products.category,
    category_id: products.category_id,
    quantity: products.quantity,
    image_url: products.image_url,
  };
  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      updatePage
        ? toast.success("Product updated Successfullly!")
        : toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, updatePage]);

  const submitNewProduct = async (values, actions) => {
    console.log("new product :", values);
    const payload = values;
    console.log(payload);
    // dispatch(createProduct(payload));
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // actions.resetForm();
    // dispatch(resetState());
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
  //   dropzone code
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      setFieldValue("image_url", files[0]);
    },
  });
  const files = acceptedFiles.map((file) =>
    values.image_url == "" ? (
      ""
    ) : (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    )
  );
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
          label="Enter Category id"
          name="category_id"
          value={values.category_id}
          onChange={handleChange("category_id")}
          onBlur={handleBlur}
        />
        {errors.category_id && touched.price && (
          <p className="input-error"> {errors.category_id}</p>
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

        <section className="dropzone mt-3" name="image_url">
          <div {...getRootProps({ className: "drop" })}>
            <input {...getInputProps()} />
            <div className="text-center">
              <HiPhoto className="hiphoto" />
              <p>Drop image here...</p>
            </div>
          </div>
          <aside>
            <h4>image_url</h4>
            <ul>{files}</ul>
          </aside>
        </section>
        <div className="d-flex gap-2">
          <button
            className="addproduct btn btn-success rounded-3 my-5"
            type="submit"
          >
            {updatePage ? "Update" : "Add"} Poduct
          </button>
          {updatePage ? <button
            className="addproduct btn btn-success rounded-3  my-5"
            type="button"
            onClick={()=>{navigate("/admin/list-product")}}
          >
            cancel
          </button> : ""}
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddProduct;
