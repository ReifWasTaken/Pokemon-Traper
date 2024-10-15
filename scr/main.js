import express from "express";
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const port = 3000;


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

let pokemones = [{id: 0, nombre: "balbasaur", element: "plant"},
  {id: 13, nombre: "ratata", element: "normal"}]
  

app.get('/', (req, res) => {
  res.json('Hello PokeWorld!');
})

app.get('/pokemons', (req, res) => {
    res.json(pokemones);
  })

app.get('/pokemons/:id', (req, res) => {
  const reqID = req.params.id
  const IdFound = pokemones.find((p) => p.id == reqID);
    
  if(IdFound){
    return res.status(200).json(IdFound);
   }else{
  return res.status(400).json({error: "Pokemon not found " + reqID});
   }
  })

app.post("/pokemons", (req, res)=> {
  
  const pokemonSend = req.body;
  const idSend = pokemonSend.id;
  const pokemonFound = pokemones.find((p) => p.id == idSend);

  if(!pokemonFound){
    pokemones.push({...pokemonSend});
    return res.status(201).json({massage: "Pokemon added"});
    
  }else{
    return res.status(400).json ({massage: "Pokemon already exist"});
  }

})

app.put("/pokemons/:id", (req, res) =>{

  const pokeREQ = req.body;

  if (pokeREQ.id){
    return res.status(400).json({ message: "Wrong data" });
  }

  const pokeREQid = req.params.id;
  const pokeFound = pokemones.findIndex((p) => p.id == pokeREQid);

  if(pokeFound){
    pokemones[pokeFound] = { id: pokemones[pokeFound].id, ...pokeREQ}
    return res.status(200).json({message: "Pokemon updated"});
  }else{
    return res.status(400).json({ message: "Pokemon not found"});
  }
})

app.delete('/pokemons/:id', (req, res) => {
  const reqID = req.params.id
  const IdFound = pokemones.findIndex((p) => p.id == reqID);
    
  if(IdFound == -1){
    return res.status(400).json({message: "Pokemon Not Found"});
  }
  pokemones = pokemones.filter((p) => p.id != reqID);
  return res.status(200).json({message: "pokemon deleted"});

})

app.get("*", (req, res) => {
  return res.send(404).json({status: "error", message: "URL not found"});
})

//clase 8 23:06