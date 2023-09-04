import React, { useEffect, useMemo, useState } from "react";
import { Table, Button, Modal, Space } from "antd";
import {
  getProducts,
  showProduct,
  restESL,
  deleteProduct,
  updatePageState,
} from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";

const { confirm } = Modal;
const { Search } = Input;

const columns = [
  {
    title: "Number",
    dataIndex: "key",
    render: (dataIndex) => dataIndex.number,
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
        src={image_url && "http://127.0.0.1:8000/storage/" + image_url[0]}
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

const TextComponent = React.memo(({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const words = text?.split(" ") || [];
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
            {words.length > 17 && (
              <span className="show" onClick={handleToggle}>
                Show less
              </span>
            )}
          </p>
        ) : (
          <p>
            {shortText}...
            {words.length > 17 && (
              <span className="show" onClick={handleToggle}>
                Show more
              </span>
            )}
          </p>
        )}
      </div>
    );
});

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isLoading, products } = useSelector(
    (state) => state.product
  );
  const [query, setQuery] = useState(""); // Add query state

  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query); // Update the query state
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  
  console.log(products);

 
  const handleDeleteProduct = (productId) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteProduct(productId))
          .then(() => dispatch(getProducts()))
          .catch((error) => console.error("Error deleting product:", error));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    deleteSelectionProducts();
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 5000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const deleteSelectionProducts = async () => {
    try {
      // Delete selected products
      await Promise.all(
        selectedRowKeys.map((element) => dispatch(deleteProduct(element.product_id)))
      );
      // Fetch updated products
      dispatch(getProducts());
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };
  

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const data1 = useMemo(() => {
    const data = [];
    const allProducts =
      Object.values(products).filter((val) => {
        if (query === "") {
          return true; // Use true here to include all products
        } else if (
          val.title &&
          val.title.toLowerCase().includes(query.toLowerCase())
        ) {
          return true;
        }
        return false;
      }) ?? [];

    if (allProducts) {
      for (let i = 0; i < allProducts.length; i++) {
        data.push({
          key: {
            number: i + 1,
            product_id: allProducts[i].id,
          },
          title: allProducts[i].title,
          description: allProducts[i].description,
          price: allProducts[i].price,
          category: allProducts[i].category,
          quantity: allProducts[i].quantity,
          image_url: allProducts[i].image_url,
          action: (
            <div className="d-flex">
              <BiEdit
                className="biedit fs-3 text-danger"
                onClick={() => {
                  dispatch(showProduct(allProducts[i]?.id)).then((product) => {
                    dispatch(restESL());
                    dispatch(updatePageState());
                    navigate("/admin/product");
                  });
                }}
              />
              <Button
                className="fs-3 text-danger pt-0 d-flex align-items-center justify-content-center"
                onClick={() => handleDeleteProduct(allProducts[i].id)}
                type="solid"
              >
                <AiFillDelete />
              </Button>
            </div>
          ),
        });
      }
    }
    return data;
  }, [products, query]); // Add query as a dependency

  useEffect(() => {
    if (isSuccess) {
      dispatch(restESL());
    }
  }, [isSuccess]);

  return (
    <div className="mt-4">
      <h3 className="title">ProductList</h3>
      <div className="m-3 searchBar">
        <div className="deleteSelection">
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Space direction="vertical">
          <Search
            placeholder="Search for products"
            allowClear
            enterButton="Search"
            size="large"
            value={query}
            onChange={handleSearch}
          />
        </Space>
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data1}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default ProductList;
