import React from 'react'
import CustomInput from "../components/CustomInput";
const Category = () => {
  return (
    <div>
    <h3 className="mb-4  title">
      {/* {getPCatId !== undefined ? "Edit" : "Add"}  */}
     Add Category
    </h3>
    <div>
    {/* onSubmit={formik.handleSubmit} it's inside form */}
      <form action="">
        <CustomInput
          type="text"
          label="Enter Product Category"
        //   onChng={formik.handleChange("title")}
        //   onBlr={formik.handleBlur("title")}
        //   val={formik.values.title}
          id="brand"
        />
        <div className="error">
          {/* {formik.touched.title && formik.errors.title} */}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {/* {getPCatId !== undefined ? "Edit" : "Add"}  */}
         Add Category
        </button>
      </form>
    </div>
  </div>
  )
}

export default Category