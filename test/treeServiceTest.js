import { createTreeRepo, getAllTreeByFamilyIdRepo, getTreeRepo } from "../repositories/treeRepository.js";

const name = process.argv[2];
const familyId = process.argv[3];

const serviceTreeTest = async () => {
    if (!familyId) {
        console.error("Vous devez creer une famille pour creer une liste");
        return;
    }
    if (!Number(familyId)) {
        console.error("Famille invalide.");
        return;
    }
    try {
        const trees = await getAllTreeByFamilyIdRepo(parseInt(familyId));
        if (trees.length === 0) {
            console.error({ message: "Vous n'avez pas encore créé de liste."})
        }
        console.log(trees);
    } catch (error) {
       console.error('Erreur du service !')  
    }
};



const serviceTreeTest2 = async () => {
        try {
            const tree = await getTreeRepo(parseInt(id));
            if (!tree) {
                console.error("Liste non trouvée");
                return;
            }
            console.log('list ok', tree)
        } catch (error) {
            console.error('Erreur du service !'); 
        }
};

const serviceTreeTest3 = async () => {
    try {
        const data = {
            name,
            familyId: parseInt(familyId)
        }
        const newTree = await createTreeRepo(data);
        console.log("liste créé", newTree);
    } catch (error) {
        console.error(error)
    }
}

serviceTreeTest3();