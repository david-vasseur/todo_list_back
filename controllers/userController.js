import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail, getUserById, createUser, updatePasswordService, getAllUsersByFamilyId } from '../services/userService.js';
import { EmailAlreadyUsedError, PasswordUpdateError, RegisterError } from '../utils/errors.js';



export const registerUser = async (req, res) => {
    const { email, password, name, firstName, familyId = null } = req.body;

    try {
        const user = await createUser(email, password, name, firstName, familyId);
        res.status(201).json({ message: 'Vous êtes bien enregistré !', firstName: firstName });
    } catch (error) {
        console.error(error);
        if (error instanceof EmailAlreadyUsedError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        if (error instanceof RegisterError) {
            return res.status(error.statusCode).json({ message: error.message })
        }
    }
};



export const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        console.log(user);
        
        if (!user) {
            return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            console.log("L'utilisateur", user.firstName, user.name, "s'est trompé de mot de passe");
            return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: "Connexion réussie",
            token: token,
            user: {
                id: user.id,
                firstName: user.firstName,
                name: user.name,
                email: user.email,
                family: user.family,
                familyId: user.familyId,
                hash: user.hash
            }            
        });

        console.log("L'utilisateur", user.firstName, user.name, "vient de se connecter");
    } catch (error) {
        console.error(error);
    }
};


export const getUser = async (req, res) => {

    try {
        const userId = req.user.userId;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" })
        }
        const userInfos = {
            firstName: user.firstName,
            name: user.name,
            email: user.email,
            family: user.family ? user.family.name : null,
            hash: user.family.hash,
            ownerId: user.family.ownerId,
            type: user.family.type,
            isOwner: user.family.isOwner
        }
        console.log(userInfos);
        
        res.status(200).json(userInfos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Problème de recupération" })
    }
};


export const updatePassword = async (req, res) => {
    const { password } = req.body;
    const userId = req.user.userId
    try {
        await updatePasswordService(userId, password);
        res.status(200).json({ message: "Votre mot de passe a été mis à jour" })
    } catch (error) {
        if(error instanceof PasswordUpdateError) {
            return res.status(error.statusCode).json({ message: error.message })
        }
    }
};

export const getAllUsersByFamilyControl = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await getAllUsersByFamilyId(parseInt(id));
        res.status(200).json({ message: "Vous avez recuperé tous les utilisateurs de votre famille", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
}
