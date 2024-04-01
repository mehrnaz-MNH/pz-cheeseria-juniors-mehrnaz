import * as express from 'express';
const cheeses = require('./data/cheeses.json');


const router = express.Router();



router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});

const purchases: any[] = []; 
router.post('/api/purchases',(req, res, next) => {
    try {
        console.log(req.body);
        purchases.push(...req.body);
        console.log("Data received: ", purchases);
        res.status(200).send('Purchase saved successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred while saving purchase');
    }
});



export default router;