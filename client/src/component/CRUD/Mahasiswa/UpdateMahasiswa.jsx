import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const UpdateMahasiswa = ({ isUpdate, datas }) => {
  // Start Modal bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [namaMahasiswa, setnamaMahasiswa] = useState();
  const [noInduk, setNoInduk] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState();

  //Get handling by:id
  const getMahasiswaById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/mahasiswa/${datas.id_mhs}`
      );
        const data = await response.data.data;
      setnamaMahasiswa(data.nama);
      setNoInduk(data.noInduk);
      setStatus(data.status);
      setRole(data.role)
      setPassword(data.password)
      setAngkatan(data.angkatan);
      setShow(true);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const loadFile = (e)=>{
    setFile(e.target.files[0])
  }

  //update handling by:id
  const updateMahasiswa = async () => {
    const formData = new FormData();
    formData.append("nama", namaMahasiswa);
    formData.append("noInduk", noInduk);
    formData.append("angkatan", angkatan);
    formData.append("password", password);
    formData.append("status", status);
    formData.append("role", role);
    formData.append("file", file);
    try {
      await axios.put(
        ` http://localhost:5000/api/v1/mahasiswa/update/${datas.id_mhs}`,formData
      );
      reloadPage()
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    updateMahasiswa(datas.id_mhs);
    setShow(false);

  };

    const reloadPage = ()=>{
      window.location.reload()
    }

  return (
    <div>
      {" "}
      <i class="fas fa-regular fa-pen" onClick={getMahasiswaById}></i>
      <Modal show={show} onHide={handleClose} size="lg" className="modal-css">
        <Modal.Header closeButton>
          <Modal.Title className="label ">* Update Data Mahasiswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdate}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan Nama"
                    value={namaMahasiswa}
                    onChange={(e) => setnamaMahasiswa(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>No Induk</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan Nim"
                    value={noInduk}
                    onChange={(e) => setNoInduk(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Status</Form.Label>
                    <select
                    class="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>Pilih Status ...</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Cuti">Cuti</option>
                      <option value="Drop Out">Drop Out</option>
                      <option value="Lulus">Lulus</option>
                    </select>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Angkatan</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukan Angkatan"
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                  />
                </Form.Group>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Role</Form.Label>
                    <select
                    class="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    >
                      <option>Pilih Role ...</option>
                      <option value="mahasiswa">mahasiswa</option>
                      {/* <option value="Tidak Aktif">Tidak Aktif</option> */}
                    </select>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div class="form-group ">
                    <Form.Group controlId="formFile"  >
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file"  onChange={loadFile}/>
                    </Form.Group>
                  </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <div class="text-center text-danger ">{msg}</div>
          <div className="d-flex gap-3">
            <Button variant="primary" type="submit" onClick={handleUpdate}>
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateMahasiswa;
