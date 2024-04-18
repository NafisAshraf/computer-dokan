import React, { useEffect, useState, useContext } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import FaceBookShare from "./FaceBookShare";
import MessengerShare from "./MessengerShare";
import useMakeOffer from "../hooks/useMakeOffer";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import StarRatings from "react-star-ratings";

const ProductPageDashboard = ({ productID, product }) => {
  const { setProduct, setSelectedProduct } = useProductContext();
  const [averageReview, setAverageReview] = useState(0);
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const token = localStorage.getItem("accessToken");
  const { authUser } = useAuthContext();
  const sellerID = product.uploadedBy?._id;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const protag = `https://e96f-118-179-57-155.ngrok-free.app/product/${productID}`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [reviewResponse] = await Promise.all([
          axios.get(
            `http://localhost:5000/api/product/get-review/${productID}`
          ),
        ]);
        if (reviewResponse.data.length === 0) {
          setAverageReview(0);
        } else {
          const totalRating = reviewResponse.data.reduce(
            (total, review) => total + review.rating,
            0
          );
          const avgRating = totalRating / reviewResponse.data.length;
          setAverageReview(avgRating);
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProductData();
  }, [productID]);

  const { status, error, makeOffer } = useMakeOffer(
    product._id,
    offerAmount,
    sellerID
  );

  const handleMakeOffer = () => {
    makeOffer();
    setSelectedProduct(product);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="container mx-auto w-75 ">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              className="img-fluid rounded-start"
              alt="Product"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title flex-grow-1">{product.product}</h5>
              </div>
              <p className="card-text py-2">{product.category}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  <StarRatings
                    rating={averageReview}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                  />
                </small>
              </p>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="me-2">Quantity: {quantity}</span>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <div className="d-flex  gap-3 py-4 align-items-baseline">
                <p>Share:</p>
                <FaceBookShare url={protag} quote={product.product} />
              </div>
              {product.uploadedBy?.userType === "seller" &&
              authUser?.userType === "customer" ? (
                <div className="text-end">
                  <p className="card-text">Price: {product.price}</p>
                  {/* <button className="btn btn-dark">Add to Cart</button> */}
                  <button className="btn btn-dark" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => setShowOfferInput(!showOfferInput)}
                  >
                    Make Offer to Seller
                  </button>
                  {showOfferInput && (
                    <div>
                      <input
                        type="number"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        placeholder="Enter your offer"
                      />
                      <button
                        onClick={() => {
                          handleMakeOffer();
                          navigate("/chat");
                        }}
                      >
                        Submit Offer
                      </button>
                      {/* <button className="btn btn-primary mt-2" onClick={handleAddToCart}>Add to Cart</button> */}
                      <div>
                        {status === "loading" && <p>Loading...</p>}
                        {status === "error" && <p>Error: {error.message}</p>}
                        {status === "success" && (
                          <p>Offer sent successfully!</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="card-text">Price: {product.price}</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageDashboard;
