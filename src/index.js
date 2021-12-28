import 'dotenv/config';
import express from 'express';

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Server is running! Port: ${SERVER_PORT}`));