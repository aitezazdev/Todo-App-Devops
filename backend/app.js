import express from 'express';
import cors from 'cors';
import dbConnection from './config/db.js';
import router from './routes/todos.route.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {  
  res.send('Hello World!');
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
