import { useState } from "react";
import "/src/styles/orders/findorder.css";

export const FindOrder = ({ user }) => {
  const [invoice, setInvoice] = useState();

  const token = localStorage.getItem("token");

  if (!token) {
    window.alert("Anda perlu login terlebih dahulu! ");
    window.location.href = "/login";
  }

  if (user) {
    if (user?.role !== "USER") {
      window.location.href = "/";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/orders/${invoice}`;
  };
  return (
    <div className="d-flex justify-content-center align-items-center w-100 main-component">
      <div class="card" style={{ width: "60rem" }} className="my-md-0 my-5 shadow rounded mx-md-0 mx-3 bg-white">
        <div class="card-body m-md-5 m-3">
          <h5 class="card-title text-center fs-3 mb-3">Cari Pesanan</h5>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label fs-4 fw-semibold">
                Nomor Invoice
              </label>
              <input
                type="text"
                class="form-control fs-5"
                id="exampleFormControlInput1"
                placeholder="Masukkan nomor invoice..."
                required
                value={invoice}
                onChange={(e) => {
                  setInvoice(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary w-100 fw-semibold">
                Cari Pesanan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
