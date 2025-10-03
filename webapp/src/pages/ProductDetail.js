import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../apiClient";
import axios from "axios";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(apiUrl(`/products/${id}`))
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 style={{ margin: "8px 0 18px" }}>Product Details</h2>
      <div className="product-detail">
        <img
          className="product-image"
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=60";
          }}
        />
        <div className="product-panel">
          <h3 style={{ marginTop: 0 }}>{product.name}</h3>
          <p className="card-desc">{product.description}</p>
          <p className="price" style={{ fontSize: "1.15rem" }}>
            ${product.price}
          </p>
          <div style={{ marginTop: 12 }}>
            <a className="btn" href="/products">
              ← Back to products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
