import React, { useEffect, useState } from 'react'
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function AddEmployeeComponent() {

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: ''
    });

    const navigator = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setAge(response.data.age);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    const validateForm = () => {
        let valid = true;

        const copyErrors = {... errors};

        if (firstName.trim()) {
            copyErrors.firstName = '';
        }
        else {
            copyErrors.firstName = 'First name is required!';
            valid = false;
        }

        if (lastName.trim()) {
            copyErrors.lastName = '';
        }
        else {
            copyErrors.lastName = 'Last name is required!';
            valid = false;
        }

        if (email.trim()) {
            copyErrors.email = '';
        }
        else {
            copyErrors.email = 'Email is required!';
            valid = false;
        }

        if (age >= 0) {
            copyErrors.age = '';
        }
        else {
            copyErrors.age = 'Age must be a positive number';
            valid = false;
        }

        setErrors(copyErrors);
        return valid;

    }

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const employee = {firstName, lastName, email, age};
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator("/employees")
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                        console.log(response.data);
                        navigator("/employees");
                }).catch(error => {
                    console.error(error);
                })
            };
    
            // navigate to listed employees
        }

    }


    const pageTitle = (id) => {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        }
        else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle(id)
                    }
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid': ''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            { errors.firstName && <div className='invalid-feedback'>{ errors.firstName }</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${ errors.lastName ? 'is-invalid': ''}`}
                                onChange={(e) => setLastName(e.target.value)}
                            >
                            </input>
                            { errors.lastName && <div className='invalid-feedback'>{ errors.lastName }</div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Mail Address</label>
                            <input
                                type='text'
                                placeholder='Enter Email Address'
                                name='email'
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid': ''}`}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            { errors.email && <div className='invalid-feedback'>{ errors.email }</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Age</label>
                            <input
                                type='number'
                                placeholder='Enter Age'
                                name='age'
                                value={age}
                                className={`form-control ${ errors.age ? 'is-invalid' : ''}`}
                                onChange={(e) => setAge(e.target.value)}
                            >
                            </input>
                            { errors.age && <div className='invalid-feedback'>{ errors.age }</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEmployeeComponent