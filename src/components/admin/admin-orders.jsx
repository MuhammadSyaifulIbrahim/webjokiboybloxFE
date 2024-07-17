import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "/src/styles/admin/admin-orders.css";
import { formatRupiah } from "../../Functions/libs/formatRupiah";
import { useEffect, useState } from "react";
import { changeStatus, getAllOrder } from "../../Functions/API/fetchOrder";
export const AdminOrders = ({ user }) => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState();

  const token = localStorage.getItem("token");

  if (!token) {
    window.alert("Anda perlu login terlebih dahulu! ");
    window.location.href = "/login";
  }
  if (user) {
    if (user?.role !== "ADMIN") {
      window.location.href = "/";
    }
  }
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await getAllOrder(`?page=${currentPage}`, token);
        console.log(response);
        setData(response?.data?.data?.orders);
        setCurrentPage(response?.data?.data?.page);
        setTotalPage(response?.data?.data?.total_pages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setShouldRefetch(false);
      }
    };
    if (shouldRefetch) {
      fetch();
    }
  }, [shouldRefetch]);

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
    setShouldRefetch(true);
  };

  const handleStatusChange = async (value, id) => {
    const confirm = window.confirm("Apakah anda yakin ingin mengubah data pesanan ?");

    if (confirm) {
      try {
        const response = await changeStatus(id, { status: value }, token);
        window.alert(response?.data?.message);
        setShouldRefetch(true);
      } catch (error) {
        console.log(error);
        window.alert(`Gagal, ${error?.response?.data?.message}`);
      }
    }
  };

  return (
    <div className="min-vh-100 w-100 d-flex flex-column align-items-center">
      <h1 className="my-5">Daftar Pesanan</h1>
      <div className="w-100 d-flex flex-column align-items-center mb-5">
        <div className="table-res bg-white p-3 border shadow rounded">
          {/* <div className="text-start">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Masukkan nomor invoice atau nama user..." aria-label="Search" />
              <button class="btn btn-outline-primary fs-5 text-nowrap" type="submit">
                Cari Pesanan
              </button>
            </form>
          </div> */}
          <div className="overflow-x-auto w-100">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Nama</th>
                  <th>Telepon</th>
                  <th>Harga</th>
                  <th>Bukti</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  data &&
                  data?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.no_invoice}</td>
                        <td>{item?.user?.name}</td>
                        <td>{item?.phone}</td>
                        <td>{formatRupiah(item?.total_payment)}</td>
                        <td>
                          {item?.payment_image ? (
                            <a className="btn btn-primary" href={item?.payment_image} target="_blank">
                              Lihat
                            </a>
                          ) : (
                            "Belum dibayar"
                          )}
                        </td>
                        <td>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            value={item?.order_status}
                            style={{ width: "120px" }}
                            onChange={(e) => {
                              handleStatusChange(e.target.options[e.target.selectedIndex].value, item?.id);
                            }}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="SELESAI">SELESAI</option>
                          </select>
                        </td>
                        <td>
                          <button className="btn btn-primary" onClick={() => setItem(item)}>
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
          {item && <ShowModal item={item} setItem={setItem} />}
          <div className="overflow-x-auto w-100">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              pageRangeDisplayed={0}
              initialPage={currentPage - 1}
              pageCount={totalPage}
              onPageChange={handlePageChange}
              previousLabel="< previous"
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item text-nowrap"
              previousLinkClassName="page-link"
              nextClassName="page-item text-nowrap"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function ShowModal({ item, setItem }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setItem();

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center" id="detail-order">
            <div class="card" style={{ width: "60rem" }} className="rounded bg-white">
              <div class="card-body m-md-5 m-3">
                <div className="row m-0 p-0">
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6 ">
                      <label for="invoice" class="form-label fw-semibold">
                        Nomor Invoice
                      </label>
                      <input type="text" class="form-control" disabled value={item?.no_invoice}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <h4>Data Pesanan</h4>
                    <div class="mb-3 col-md-6 ">
                      <label for="rankAwal" class="form-label">
                        Rank awal
                      </label>
                      <input type="text" class="form-control" disabled value={item?.from_rank?.name}></input>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="rankTujuan" class="form-label">
                        Rank tujuan
                      </label>
                      <input type="text" class="form-control" disabled value={item?.to_rank?.name}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6 ">
                      <label for="server" class="form-label">
                        Server
                      </label>
                      <input type="text" class="form-control" disabled value={item?.server}></input>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="metode" class="form-label">
                        Metode Pembayaran
                      </label>
                      <input type="text" class="form-control" disabled value={item?.payment_method}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6 ">
                      <label for="proses" class="form-label">
                        Waktu Proses
                      </label>
                      <input type="text" class="form-control" disabled value={item?.processing_time}></input>
                    </div>
                    <div class="mb-3 col-md-6 ">
                      <label for="phone" class="form-label">
                        Nomor Telepon
                      </label>
                      <input type="text" class="form-control" id="phone" disabled value={item?.phone}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6 ">
                      <label for="status" class="form-label">
                        Status
                      </label>
                      <input type="text" class="form-control" disabled value={item?.order_status}></input>
                    </div>
                    {item?.payment_image && (
                      <div class="mb-3 col-md-6 ">
                        <label for="bukti" class="form-label">
                          Bukti Pembayaran
                        </label>
                        <a className="btn btn-primary d-block" href={item?.payment_image} target="_blank">
                          Lihat Bukti
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="row m-0 p-0">
                    <h4>Data User</h4>
                    <div class="mb-3 col-md-6 ">
                      <label for="username" class="form-label">
                        Username
                      </label>
                      <input type="text" class="form-control" id="username" disabled value={item?.user?.name}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <h4>Data Akun</h4>
                    <div class="mb-3 col-md-6 ">
                      <label for="username" class="form-label">
                        Username
                      </label>
                      <input type="text" class="form-control" id="username" disabled value={item?.account?.username}></input>
                    </div>
                    {item?.account?.password && (
                      <div class="mb-3 col-md-6 ">
                        <label for="password" class="form-label">
                          Password
                        </label>
                        <input type="text" class="form-control" id="password" disabled value={item?.account?.password}></input>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="fs-4 fw-semibold">Harga</p>
                    <p className="fs-4 fw-semibold">{formatRupiah(item?.total_payment)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
