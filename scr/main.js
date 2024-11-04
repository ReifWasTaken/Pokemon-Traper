import express from "express";
import pokemonsRouter from "./Router/pokemons.router.js";
import { __dirname } from "./utils.js";
import path, { dirname } from "path";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//app.use(express.static("./scr/public"));
app.use(express.static(path.join(__dirname, "public")))

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.json('Hello PokeWorld!');
});
  
app.use("/pokemons", pokemonsRouter);


app.get("*", (req, res) => {
  return res.status(404).json({status: "error", message: "URL not found"});
});

//clase 8 51:39

/* TO DO
  Upload an image via postman
*/