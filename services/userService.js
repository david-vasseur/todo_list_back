import bcrypt from 'bcrypt';
import { 
    createUser as createUserRepo, 
    getUserByEmail as getUserByEmailRepo, 
    getUserById as getUserByIdRepo, 
    getAllUsersByFamilyIdRepo,
    updateName as updateNameRepo,
    updatePasswordRepo,
    addFamilyRepo
} from '../repositories/userRepository.js';
import { EmailAlreadyUsedError, PasswordUpdateError, RegisterError } from '../utils/errors.js';
import { getHashRepo, getIdRepo } from '../repositories/familyRepository.js';

/// CREATE ///

export const createUser = async (email, password, name, firstName, familyId) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new EmailAlreadyUsedError();
    }
    try {
        const hashed = await bcrypt.hash(password, 10);
        const userData = {
            email, 
            password: hashed,
            name,
            firstName,
            familyId
        };
        const user = await createUserRepo(userData);
        if (!user) {
            throw new RegisterError();
        }
        return user;
    } catch (error) {
        throw new RegisterError();
    }
};

/// READ ///

export const getUserByEmail = async (email) => {
    return await getUserByEmailRepo(email);
};

export const getUserById = async (id) => {
    return await getUserByIdRepo(id);
};

export const getAllUsersByFamilyId = async (familyId) => {
    return await getAllUsersByFamilyIdRepo(familyId)
};

/// UPDATE ///

export const updateName = async (userId, newName) => {
    return await updateNameRepo(userId, newName)
};

export const updatePasswordService = async (userId, newPassword) => {
    try {
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        return await updatePasswordRepo(userId, newHashedPassword)
    } catch (error) {
        throw new PasswordUpdateError();
    }
};

export const updateFamily = async (id, hash) => {
    const verifiedHash = await getIdRepo(hash);
    try {
        const result = await addFamilyRepo(id, verifiedHash.id);
        return result;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};
