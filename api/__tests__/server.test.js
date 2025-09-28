const request = require("supertest");
const app = require("../server");

describe("E-Commerce API", () => {
  it("GET /products should return product list", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /orders should create a new order", async () => {
    const res = await request(app)
      .post("/orders")
      .send({ productId: 1, quantity: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.productId).toBe(1);
  });
});
