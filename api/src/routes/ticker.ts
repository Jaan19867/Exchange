
import { Router } from "express";

export const tickersRouter = Router();

tickersRouter.get("/", async (req, res) => {    
    try {
        // Return sample data for both supported markets  this is for temperory base , we will update it 
        const tickers = [
            {
                "firstPrice": "1000.00",
                "high": "1050.00",
                "lastPrice": "1025.50",
                "low": "995.00",
                "priceChange": "25.50",
                "priceChangePercent": "2.55",
                "quoteVolume": "1000000.00",
                "symbol": "TATA_INR",
                "trades": "150",
                "volume": "975.61"
            },
            {
                "firstPrice": "130.00",
                "high": "135.50",
                "lastPrice": "134.38",
                "low": "128.20",
                "priceChange": "4.38",
                "priceChangePercent": "3.37",
                "quoteVolume": "500000.00",
                "symbol": "SOL_USDC",
                "trades": "89",
                "volume": "3721.45"
            }
        ];
        res.json(tickers);
    } catch (error) {
        console.error("Error fetching tickers:", error);
        res.status(500).json({ error: "Failed to fetch tickers" });
    }
});