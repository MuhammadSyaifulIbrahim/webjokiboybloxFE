import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import qris from "/src/assets/images/qris.png";
import "/src/styles/checkout/card-checkout.css";
import { formatRupiah } from "../../Functions/libs/formatRupiah";
import { uploadPayment } from "../../Functions/API/fetchOrder";
export const CardOrder = ({ data }) => {
  const [uploaded, setUploaded] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center  mb-5" id="detail-order">
        <div class="card" style={{ width: "60rem" }} className="mt-5 shadow rounded mx-md-0 mx-3 bg-white">
          <div class="card-body m-md-5 m-3">
            <h5 class="card-title text-center fs-3 mb-3">Detail Pesanan</h5>
            <div className="row m-0 p-0">
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="invoice" class="form-label fw-semibold">
                    Nomor Invoice
                  </label>
                  <input type="text" class="form-control" disabled value={data?.no_invoice}></input>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="rankAwal" class="form-label">
                    Rank awal
                  </label>
                  <input type="text" class="form-control" disabled value={data?.from_rank?.name}></input>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="rankTujuan" class="form-label">
                    Rank tujuan
                  </label>
                  <input type="text" class="form-control" disabled value={data?.to_rank?.name}></input>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="server" class="form-label">
                    Server
                  </label>
                  <input type="text" class="form-control" disabled value={data?.server}></input>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="metode" class="form-label">
                    Metode Pembayaran
                  </label>
                  <input type="text" class="form-control" disabled value={data?.payment_method}></input>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="proses" class="form-label">
                    Waktu Proses
                  </label>
                  <input type="text" class="form-control" disabled value={data?.processing_time}></input>
                </div>
                <div class="mb-3 col-md-6 ">
                  <label for="phone" class="form-label">
                    Nomor Telepon
                  </label>
                  <input type="text" class="form-control" id="phone" disabled value={data?.phone}></input>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="status" class="form-label">
                    Status
                  </label>
                  <input type="text" class="form-control" disabled value={data?.order_status}></input>
                </div>
                {data?.payment_image && (
                  <div class="mb-3 col-md-6 ">
                    <label for="bukti" class="form-label">
                      Bukti Pembayaran
                    </label>
                    <a className="btn btn-primary d-block" href={data?.payment_image} target="_blank">
                      Lihat Bukti
                    </a>
                  </div>
                )}
              </div>
              <div className="row m-0 p-0">
                <h4>Data Akun</h4>
                <div class="mb-3 col-md-6 ">
                  <label for="username" class="form-label">
                    Username
                  </label>
                  <input type="text" class="form-control" id="username" disabled value={data?.account?.username}></input>
                </div>
                {data?.account?.password && (
                  <div class="mb-3 col-md-6 ">
                    <label for="password" class="form-label">
                      Password
                    </label>
                    <input type="text" class="form-control" id="password" disabled value={data?.account?.password}></input>
                  </div>
                )}
              </div>
              <div>
                <p className="fs-4 fw-semibold">Harga</p>
                <p className="fs-4 fw-semibold">{formatRupiah(data?.total_payment)}</p>
              </div>
              {uploaded && (
                <div className="text-center">
                  <a href={`/orders/${data?.no_invoice}`} className="btn btn-primary w-100 fw-semibold">
                    Cek Pesanan
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!data?.payment_image && (
        <div className="d-flex justify-content-center align-items-center  mb-5">
          <div class="card" style={{ width: "60rem" }} className="mt-5 shadow rounded mx-md-0 mx-3 bg-white">
            <h5 class="card-title fs-3 mb-3 border-bottom py-2 mx-5 mt-4">Pembayaran</h5>

            <div class="card-body m-md-5 m-3">
              <p className="text-center">Silahkan klik tombol dibawah untuk melakukan pembayaran</p>
              <ModalPayment id={data?.id} invoice={data?.no_invoice} uploaded={uploaded} setUploaded={setUploaded} />
              <p className="text-center fw-light">Penting!!! Lakukan pembayaran sebelum 1x24 jam, jika tidak melakukan pembayaran dari waktu yang ditentukan pesanan akan dianggap hangus.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function ModalPayment({ id, invoice, uploaded, setUploaded }) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [success, setSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSuccess(undefined);
  };
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const response = await uploadPayment(id, formData, token);
      console.log(response);
      setSuccess(true);
      setUploaded(true);
    } catch (error) {
      setSuccess(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button className="btn btn-primary text-center w-100 mb-3" onClick={handleShow}>
        {" "}
        Bayar Sekarang
      </button>

      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Upload Bukti Pembayaran</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {uploaded ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-circle-fill text-info success-icon" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <div class="my-3 text-center">
                  <h3 className="text-info">Upload Bukti Pembayaran Berhasil !!</h3>
                  <h4 className="alert alert-info">Klik link dibawah untuk melihat detail pesanan terbaru anda</h4>
                  <a href={`/orders/${invoice}`} className="btn btn-primary fs-4">
                    Cek Pesanan
                  </a>
                </div>
              </div>
            ) : success === true ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-circle-fill text-info success-icon" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <div class="my-3 text-center">
                  <h3 className="text-info">Upload Bukti Pembayaran Berhasil !!</h3>
                  <h4 className="alert alert-info">Klik link dibawah untuk melihat detail pesanan terbaru anda</h4>
                  <a href={`/orders/${invoice}`} className="btn btn-primary fs-4">
                    Cek Pesanan
                  </a>
                </div>
              </div>
            ) : success === false ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill text-danger success-icon" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
                <div class="my-3 text-center">
                  <h3 className="text-danger">Upload Bukti Pembayaran Gagal</h3>
                  <h4 className="alert alert-danger">Simpan nomor invoice dan coba beberapa saat lagi.</h4>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h3>QRIS</h3>
                <img src={qris} alt="Gambar QRIS" style={{ maxWidth: "100%" }} />
                <div class="my-3 upload-payment text-center">
                  <label htmlFor="inputGroupFile01" className="fs-4 fw-semibold">
                    Upload Bukti Pembayaran disini
                  </label>
                  <input type="file" class="form-control border border-primary shadow" id="inputGroupFile01" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading || success !== undefined || uploaded}>
              {isLoading ? "Menunggu..." : "Upload Bukti Pembayaran"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
