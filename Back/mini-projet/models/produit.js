const mongoose = require("mongoose");
//creation du schema
const produitSchema = new mongoose.Schema(
  {
  
    
    nom: String,
    prix_unitaire: Number,
    quantite: Number,
  },
  { timestamps: true } //createdAt et updatedAt
);
//creation du model
const produit = mongoose.model("Produit",produitSchema);
//exportation
module.exports = produit;