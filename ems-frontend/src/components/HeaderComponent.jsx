import React from 'react'
import { Link } from 'react-router-dom'

function HeaderComponent() {
    return (
        <div>
            <header>
                <nav className='navbar navbar-dark bg-dark'>
                    <a className='navbar-brand' href='https://github.com/anilcemalyasar'>Employee Management System</a>
                        <li className="nav-item">
                            <Link to="/employees">Employees</Link>
                        </li>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent