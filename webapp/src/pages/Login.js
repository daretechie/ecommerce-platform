import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/products");
      })
      .catch((err) => {
        console.error(err);
        alert("Invalid credentials");
      });
  };

  return (
    <div>
      <h2 style={{margin: "8px 0 18px"}}>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="username">Username</label>
          <input
            id="username"
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="btn primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
