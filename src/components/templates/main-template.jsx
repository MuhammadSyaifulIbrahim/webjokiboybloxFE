import logo from "../../assets/images/logo.png";
import "../../App.css";
import "../../styles/templates/main.css";
import { useEffect, useState } from "react";
import { whoami } from "../../Functions/API/fetchAuth";
export const MainTemplate = ({ component: Component }) => {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await whoami(token);

        setUser(response?.data?.data?.user);
      } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };
    if (token) {
      fetch();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="">
      {/* NAVIGATION BAR */}
      <nav class="navbar navbar-expand-lg bg-dark sticky-top">
        <div class="container-xl">
          <a class="navbar-brand text-info fw-bold fs-2" href="/">
            <img src={logo} alt="Logo Website" className="" width={"140px"} />
          </a>
          <button class="navbar-toggler text-bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item px-2">
                <a class="nav-link rounded px-3 a-btn" aria-current="page" href="/">
                  Home
                </a>
              </li>

              {user ? (
                user?.role == "USER" ? (
                  <>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn" href="/checkout">
                        Joki Valorant
                      </a>
                    </li>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn" href="/orders">
                        Cek Pesanan
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn" href="/admin/orders">
                        Daftar Pesanan
                      </a>
                    </li>
                  </>
                )
              ) : (
                <></>
              )}
              {user ? (
                <li class="nav-item px-2 dropdown">
                  <a class="nav-link dropdown-toggle rounded text-center px-3 bg-white pointer" data-bs-toggle="dropdown" aria-expanded="false">
                    {user?.name?.split(" ")[0]}
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li class="nav-item px-2">
                  <a class="nav-link rounded px-3 a-btn" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* MAIN COMPONENT */}
      <div className="bg-body-tertiary">
        <Component user={user} />
      </div>
      {/* FOOOTER */}
      <div className="w-100 bg-dark m-0 p-0">
        <div className="row justify-content-around align-content-start m-0 p-0 text-white py-5 mx-3">
          <div className="col-md-3">
            <h3>Anda ingin :</h3>
            <div className="mt-3">
              <ul>
                <li>
                  <a href="/register" className="btn btn-light">
                    Buat Akun
                  </a>
                </li>
                <li className="mt-3">
                  <a href="/login" className="btn btn-light">
                    Masuk Akun
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 mt-md-0 mt-3 ">
            <h3>Kontak Kami :</h3>
            <div className="mt-3">
              <ul>
                <li>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=boybloxstore@gmail.com&su=SUBJECT&body=BODY" target="_blank" className="text-decoration-none text-white">
                    <span className="me-3">Email : boybloxstore@gmail.com</span>
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mt-3">
                  <a href="https://www.instagram.com/Boyblox_Store" target="_blank" className="text-decoration-none text-white">
                    <span className="me-3">Instagram : @Boyblox_Store</span>
                    <svg width="33px" height="33px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        fill="#FFFFFF"
                      />
                      <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#0F0F0F" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mt-3">
                  <a href="https://wa.me/081284831273" target="_blank" className="text-decoration-none text-white">
                    <span className="me-3">Phone : 081284831273</span>
                    <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                        fill="#FFFFFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="text-white m-0 p-0" />
        <p className="m-0 px-0 py-3 text-white text-center">2024@ All rights reserved. Sirkel Dosen Team</p>
      </div>
    </div>
  );
};
