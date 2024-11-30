import express from "express";
import dotenv from "dotenv";
import routes from './routes';
import {sequelize} from "./models";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/api', routes);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync(); // Ensures models are synchronized
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default app;
