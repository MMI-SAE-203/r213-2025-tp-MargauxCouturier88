import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090/');

export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        data = data.map((collection) => {
            collection.image = pb.files.getURL(collection, collection.image);
            return collection;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('Maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getSurface(s) {
    const maisonSurface = await pb.collection('Maison').getFullList({
        filter: `surface > ${s}`,
    });
    return maisonSurface;
}

export async function addOffre(house) {
    try {
        await pb.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

export async function allAgent() {
    try {
        const records = await pb.collection('Agent').getFullList();
        return records;
    }
    catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }

}

export async function setFavori(house) {
    try {
        await pb.collection('Maison').update(house.id, {favori: !house.favori});
        return {
            success: true,
            message: 'Favori modifié avec succès'
        };
    }
    catch (error) {
        console.log('Une erreur est survenue en modifiant le favori', error);
        return {
            success: false,
            message: 'Une erreur est survenue en modifiant le favori'
        };
    }
}