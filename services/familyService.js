import { PrismaClient } from "@prisma/client";
import { createFamilyRepo, getHashRepo } from "../repositories/familyRepository.js";
import { addFamilyRepo } from "../repositories/userRepository.js";
// utilisation de UUID pour generer aleatoirement un code pour la famille //
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const createFamily = async (id, name) => {
    const hashFamily = uuidv4();
    const data = {
        name: name,
        ownerId: id,
        hash: hashFamily,
    }

    try {
        const result = await prisma.$transaction(async (prismaTransation) => {
            const createdFamily = await createFamilyRepo(data, prismaTransation);
            await addFamilyRepo(id, createdFamily.id, prismaTransation);
            return createdFamily;
        });
        return result;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};

export const getHash = async (id) => {
    try {
        const result = await getHashRepo(id);
        return result;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};