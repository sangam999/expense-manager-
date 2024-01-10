
import express from 'express';
import config from './config/config';
import { db } from "./loaders/dbConnect"

async function startServer() {
    const app = express();
    //connect to the database   
    db()

    app.listen(config.port, () => {
        console.log("server running")
    })

}
startServer();