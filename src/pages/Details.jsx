import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(data => setProduct(data))
      .catch(e => setErr(e.message || "Error loading product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (err) return <div>{err}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <article>
      <h1 className="text-2xl">{product.title}</h1>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <img src={product.image} alt={product.title} className="w-full sm:w-1/3 object-contain" />
        <div>
          <p className="text-lg font-bold">${product.price}</p>
          <p className="mt-2">{product.description}</p>
          <div className="mt-4">
            <Link to={`/order/${product.id}`} className="px-4 py-2 bg-green-600 text-white rounded">Order now</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
