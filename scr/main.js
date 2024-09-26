import express from "express";
const app = express()
const port = 3000

let pokemones = [{id: 0, nombre: "balbasaur", element: "plant"},
                 {id: 13, nombre: "ratata", element: "normal"}
                ]

app.get('/', (req, res) => {
  res.json('Hello PokeWorld!');
})

app.get('/pokemon', (req, res) => {
    res.json(pokemones);
  })

  app.get('/pokemon/:id', (req, res) => {
    const reqID = req.params.id
    const IdFound = pokemones.find((p) => p.id == reqID);
    
    if(IdFound){
       return res.status(200).json(IdFound);
    }else{
       return res.status(400).json({error: "Pokemon not found"});
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

//20:11 calse 7
