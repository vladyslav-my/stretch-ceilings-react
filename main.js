import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

import Mail from "./mailer.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post("/mail", async (req, res) => {
   console.log();
    return res.json({ result: await Mail.send(req.body) });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port :3000");
});