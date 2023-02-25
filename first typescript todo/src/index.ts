import app from "./app";
import path from "path"
import config from "config";
const port = config.get<number>("PORT");

app.listen(port, () => {
  console.log(`Listening: https://localhost:${port}`);
});
