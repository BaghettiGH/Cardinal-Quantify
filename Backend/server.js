const express = require ("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cardinal-quantify"

})

app.listen(8081, ()=> {
    console.log("listening");
})

app.post("/signup", (req, res) => {
    console.log("Received signup request:", req.body);

    const q = "INSERT INTO student (name, email, password) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        return res.json({ message: "User created successfully." });
    });
});