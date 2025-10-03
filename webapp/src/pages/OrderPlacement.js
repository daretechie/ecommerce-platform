import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../apiClient";

function OrderPlacement() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    axios
      .get(apiUrl("/products"))
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        apiUrl("/orders"),
        {
          productId: Number(productId),
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => alert(`Order created with ID: ${res.data.id}`))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2 style={{margin: "8px 0 18px"}}>Place an Order</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="product">Product</label>
          <select
            id="product"
            className="select"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="label" htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            className="input"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <button className="btn primary" type="submit">Submit Order</button>
        </div>
      </form>
    </div>
  );
}

export default OrderPlacement;
