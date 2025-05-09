const create_user = async (db, collectionName, document) => {
    try {
        const collection = db.collection(collectionName)
        return await collection.insertOne(document)
    } catch (err) {
        console.error(err);
        throw err;
    }
}