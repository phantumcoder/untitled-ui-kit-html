const { ObjectId } = require('mongodb');

const create_user = async (db, collectionName, document) => {
    try {
        const collection = db.collection(collectionName)
        return await collection.insertOne(document)
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const get_user_by_id = async (db, collectionName, userId) => {
    try {
        const collection = db.collection(collectionName)
        if (!ObjectId.isValid(userId)) {
            console.error(`invalid user id format: ${userId}`)
            return null;
        }

        console.log(`attempting to find the user by id: ${userId} in collection: ${collectionName}`)
        const user = await collection.findOne({ _id: new ObjectId(userId) })

        if (user) {
            console.log('user found: ', user)
        } else {
            console.log('user not found')
        }

        return user;

    } catch (err) {
        console.error(err);
        throw err;

    }
};

const get_all_users = async (db, collectionName, query = {}) => {
    try {
        const collection = db.collection(collectionName)
        console.log(`attempting to get all the users from collection: ${collectionName} with query:`, query)
        const users = await collection.find(query).toArray()

        console.log(`found ${users.length} users`)
        return users

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    create_user,
    get_user_by_id
}