import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts()
      .then(data => {
        if (!cancelled) setProducts(data);
      })
      .catch(err => {
        if (!cancelled) setError(err.message || "Failed to fetch");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h1 className="text-2xl mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="border rounded p-4 shadow-sm">
            <img src={p.image} alt={p.title} className="h-40 object-contain mx-auto mb-2" />
            <h2 className="font-semibold">{p.title}</h2>
            <p className="mt-2">${p.price}</p>
            <div className="mt-3 flex gap-2">
              <Link to={`/details/${p.id}`} className="underline">Details</Link>
              <Link to={`/order/${p.id}`} className="ml-auto text-white bg-blue-600 px-3 py-1 rounded">Order</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
