const express = require("express");
const XLSX = require("xlsx");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Render gives dynamic PORT
const PORT = process.env.PORT || 3000;

// Function to read Excel every time
function getSheetData(sheetName) {
    const workbook = XLSX.readFile(
        path.join(__dirname, "ECommerce_Indian_Seeder_Data.xlsx")
    );

    const sheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json(sheet);
}

// Home Route
app.get("/", (req, res) => {
    res.send("E-Commerce API is Running...");
});

// APIs

app.get("/api/customers", (req, res) => {
    res.json(getSheetData("Customers"));
});

app.get("/api/addresses", (req, res) => {
    res.json(getSheetData("Addresses"));
});

app.get("/api/orders", (req, res) => {
    res.json(getSheetData("Orders"));
});

app.get("/api/order-items", (req, res) => {
    res.json(getSheetData("Order Items"));
});

app.get("/api/items", (req, res) => {
    res.json(getSheetData("Items"));
});

app.get("/api/payments", (req, res) => {
    res.json(getSheetData("Payments"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});