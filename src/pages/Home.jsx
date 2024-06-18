import { useEffect, useState } from "react";
import { ApiBaseURL1 } from "../configs/AppConfig";

export default function Home() {
  const [msgAlert, setMsgAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [userDummy, setUserDummy] = useState([]);
  const [userId, setUserId] = useState(null);
  const [inputIdentityNumber, setInputIdentityNumber] = useState("");
  const [inputEmailAddress, setInputEmailAddress] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputDateOfBirth, setInputDateOfBirth] = useState("");

  const fetchUser = async () => {
    try {
      const response = await ApiBaseURL1.get("/users");
      setUserDummy(response.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetInput = () => {
    setInputDateOfBirth("");
    setInputEmailAddress("");
    setInputIdentityNumber("");
    setInputName("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiBaseURL1.post("/user", {
        identityNumber: inputIdentityNumber,
        emailAddress: inputEmailAddress,
        name: inputName,
        dateOfBirth: inputDateOfBirth,
      });
      setMsgAlert(response.data.message);
      setTypeAlert(response.data.status);
      resetInput();
      fetchUser();
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsgAlert(error.response.data.message);
        setTypeAlert(error.response.data.status);
      } else {
        setMsgAlert(error.message);
        setTypeAlert("fail");
      }
    }
  };

  const handleDeleteClick = (userId) => {
    setUserId(userId);
    setMsgAlert("");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await ApiBaseURL1.delete("/user/" + userId);
      fetchUser();
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsgAlert(error.response.data.message);
        setTypeAlert(error.response.data.status);
      } else {
        setMsgAlert(error.message);
        setTypeAlert("fail");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="text-center">Welcome</h1>

      <div className="d-flex mt-3" style={{ justifyContent: "space-between" }}>
        <h4>Users</h4>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#modalAddUser"
          onClick={() => {
            setMsgAlert("");
          }}
        >
          Add
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center">No</th>
            <th>ID Number</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Date Of Birth</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {userDummy?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{item.identityNumber}</td>
                <td>{item.name}</td>
                <td>{item.emailAddress}</td>
                <td>{item.dateOfBirth}</td>
                <td className="text-center">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setMsgAlert("");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalDeleteUser"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal add user */}
      <div
        className="modal fade"
        id="modalAddUser"
        tabIndex="-1"
        aria-labelledby="modalAddUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalAddUserLabel">
                Add
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Identity Number</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={inputIdentityNumber}
                    onChange={(e) => {
                      setInputIdentityNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={inputName}
                    onChange={(e) => {
                      setInputName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={inputEmailAddress}
                    onChange={(e) => {
                      setInputEmailAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="yyyy-mm-dd"
                    value={inputDateOfBirth}
                    onChange={(e) => {
                      setInputDateOfBirth(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
              <div className="container">
                {/* Alert */}
                {msgAlert !== "" && (
                  <div
                    className={`alert alert-dismissible fade show ${
                      typeAlert === "fail" ? "alert-danger" : "alert-success"
                    }`}
                    role="alert"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {typeAlert === "success" && (
                        <div className="spinner-border me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      {msgAlert}
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={() => {
                        setMsgAlert("");
                      }}
                    ></button>
                  </div>
                )}
                {/* End Alert */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Modal add user */}

      {/* Modal Delete user */}
      <div
        className="modal fade"
        id="modalDeleteUser"
        tabIndex="-1"
        aria-labelledby="modalDeleteUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalDeleteUserLabel">
                Delete
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <p>Yakin ingin menghapus data ini?</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <div className="container">
              {/* Alert */}
              {msgAlert !== "" && (
                <div
                  className={`alert alert-dismissible fade show ${
                    typeAlert === "fail" ? "alert-danger" : "alert-success"
                  }`}
                  role="alert"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {typeAlert === "success" && (
                      <div className="spinner-border me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    {msgAlert}
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      setMsgAlert("");
                    }}
                  ></button>
                </div>
              )}
              {/* End Alert */}
            </div>
          </div>
        </div>
      </div>
      {/* End Modal delete user */}
    </div>
  );
}
