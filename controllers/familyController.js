import { createFamily, getHash } from "../services/familyService.js";
import { updateFamily } from "../services/userService.js";

export const createFamilyControl = async (req, res) => {
    const { id, name } = req.body;

    try {
        const result = await createFamily(id, name);
        res.status(201).json({ message: "Votre famille a bien été créé.", data: result })
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};

export const getHashControl = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await getHash(id);
        res.status(200).json({ message: "Vous avez bien recupéré le hash de la famille", data: result })
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};

export const addFamilyControl = async (req, res) => {
    const { id, hash } = req.body;

    try {
        const result = await updateFamily(id, hash);
        res.status(201).json({ message: "Vous avez bien ajouté la famille.", data: result })
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." })
    }
};