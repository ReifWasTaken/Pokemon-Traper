import express from "express";
import { uploader } from "../utils.js";
const pokemonsRouter = express.Router();

//Pokemons persistans 
let pokemones = [{ id: 0, nombre: "balbasaur", element: "plant" },
{ id: 13, nombre: "ratata", element: "normal" }]

pokemonsRouter.get('/', (req, res) => {
    res.json({
        status: "succes",
        message: "Pokemon list",
        data: pokemones,
    });
});

pokemonsRouter.get('/:id', (req, res) => {
    const reqID = req.params.id
    const IdFound = pokemones.find((p) => p.id == reqID);

    if (IdFound) {
        return res.status(200).json({
            status: "succes",
            message: "Pokemon requested Found!",
            data: IdFound
        });
    } else {
        return res.status(400).json({
            status: "Error",
            message: "Pokemon not found" + reqID
        });
    }
});

pokemonsRouter.post("/", uploader.single("file"), (req, res) => {

    const pokemonSend = req.body;
    const idSend = pokemonSend.id;
    const pokemonFound = pokemones.find((p) => p.id == idSend);

    if (!pokemonFound) {
        pokemonSend.picture = "http://localhost:3000/" + req.file.filename;
        pokemones.push({ ...pokemonSend });
        return res.status(201).json({ 
            status: "succes",
            massage: "Pokemon added",
            data: pokemonSend
        });

    } else {
        return res.status(400).json({ 
            status: "error",
            massage: "Pokemon already exist"
        });
    }

});

pokemonsRouter.put("/:id", (req, res) => {

    const pokeREQ = req.body;

    if (pokeREQ.id) {
        return res.status(400).json({ 
            status: "error",
            message: "Wrong data" });
    }

    const pokeREQid = req.params.id;
    const pokeFound = pokemones.findIndex((p) => p.id == pokeREQid);

    if (pokeFound) {
        pokemones[pokeFound] = { id: pokemones[pokeFound].id, ...pokeREQ }
        return res.status(200).json({ 
            status: "succes",
            message: "Pokemon updated",
            data: pokeREQ
        });
    } else {
        return res.status(400).json({
            status: "error",
            message: "Pokemon not found"
        });
    }
});

pokemonsRouter.delete('/:id', (req, res) => {
    const reqID = req.params.id
    const IdFound = pokemones.findIndex((p) => p.id == reqID);

    if (IdFound == -1) {
        return res.status(400).json({
            status: "error",
            message: "Pokemon Not Found"
        });
    }
    pokemones = pokemones.filter((p) => p.id != reqID);
    return res.status(200).json({
        status: "succes",
        message: "pokemon deleted"
    });

});


export default pokemonsRouter;