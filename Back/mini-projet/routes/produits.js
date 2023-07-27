const express = require("express");
const router = express.Router();
const produitModel = require("../models/produit");

router.get("/", async (req, res, next) => {
  try {
    const { search } = req.query;
    let produits = search
      ? await produitModel.find({ nom: search })
      : await produitModel.find();

    // Ajoutez l'en-tête Cache-Control pour empêcher le navigateur de mettre en cache les données
    res.setHeader("Cache-Control", "no-cache");

    // Reste du code pour renvoyer les données
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/ajout", async (req, res, next) => {
  try {
    const { nom, prix_unitaire, quantite} = req.body;
    const checkIfProduitExist = await produitModel.find({ nom }); //[]
    //verification sur l'existence du titre
    if (checkIfProduitExist && checkIfProduitExist.length !== 0) {
      throw new Error("produit already exist!");
    }
    //verification sur le nombre de participants

    const produit = await produitModel.create({
      nom,
      prix_unitaire,
      quantite,
    
    });
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:produitId", async (req, res, next) => {
  try {
    const { produitId } = req.params;
    const checkIfProduitExist = await produitModel.findById(produitId);
    if (!checkIfProduitExist) {
      throw new Error("produit not found!");
    }
    await produitModel.findByIdAndDelete(produitId);
    
    res.json("produit deleted successfully!");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:produitId", async (req, res, next) => {
  try {
    const { produitId } = req.params;
    const { nom,prix_unitaire,quantite} = req.body;
    let checkIfProduitExist = await produitModel.findById(produitId);
    if (!checkIfProduitExist) {
      throw new Error("event not found!");
    }
    checkIfProduitExist = await produitModel.findOne({ nom });
    //verification sur l'existence du titre
    if (checkIfProduitExist) {
      throw new Error("produit already exist!");
    }
    //verification sur le nombre de participants
 
    const updatedProduit= await produitModel.findByIdAndUpdate(
      produitId,
      {
        $set: { nom,prix_unitaire,quantite },
      },
      { new: true }
    );
    res.status(200).json(updatedProduit);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:produitId", async (req, res, next) => {
  try {
    const { produitId } = req.params;
    const produit = await produitModel.findById(produitId);
    if (!produit) {
      throw new Error("produit not found!");
    }
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
