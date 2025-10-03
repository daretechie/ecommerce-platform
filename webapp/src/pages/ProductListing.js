import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiUrl } from "../apiClient";

function ProductListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl("/products")) // use CRA proxy to avoid CORS and environment-specific hosts
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 style={{ margin: "8px 0 18px" }}>Products</h2>
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <img
              className="card-media"
              src={p.imageUrl}
              alt={p.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=60";
              }}
            />
            <div className="card-body">
              <h3 className="card-title">{p.name}</h3>
              <p className="card-desc">{p.description}</p>
              <p className="price">${p.price}</p>
              <div style={{ marginTop: 10 }}>
                <Link className="btn" to={`/products/${p.id}`}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
