import { useEffect, useState } from "react";

function Form() {

    const [employees, setEmployees] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {

       fetch("https://pback-zuok.onrender.com/employees")
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
            })
            .catch(error => {
                console.error(error);
            });

    };

    const addEmployee = (event) => {

        event.preventDefault();

        const employee = {
            name: name,
            email: email,
            salary: salary
        };

        fetch("https://pback-zuok.onrender.com/employees", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        })
        .then(response => response.json())
        .then(data => {

            console.log(data);

            setName("");
            setEmail("");
            setSalary("");

            loadEmployees();

        })
        .catch(error => {
            console.error(error);
        });

    };

    return (
        <div>

            <h1>Employee Management</h1>

            <h2>Add Employee</h2>

            <form onSubmit={addEmployee}>

                <div>
                    <label>Name: </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Email: </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Salary: </label>

                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Add Employee
                </button>

            </form>

            <hr />

            <h2>Employees</h2>

            {employees.map(employee => (

                <div key={employee.id}>

                    <h3>{employee.name}</h3>

                    <p>Email: {employee.email}</p>

                    <p>Salary: {employee.salary}</p>

                </div>

            ))}

        </div>
    );
}

export default Form;