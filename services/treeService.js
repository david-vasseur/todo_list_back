import { PrismaClient } from '@prisma/client';
import { deleteAllTasksRepo } from '../repositories/taskRepository.js';
import { createTreeRepo, updateTreeRepo, deleteTreeRepo, getTreeRepo, getAllTreeByFamilyIdRepo } from '../repositories/treeRepository.js';
import { TreeCreationError, TreeValidationError } from '../utils/errors.js'; 

const prisma = new PrismaClient()

export const createTree = async (name, familyId) => {
    try {
        const treeData = {
            name,
            familyId: parseInt(familyId)
        };
        const newTree = await createTreeRepo(treeData);
        return newTree;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};

export const updateTree = async (id, name) => {
    try {
        const updateName = await updateTreeRepo(id, name);
        return updateName;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};

export const deleteTree = async (id) => {
    try {
        await prisma.$transaction(async (transactionPrisma) => {
            await deleteTreeRepo(id, transactionPrisma);
            await deleteAllTasksRepo(parseInt(id), transactionPrisma);
        });
        return { message: 'Tree et ses tâches supprimés avec succès' };
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};

export const getTree = async (id) => {
    if (!id) {
        return { error: "L'ID de l'arbre est requis." };
     }

    try {
        const tree = await getTreeRepo(parseInt(id));
        if (!tree) {
            return { error: "Liste non trouvée" };
        }
        return { message: "Liste récupérée avec succès", data: tree };
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message }; 
    }
};

export const getAllTreesByFamilyId = async (familyId) => {
    if (familyId === 0) {
        return { message: "Vous devez creer ou adherer à une famille." }
    }
    if (!familyId) {
        return { error: "Une erreur s'est produite lors de votre requête." };
    }
    if (!Number(familyId)) {
        return { error: "Famille invalide." };
    }

    try {
        const trees = await getAllTreeByFamilyIdRepo(parseInt(familyId));
        if (trees.length === 0) {
            return { message: "Vous n'avez pas encore créé de liste." };
        }
        return { message: "Listes récupérées avec succès", data: trees };
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};
