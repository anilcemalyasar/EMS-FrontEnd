import React, { useEffect } from "react";
import { useState } from "react";
import { listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        listEmployees()
        .then((response) => {
            setEmployees(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [])

    const addNewEmployee = () => {
        // console.log("adding new employee");
        navigator('/add-employee');
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button className="btn btn-primary mb-2" onClick={() => addNewEmployee()}>Add New Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent;





    // const dummyData = [
    //     {
    //       id: "1",
    //       firstName: "Anıl",
    //       lastName: "Yaşar",
    //       email: "mock@gmail.com",
    //     },
    //     {
    //       id: "2",
    //       firstName: "Ece",
    //       lastName: "Loş",
    //       email: "mockdata@gmail.com",
    //     },
    //     {
    //       id: "3",
    //       firstName: "Kaan",
    //       lastName: "Gınık",
    //       email: "mock2@gmail.com",
    //     },
    //     {
    //       id: "4",
    //       firstName: "Olci",
    //       lastName: "Bulut",
    //       email: "mock@gmail.com",
    //     },
    //   ];
