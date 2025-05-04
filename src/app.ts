import express from 'express';
import productRouter from './routes/product.routes';
import { errorHandler } from './middlewares/error.middleware';

/* initialize express app */
const app = express();

/* middlewares */
app.use(errorHandler);
app.use(express.json());
app.use('/api/products', productRouter);

export default app;
