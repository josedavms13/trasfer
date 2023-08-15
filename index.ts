import express from "express";
import cors from "cors";
import "dotenv/config";
import "crypto";
import "assert";
import * as crypto from "crypto";
import * as fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
   res.send("hello world!");
});



app.post("/code", (req, res) => {
   const algo = "aes256";
   const key = process.env.KEY!;
   const cifer = crypto.createCipher(algo, key);
   const response: any = req.body as string;
   const {answer} = response;
   console.log(answer);

   const encrypted = cifer.update(answer, 'utf8', 'hex') + cifer.final('hex');
   fs.writeFile("code.txt", encrypted, (error) => {
      if (error) {
         res.status(400).json(error);
      } else {
         res.sendStatus(200);
      }
   })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Listen on port ${ port }`);
});
