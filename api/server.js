const express = require("express");
const app = express();
app.use(express.json());

// Sample data
let products = [
  { id: 1, name: "Laptop", price: 100 },
  { id: 2, name: "Phone", price: 50 },
  { id: 3, name: "Tablet", price: 30 },
];

let orders = [];

// Routes or Endpoint
app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/orders", (req, res) => {
  const order = { id: orders.length + 1, ...req.body };
  orders.push(order);
  res.status(201).json(order);
});

// Start the server
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

module.exports = app; // Export app for testing
