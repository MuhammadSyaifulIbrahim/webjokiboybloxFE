import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { register } from "../../Functions/API/fetchAuth";
import { checkPassword, checkUsername } from "../../Functions/libs/regex";
export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/";
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await register({ username, name, password });

      setSuccess(response.data.message);
      setIsLoading(false);
      setUsername("");
      setPassword("");
      setName("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="vw-100 min-vh-100 bg-body-tertiary m-0 p-0 d-flex justify-content-center align-items-center">
      <Card style={{ width: "33rem" }} className="shadow mx-4">
        <Card.Body className="mx-md-5 mx-3 mb-5">
          <Card.Title className="text-center fs-3 fw-bold my-4">Daftar</Card.Title>
          <form onSubmit={onSubmit}>
            {success && <div className="alert alert-info text-center">{success}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Masukkan username..."
                aria-describedby="usernameHelpBlock"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
              />
            </div>
            {username != "" && !checkUsername(username) && (
              <div id="usernameHelpBlock" class="form-text text-danger mb-3">
                Username harus mempunyai minimal 8 karakter terdiri dari minimal 1 huruf kecil dan dapat mengandung angka.
              </div>
            )}
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Nama Lengkap
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Masukkan nama..."
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />
            </div>
            <label for="inputPassword5" class="form-label">
              Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="inputPassword5"
              class="form-control"
              aria-describedby="passwordHelpBlock"
              placeholder="Masukkan password..."
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <div className="d-flex align-items-center mt-3">
              <input
                type="checkbox"
                style={{ height: "20px", width: "20px" }}
                className="me-2"
                onChange={(e) => {
                  setShowPassword(e.target.checked ? true : false);
                }}
              />{" "}
              Tampilkan password
            </div>
            {password != "" && !checkPassword(password) && (
              <div id="passwordHelpBlock" class="form-text text-danger">
                Password harus mempunyai minimal 8 karakter dan terdiri dari gabungan huruf besar, huruf kecil, dan angka
              </div>
            )}
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-dark w-100" disabled={isLoading || !checkUsername(username) || !checkPassword(password)}>
                {isLoading ? "Mohon tunggu..." : "Daftar"}
              </button>
              <a href="/" className="btn btn-outline-dark w-100 mt-3">
                Kembali ke Home
              </a>
            </div>
            <div className="text-end w-full mt-3">
              <a href="/login">Sudah punya akun ?</a>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};
