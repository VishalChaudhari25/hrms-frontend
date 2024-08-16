import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EmployeeEdit() {
  const { employeeCode, adminId } = useParams(); // Retrieve employeeCode and adminId from URL parameters
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/${adminId}/employees`)
      .then((response) => {
        const selectedEmployee = response.data.find(
          (emp) => emp.employeeCode === employeeCode
        );
        setEmployee(selectedEmployee);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [employeeCode, adminId]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const employeeDto = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      city: event.target.city.value,
      age: event.target.age.value,
    };

    axios
      .put(
        `http://localhost:8080/admin/${adminId}/employees/${employeeCode}`,
        employeeDto
      )
      .then((response) => {
        setAlertMessage("Employee updated successfully!");
        setTimeout(() => {
          setAlertMessage("");
          navigate(`/admin/dashboard/${adminId}`, { replace: true });
        }, 2000);
      })
      .catch((error) => {
        console.error(error.response.data); // Log the error response data
        setAlertMessage("Error updating employee!");
      });
  };

  return (
    <div>
      <h1>Edit Employee</h1>

      <form onSubmit={handleUpdate}>
        <label>First Name:</label>
        <input type="text" name="firstName" defaultValue={employee.firstName} />
        <br />
        <label>Last Name:</label>
        <input type="text" name="lastName" defaultValue={employee.lastName} />
        <br />
        <label>Email:</label>
        <input type="email" name="email" defaultValue={employee.email} />
        <br />
        <label>City:</label>
        <input type="text" name="city" defaultValue={employee.city} />
        <br />
        <label>Age:</label>
        <input type="text" name="age" defaultValue={employee.age} />
        <br />
        <button type="submit">Update</button>
        {alertMessage && <div style={{ color: "green" }}>{alertMessage}</div>}
      </form>
    </div>
  );
}

export default EmployeeEdit;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function EmployeeEdit() {
//   const { employeeCode, adminId } = useParams(); // Retrieve employeeCode from URL parameter
//   const [employee, setEmployee] = useState({});
//   const navigate = useNavigate();
//   const [alertMessage, setAlertMessage] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/admin/${adminId}/employees/${employeeCode}`)
//       .then((response) => {
//         setEmployee(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [employeeCode, adminId]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setEmployee({ ...employee, [name]: value });
//   };

//   const handleUpdate = (event) => {
//     event.preventDefault();
//     const employeeDto = {
//       firstName: updatedEmployee.firstName,
//       lastName: updatedEmployee.lastName,
//       email: updatedEmployee.email,
//       city: updatedEmployee.city,
//       age: updatedEmployee.age,
//     };

//     axios
//       .put(
//         `http://localhost:8080/admin/${adminId}/employees/${employeeCode}`,
//         employeeDto
//       )
//       .then((response) => {
//         setAlertMessage("Employee updated successfully!");
//         setTimeout(() => {
//           setAlertMessage("");
//         }, 2000);
//         navigate(`/admin/dashboard/${adminId}`, { replace: true });
//       })
//       .catch((error) => {
//         console.error(error.response.data); // Log the error response data
//         setAlertMessage("Error updating employee!");
//       });
//   };

//   return (
//     <div>
//       <h1>Edit Employee</h1>
//       <form onSubmit={handleUpdate}>
//         <label>First Name:</label>
//         <input
//           type="text"
//           name="firstName"
//           value={employee.firstName || ""}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>Last Name:</label>
//         <input
//           type="text"
//           name="lastName"
//           value={employee.lastName || ""}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={employee.email || ""}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>City:</label>
//         <input
//           type="text"
//           name="city"
//           value={employee.city || ""}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>Age:</label>
//         <input
//           type="text"
//           name="age"
//           value={employee.age || ""}
//           onChange={handleInputChange}
//         />
//         <br />
//         <button type="submit">Update</button>
//         {alertMessage && <div style={{ color: "green" }}>{alertMessage}</div>}
//       </form>
//     </div>
//   );
// }

// export default EmployeeEdit;
