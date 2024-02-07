require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.disable('x-powered-by');
app.use(cors());

app.use(express.json());


app.use(express.urlencoded({ extended: true }));




const userRouter = require('./routers/user');
app.use('/', userRouter);

const clientRouter = require('./routers/client');
app.use('/clients', clientRouter);

const productRouter = require('./routers/product');
app.use('/products', productRouter);



app.get('*', (req, res) => {
    res.json({ ok: true });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});