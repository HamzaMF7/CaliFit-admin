import { useField } from 'formik';
import React from 'react'
import SimpleMDE from "react-simplemde-editor";

const Desc = ({ name }) => {
  const [field , meta] = useField(name);
  return (
    <div className='mt-3'>
      <SimpleMDE {...field} name={name} />
      {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
    </div>
  );
};

export default Desc;
