import { useEffect, useState } from "react";
import { getRanks } from "../../Functions/API/fetchRanks";
import { CardOrder } from "./card-checkout";
import { formatRupiah } from "../../Functions/libs/formatRupiah";
import { checkoutPayment } from "../../Functions/API/fetchOrder";

export const Checkout = ({ user }) => {
  const [data, setData] = useState();
  const [fromRank, setFromRank] = useState();
  const [toRank, setToRank] = useState();
  const [server, setServer] = useState();
  const [method, setMethod] = useState();
  const [process, setProcess] = useState();
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [checkout, setCheckout] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getRanks();
        setData(response?.data?.data);
        console.log(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const updatePayment = () => {
    const SERVER = {
      ASIA: 0,
    };

    const PROCESS = {
      NORMAL: 0,
      CEPAT: 30000,
      KILAT: 60000,
    };

    const from_rank = data?.ranks.find((e) => e.id === fromRank);
    const to_rank = data?.ranks.find((e) => e.id === toRank);

    if (!fromRank || !toRank) {
      return null;
    }

    let total_payment = 0;
    for (let i = from_rank.rank_order; i < to_rank.rank_order; i++) {
      total_payment += data?.ranks[i].price;
    }

    if (SERVER[server]) {
      total_payment += SERVER[server];
    }

    if (PROCESS[process]) {
      total_payment += PROCESS[process];
    }

    return total_payment;
  };

  const subtotal = data ? updatePayment() : null;

  const clearData = () => {
    setFromRank();
    setToRank();
    setServer();
    setMethod();
    setProcess();
    setPhone();
    setUsername();
    setPassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const from_rank = data?.ranks.find((e) => e.id === fromRank);
    const to_rank = data?.ranks.find((e) => e.id === toRank);

    if (from_rank.rank_order >= to_rank.rank_order) {
      setError("Rank awal tidak boleh sama atau lebih dari rank tujuan!");
      return;
    }

    const checkoutData = {
      phone,
      username,
      password,
      from_rank_id: fromRank,
      to_rank_id: toRank,
      server,
      processing_time: process,
      payment_method: method,
    };
    setIsLoading(true);
    try {
      const response = await checkoutPayment(checkoutData, token);
      setCheckout(response?.data?.data?.checkout);
      setSuccess(response?.data?.message);
      clearData();
      setIsLoading(false);
      setTimeout(() => {
        setSuccess("");
        window.location.href = "#detail-order";
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center  mb-5">
        <div class="card" style={{ width: "60rem" }} className="mt-5 shadow rounded mx-md-0 mx-3 bg-white">
          <form class="card-body m-md-5 m-3" onSubmit={handleSubmit}>
            <h5 class="card-title text-center fs-3 mb-3">Buat Orderan</h5>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {success && <div className="alert alert-info text-center">{success}</div>}
            <div className="row m-0 p-0">
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="rankAwal" class="form-label">
                    Pilih rank awal
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="rankAwal"
                    required
                    onChange={(e) => {
                      setFromRank(e.target.options[e.target.selectedIndex].value);
                      setError("");
                    }}
                  >
                    <option value="" selected>
                      Pilih rank awal
                    </option>
                    {data?.ranks ? (
                      data?.ranks.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>;
                      })
                    ) : (
                      <option value="">No Value</option>
                    )}
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="rankTujuan" class="form-label">
                    Pilih rank tujuan
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="rankTujuan"
                    required
                    onChange={(e) => {
                      setToRank(e.target.options[e.target.selectedIndex].value);
                      setError("");
                    }}
                  >
                    <option value="" selected>
                      Pilih rank tujuan
                    </option>
                    {data?.ranks ? (
                      data?.ranks.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>;
                      })
                    ) : (
                      <option value="">No Value</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="server" class="form-label">
                    Pilih server
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="server"
                    onChange={(e) => {
                      setServer(e.target.options[e.target.selectedIndex].value);
                      setError("");
                    }}
                  >
                    <option value="" selected>
                      Pilih server
                    </option>
                    {data?.SERVER ? Object.keys(data?.SERVER).map((key, index) => <option value={data?.SERVER[key]}>{data?.SERVER[key]}</option>) : <option value="">No Value</option>}
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="metode" class="form-label">
                    Pilih metode pembayaran
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="metode"
                    onChange={(e) => {
                      setMethod(e.target.options[e.target.selectedIndex].value);
                      setError("");
                    }}
                  >
                    <option value="" selected>
                      Pilih metode pembayaran
                    </option>
                    {data?.PAYMENT_METHOD ? Object.keys(data?.PAYMENT_METHOD).map((key, index) => <option value={data?.PAYMENT_METHOD[key]}>{data?.PAYMENT_METHOD[key]}</option>) : <option value="">No Value</option>}
                  </select>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="proses" class="form-label">
                    Pilih waktu proses
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="proses"
                    onChange={(e) => {
                      setProcess(e.target.options[e.target.selectedIndex].value);
                      setError("");
                    }}
                  >
                    <option value="" selected>
                      Pilih waktu proses
                    </option>
                    {data?.PROCESSING_TIME ? Object.keys(data?.PROCESSING_TIME).map((key, index) => <option value={data?.PROCESSING_TIME[key]}>{data?.PROCESSING_TIME[key]}</option>) : <option value="">No Value</option>}
                  </select>
                </div>
                <div class="mb-3 col-md-6 ">
                  <label for="phone" class="form-label">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    placeholder="Masukkan nomor telepon..."
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError("");
                    }}
                  ></input>
                </div>
              </div>
              <div className="row m-0 p-0">
                <h4>Data Akun</h4>
                <div class="mb-3 col-md-6 ">
                  <label for="username" class="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Masukkan username akun..."
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                  ></input>
                </div>
                <div class="mb-3 col-md-6 ">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="password"
                    placeholder="Masukkan password akun..."
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  ></input>
                </div>
              </div>
              <div>
                <p className="fs-4 fw-semibold">Subtotal</p>
                <p className="fs-4 fw-semibold">{formatRupiah(subtotal) || 0}</p>
              </div>
              <div className="w-100">
                <button type="submit" className="btn btn-primary w-100 fw-semibold" disabled={isLoading || checkout}>
                  {isLoading ? "Menunggu..." : "Checkout"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {checkout && <CardOrder data={checkout} />}
    </>
  );
};
