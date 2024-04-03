import * as express from "express";
const cheeses = require("./data/cheeses.json");

const router = express.Router();

router.get("/api/cheeses", (req, res, next) => {
  res.json(cheeses);
});

// recieve data and save it
const purchases: any[] = [];

router.post("/api/purchases", (req, res, next) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", () => {
    try {
      const jsonData = JSON.parse(data);
      for (const purchasedItem of jsonData) {
        const existingItemIndex = purchases.findIndex(
          (item) => item.id === purchasedItem.id
        );

        if (existingItemIndex !== -1) {
          purchases[existingItemIndex].amount += purchasedItem.amount;
        } else {
          purchases.push(purchasedItem);
        }
      }

      console.log("Data received: ", purchases);

      res.status(200).send("Purchase saved successfully");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error occurred while saving purchase");
    }
  });
});

// send data of recent purchases to the front end
router.get("/api/recentPurchases", (req, res, next) => {
  res.json(purchases);
});

export default router;
