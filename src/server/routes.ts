import * as express from 'express';
const cheeses = require('./data/cheeses.json');


const router = express.Router();



router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});


// global array to save data , 
//I may decide to add a seperate jason file later to add data there and
// clean after every closing the tab
const purchases: any[] = []; 

router.post('/api/purchases', (req, res, next) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk.toString();
    });

    req.on('end', () => {
        try {
            const jsonData = JSON.parse(data);
            purchases.push(...jsonData);
            
            console.log("Data received: ", purchases);
            
            res.status(200).send('Purchase saved successfully');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error occurred while saving purchase');
        }
    });
});


export default router;