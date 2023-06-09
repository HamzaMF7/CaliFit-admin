import * as yup from 'yup';


export const AddProdForm = yup.object({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().positive().required("Price is Required"),
    category: yup.string().required("Category is Required"),
    quantity: yup.number().required("Quantity is Required"),
});