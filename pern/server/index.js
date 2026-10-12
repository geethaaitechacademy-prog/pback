const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PERN Server Running");
});


app.get("/employees", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM employees"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch employees"
        });

    }

});

app.get("/employees/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM employees WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch employee"
        });

    }

});

app.post("/employees", async (req, res) => {

    try {

        const { name, email, salary } = req.body;

        const result = await pool.query(
            `INSERT INTO employees (name, email, salary)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, salary]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create employee"
        });

    }

});

app.put("/employees/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { name, email, salary } = req.body;

        const result = await pool.query(
            `UPDATE employees
             SET name = $1,
                 email = $2,
                 salary = $3
             WHERE id = $4
             RETURNING *`,
            [name, email, salary, id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update employee"
        });

    }

});

app.delete("/employees/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM employees WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.json({
            message: "Employee deleted successfully",
            employee: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete employee"
        });

    }

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});