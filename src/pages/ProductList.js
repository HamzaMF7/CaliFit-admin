import React, { useEffect, useMemo, useRef, useState } from "react";
import { Table } from "antd";
import {
  getProducts,
  showProduct,
  restESL,
  deleteProduct,
  updatePageState,
  resetState,
} from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";

const { confirm } = Modal;

const columns = [
  {
    title: "Number",
    dataIndex: "key",
  },
  {
    title: "title",
    dataIndex: "title",
  },
  {
    title: "description",
    dataIndex: "description",
    render: (text) => <TextComponent text={text} />,
  },
  {
    title: "price",
    dataIndex: "price",
  },
  {
    title: "category",
    dataIndex: "category",
  },
  {
    title: "quantity",
    dataIndex: "quantity",
  },
  {
    title: "Image",
    dataIndex: "image_url",
    render: (image_url) => (
      <img
        src={"http://127.0.0.1:8000/storage/" + image_url}
        alt="Product Image"
        style={{ width: "100px" }}
      />
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const TextComponent = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const words = text.split(" ");
  const shortText = words.slice(0, 17).join(" ");
  const longText = words.slice(17).join(" ");

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  if (words.length <= 17)
    return (
      <div>
        <p>{shortText}</p>
      </div>
    );
  else
    return (
      <div>
        {expanded ? (
          <p>
            {longText}

            {words.length > 17 && <span className="show" onClick={handleToggle}>Show less</span>}
          </p>
        ) : (
          <p>
            {shortText}...
            {words.length > 17 && (
              <span className="show" onClick={handleToggle}>Show more</span>
            )}
          </p>
        )}
      </div>
    );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProductsState = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, products, message } = getProductsState;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleDeleteProduct = (productId) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        console.log(productId);
        dispatch(deleteProduct(productId))
          .then(() => dispatch(getProducts()))
          .catch((error) => console.error("Error deleting product:", error));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const data1 = useMemo(() => {
    const data = [];
    for (let i = 0; i < products.length; i++) {
      data.push({
        key: i + 1,
        title: products[i].title,
        description: products[i].description,
        price: products[i].price,
        category: products[i].category,
        quantity: products[i].quantity,
        image_url: products[i].image_url,
        action: (
          <div className="d-flex">
            <BiEdit
              className="biedit fs-3 text-danger"
              onClick={() => {
                dispatch(showProduct(products[i].id)).then(() => {
                  dispatch(restESL());
                  dispatch(updatePageState());
                  navigate("/admin/product");
                });
              }}
            />
            <Button
              className=" fs-3 text-danger pt-0 d-flex align-items-center justify-content-center"
              onClick={() => handleDeleteProduct(products[i].id)}
              type="solid"
            >
              <AiFillDelete />
            </Button>
          </div>
        ),
      });
    }
    return data;
  }, [products]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(restESL());
    }
  }, [isSuccess]);

  return (
    <div className="mt-4">
      <h3 className="mb-5 title">ProductList</h3>
      <div>
        <Table columns={columns} dataSource={data1} loading={isLoading} />
      </div>
    </div>
  );
};

export default ProductList;
