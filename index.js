const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

app.get("/api/products", async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "products!A2:D",
    });

    const rows = response.data.values;
    const products = rows.map((row) => ({
      name: row[0],
      price: row[1],
      image: row[2],
      description: row[3],
    }));

    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});