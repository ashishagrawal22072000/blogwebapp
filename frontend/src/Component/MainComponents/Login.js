import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import login from "../../Images/login.jpg";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export default function Login() {
  const [logins, setlogins] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = logins;
    const res = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      toast.error(data.error[0].msg);
    } else {
      toast.success(data.message);
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <div className="container p-5 mt-5 d-flex justify-content-center ">
        <div
          className="container p-3 border"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <h1 className="text-center mt-3 ">Login YourSelf</h1>
          <form className="p-5 mt-5" method="POST">
            <div className="mb-5">
              <label htmlFor="exampleInputEmail1" class="form-label fw-bold">
                Email address
              </label>
              <input
                type="email"
                className="form-control border-dark border-bottom border-3 rounded-0"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: 0,
                }}
                value={logins.email}
                onChange={(e) =>
                  setlogins({ ...logins, email: e.target.value })
                }
              />
            </div>
            <div class="mb-5">
              <label htmlFor="exampleInputPassword1" class="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                class="form-control border-dark border-bottom border-3 rounded-0"
                id="exampleInputPassword1"
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: 0,
                }}
                value={logins.password}
                onChange={(e) =>
                  setlogins({ ...logins, password: e.target.value })
                }
              />
            </div>

            <button type="submit" class="btn btn-dark" onClick={loginuser}>
              Login
            </button>
            <div>
              <p className="fw-bold mt-3 text-center ">
                Don't Have An Account ?{" "}
                <Link
                  to="/register"
                  className="text-danger text-decoration-none"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="container border border-5">
          <img src={login} alt="login" height="100%" width="100%" />
        </div>
      </div>
    </>
  );
}
