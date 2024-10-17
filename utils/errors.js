export class EmailAlreadyUsedError extends Error {
    constructor(message = "Cet email est déjà utilisé pour un compte.") {
        super(message);
        this.name = "EmailAlreadyUsedError";
        this.statusCode = 400;
    }
};

export class RegisterError extends Error {
    constructor(message = "Problème lors de l'inscription.") {
        super(message);
        this.name = "RegisterError";
        this.statusCode = 500;
    }
};

export class PasswordUpdateError extends Error {
    constructor(message = "Erreur lors de la mise à jour du mot de passe.") {
        super(message);
        this.name = "PasswordUpdateError";
        this.statusCode = 500;
    }
};

export class TreeValidationError extends Error {
    constructor(message = "Le nom de l'arbre et l'ID de la famille sont requis.") {
        super(message);
        this.name = "TreeValidationError";
        this.statusCode = 400;
    }
};

export class TreeCreationError extends Error {
    constructor(message = "Une erreur est survenue lors de la création de la liste.") {
        super(message);
        this.name = "TreeCreationError";
        this.statusCode = 500;
    }
};