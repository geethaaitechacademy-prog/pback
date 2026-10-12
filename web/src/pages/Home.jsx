import React from 'react'
import { useState,useEffect } from 'react';

const Home = () => {


   const [employees, setEmployees] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/employees")
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);


  return (
    <div>

<h1>Employee Management</h1>

            {employees.map(employee => (
                <div key={employee.id}>

                    <h3>{employee.name}</h3>

                    <p>{employee.email}</p>

                    <p>{employee.salary}</p>

   </div>
            ))}

   </div>
  )
}

export default Home