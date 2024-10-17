import { deleteTree, updateTree } from "../services/treeService.js";

const id = process.argv[2];
const name = process.argv[3];

const controlDeleteTest = async () => {
    try {
        const result = await deleteTree(parseInt(id));
        console.log(`La liste avec l'id ${id} a bien été effacée.`);
    } catch (error) {
        console.error("Une erreur est survenue.");
    }
};

const controlUpdateTest = async () => {
    try {
        const result = await updateTree(parseInt(id), name);
        console.log(`la liste avec l'id ${id} a bien été modifié en ${name}`);        
    } catch (error) {
        console.error("Une erreur est survenue.");
    }
};

controlUpdateTest();