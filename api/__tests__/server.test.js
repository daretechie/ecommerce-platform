const request = require("supertest");
const app = require("../server");

describe("E-Commerce API", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "user", password: "password" });
    token = res.body.accessToken;
  });

  it("GET /products should return product list", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("description");
    expect(res.body[0]).toHaveProperty("imageUrl");
  });

  it("GET /products/:id should return a single product", async () => {
    const res = await request(app).get("/products/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("GET /products/:id should return 404 for non-existent product", async () => {
    const res = await request(app).get("/products/999");
    expect(res.statusCode).toBe(404);
  });

  it("POST /products should create a new product", async () => {
    const newProduct = {
      name: "New Product",
      description: "A new product",
      imageUrl: "https://example.com/new.jpg",
      price: 150,
    };
    const res = await request(app).post("/products").send(newProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(newProduct.name);
  });

  it("PUT /products/:id should update a product", async () => {
    const updatedProduct = {
      name: "Updated Laptop",
      description: "An updated and powerful laptop",
      imageUrl: "https://example.com/updated-laptop.jpg",
      price: 120,
    };
    const res = await request(app).put("/products/1").send(updatedProduct);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedProduct.name);
  });

  it("DELETE /products/:id should delete a product", async () => {
    const res = await request(app).delete("/products/2");
    expect(res.statusCode).toBe(204);
  });

  it("POST /orders should create a new order for authenticated user", async () => {
    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: 1, quantity: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.productId).toBe(1);
  });

  it("POST /orders should return 401 for unauthenticated user", async () => {
    const res = await request(app)
      .post("/orders")
      .send({ productId: 1, quantity: 2 });
    expect(res.statusCode).toBe(401);
  });
});
