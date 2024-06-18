import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
  const enteredLink = req.body.strings;
  console.log(enteredLink);

  const qrImage = qr.imageSync(enteredLink, { type: "png" });
  res.writeHead(400, { "Content-Type": "image/png" });
  res.end(qrImage, "binary");
});

app.listen(2000, function () {
  console.log("Server running on port 2000");
});