const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Calculator API
app.post("/calculate", (req, res) => {
    const { num1, num2, operator } = req.body;

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    let result;

    switch (operator) {
        case "+": result = n1 + n2; break;
        case "-": result = n1 - n2; break;
        case "*": result = n1 * n2; break;
        case "/":
            if (n2 === 0) return res.json({ result: "Cannot divide by zero" });
            result = n1 / n2;
            break;
        default:
            return res.json({ result: "Invalid operator" });
    }

    res.json({ result });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
