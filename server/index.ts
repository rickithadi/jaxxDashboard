import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello from jaxx-server");
});

app.listen(port, () => {
  console.log(`jaxx-server listening at http://localhost:${port}`);
});
