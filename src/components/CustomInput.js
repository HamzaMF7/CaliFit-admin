import React from "react";
const CustomInput = (props) => {
  const { type, label, name, value, onChange, onBlur , pattern } = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control`}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        pattern={pattern}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;