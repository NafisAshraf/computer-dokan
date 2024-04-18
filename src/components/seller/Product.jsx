import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Product = () => {
  const { authUser } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/products-by-seller/${authUser.userMId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, [authUser.userMId]);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditable({
      name: product.product,
      price: product.price,
      stock: product.stock,
    });
  };

  const [editable, setEditable] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleChange = (e, field) => {
    setEditable({
      ...editable,
      [field]: e.target.value,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/product/update-product/${id}`,
        {
          name: editable.name,
          price: editable.price,
          stock: editable.stock,
        }
      );
      alert("Product updated successfully");
      setProducts(
        products.map((prod) =>
          prod._id === id
            ? {
                ...prod,
                product: editable.name,
                price: editable.price,
                stock: editable.stock,
              }
            : prod
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating product", error);
      alert("Failed to update product");
    }
  };

  // Delete product by id
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/delete-item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.status === "ok") {
        alert("Product deleted successfully");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="py-3">Products Uploaded by {authUser.userName}</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) =>
              product.product.toLowerCase().includes(searchTerm)
            )
            .map((product) => (
              <tr key={product._id}>
                <td>{product.id}</td>
                <td>
                  {editingId === product._id ? (
                    <input
                      type="text"
                      value={editable.name}
                      onChange={(e) => handleChange(e, "name")}
                    />
                  ) : (
                    product.product
                  )}
                </td>
                <td>{product.category}</td>
                <td>
                  {editingId === product._id ? (
                    <input
                      type="text"
                      value={editable.price}
                      onChange={(e) => handleChange(e, "price")}
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td>
                  {editingId === product._id ? (
                    <input
                      type="number"
                      value={editable.stock}
                      onChange={(e) => handleChange(e, "stock")}
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    {editingId === product._id ? (
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdate(product._id)}
                      >
                        Update
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <Link to={`/product/${product.id}`}>
                          <button className="btn btn-primary">View</button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
