import { createTree, deleteTree, getAllTreesByFamilyId, getTree, updateTree } from "../services/treeService.js";

export const createTreeControl = async (req, res) => {
    const { name, familyId } = req.body;    
    try {
        const newTree = await createTree(name, familyId);
        res.status(200).json({ message: `Votre liste " ${name} " a bien été créé.`, data: newTree });
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};

export const getAllTreeControl = async (req, res) => {
    const { familyId } = req.params;
    
    try {
        const result = await getAllTreesByFamilyId(familyId);
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        res.status(200).json({ message: result.message, data: result.data });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};

export const getTreeControl = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await getTree(id);
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        return res.status(200).json({ message: result.message, data: result.data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur est survenue." });        
    }
};

export const deleteTreeControl = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteTree(parseInt(id));
        return res.status(200).json({ message: "La liste a bien été effacée." });
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};

export const updateTreeControl = async (req, res) => {
    const { id, name } = req.body;

    try {
        const result = await updateTree(parseInt(id), name);
        return res.status(200).json({ message: "le nom de la liste a bien été modifié.", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
}