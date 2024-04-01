import express = require('express');
import router from './routes';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));