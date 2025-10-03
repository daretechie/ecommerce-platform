import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1.2fr 1fr",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 10px", fontSize: "2rem" }}>
            Your one‑stop shop for gadgets
          </h1>
          <p className="card-desc" style={{ fontSize: "1.05rem" }}>
            Discover premium laptops, smartphones, tablets and accessories at
            great prices.
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <Link to="/products" className="btn primary">
              Shop Products
            </Link>
            <a href="#categories" className="btn">
              Browse Categories
            </a>
          </div>
        </div>
        <div
          style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}
        >
          <img
            src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=60"
            alt="Laptop"
            style={{
              width: "100%",
              aspectRatio: "16 / 10",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.15)",
            }}
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=60"
            alt="Tablet"
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.15)",
            }}
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=60"
            alt="Laptop"
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.15)",
            }}
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=60"
            alt="Phone"
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.15)",
            }}
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=60"
            alt="Tablet"
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.15)",
            }}
            loading="lazy"
          />
        </div>
      </section>

      <section id="categories" style={{ marginTop: 28 }}>
        <h2 style={{ margin: "8px 0 18px" }}>Popular Categories</h2>
        <div className="grid">
          <div className="card">
            <img
              className="card-media"
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=60"
              alt="Laptops"
            />
            <div className="card-body">
              <h3 className="card-title">Laptops</h3>
              <p className="card-desc">
                Work and play with performance notebooks.
              </p>
            </div>
          </div>
          <div className="card">
            <img
              className="card-media"
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=60"
              alt="Phones"
            />
            <div className="card-body">
              <h3 className="card-title">Phones</h3>
              <p className="card-desc">
                Stay connected with the latest smartphones.
              </p>
            </div>
          </div>
          <div className="card">
            <img
              className="card-media"
              src="https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=60"
              alt="Tablets"
            />
            <div className="card-body">
              <h3 className="card-title">Tablets</h3>
              <p className="card-desc">
                Portable power for entertainment and work.
              </p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <Link to="/products" className="btn">
            Explore all products →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
