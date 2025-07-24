import { Router } from "express";
import { Client } from "pg";

const pgClient = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
});
pgClient.connect();

export const tradesRouter = Router();

tradesRouter.get("/", async (req, res) => {
    const { symbol } = req.query;
    // For now, only TATA_INR is supported and stored in tata_prices
    if (symbol !== "TATA_INR") {
        console.log("here symbol does not match ")
        return res.json([]);
    }
    try {
        console.log("here symbol got match ")
        const result = await pgClient.query(
            "SELECT * FROM tata_prices ORDER BY time DESC LIMIT 100"
        );
        console.log(JSON.stringify(result));
        // Map DB rows to trade objects expected by frontend
        const trades = result.rows.map((row, idx) => ({
            id: idx + 1,
            isBuyerMaker: false, // You can improve this if you store side info
            price: row.price,
            quantity: row.volume || "1", // If you have volume, use it
            quoteQuantity: row.price * (row.volume || 1),
            timestamp: row.time
        }));
        res.json(trades);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch trades" });
    }
});