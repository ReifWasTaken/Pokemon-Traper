import express from "express";
import pokemonsRouter from "./Router/pokemons.router.js";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.json('Hello PokeWorld!');
});
  
app.use("/pokemons", pokemonsRouter);


app.get("*", (req, res) => {
  return res.send(404).json({status: "error", message: "URL not found"});
})

//clase 8 51:39