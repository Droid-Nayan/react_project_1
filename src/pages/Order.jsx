import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/products";
import { useAuth } from "../context/AuthContext";

export default function Order() {
  const { productId } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(productId)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [productId]);

  const placeOrder = () => {
    // This is a mock order flow. In a real app you'd call your backend.
    setStatus("Placing order...");
    setTimeout(() => {
      setStatus(`Order placed! Thank you, ${user?.email || user?.displayName}`);
    }, 1000);
  };

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <section>
      <h2 className="text-xl">Order: {product.title}</h2>
      <p>Ordered by: {user?.displayName || user?.email}</p>
      <p>Price: ${product.price}</p>
      <button onClick={placeOrder} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Place Order</button>
      <div className="mt-2">{status}</div>
    </section>
  );
}
