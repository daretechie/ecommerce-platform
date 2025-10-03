const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());

const JWT_SECRET = process.env.JWT_SECRET || "dev_only_secret"; // In a real app, use an environment variable

// Sample data
let products = [
  {
    id: 1,
    name: "Laptop",
    description: "A powerful laptop",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=60",
    price: 100,
  },
  {
    id: 2,
    name: "Phone",
    description: "A smartphone",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=60",
    price: 50,
  },
  {
    id: 3,
    name: "Tablet",
    description: "A tablet for on the go",
    imageUrl:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=60",
    price: 30,
  },
];

let orders = [];

const users = [{ id: 1, username: "user", password: "password" }];

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Routes or Endpoint
app.get("/health", (_req, res) => res.status(200).send("Ok! All good."));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, id: user.id },
      JWT_SECRET
    );
    res.json({ accessToken });
  } else {
    res.status(401).send("Username or password incorrect");
  }
});

app.get("/products", (req, res) => {
  console.log("Request received for /products");
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, description, imageUrl, price } = req.body;
  if (!name || !description || !imageUrl || !price) {
    return res.status(400).send("Missing required fields");
  }
  const product = {
    id: products.length + 1,
    name,
    description,
    imageUrl,
    price,
  };
  products.push(product);
  res.status(201).json(product);
});

app.put("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");

  const { name, description, imageUrl, price } = req.body;
  if (!name || !description || !imageUrl || !price) {
    return res.status(400).send("Missing required fields");
  }

  product.name = name;
  product.description = description;
  product.imageUrl = imageUrl;
  product.price = price;

  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) return res.status(404).send("Product not found");

  products.splice(productIndex, 1);
  res.status(204).send();
});

app.post("/orders", authenticateJWT, (req, res) => {
  const order = { id: orders.length + 1, ...req.body, userId: req.user.id };
  orders.push(order);
  res.status(201).json(order);
});

// Start the server
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

module.exports = app; // Export app for testing
