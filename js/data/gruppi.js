/* data/gruppi.js — Gruppi predefiniti e copie di riferimento. */
const SPB=JSON.parse(JSON.stringify(SP)),VWB=JSON.parse(JSON.stringify(VW));
const GDEF=[["Aromatiche e spezie",["Erbe aromatiche","Spezie","Peperoncini","Pepe del Sichuan","Finocchietto selvatico","Levistico","Aglio orsino","Ortica"]],["Zafferano e aglio",["Zafferano","Aglio"]],["Fiori",["Fiori"]],["Frutti e bacche",["Frutti di bosco","Aronia"]],["Funghi, api e castagne",["Funghi","Api e miele","Castagne"]],["Terreno e bosco",["Bosco","Prato","Altro"]]],GFB="Altre colture",GD={};
GDEF.forEach(([g,a])=>a.forEach(k=>GD[k]=g));
const MGT=[["crop","Colture"],["grp","Gruppi"],["sp","Specie"],["zone","Zone"],["line","Linee"],["pt","Punti"]];
