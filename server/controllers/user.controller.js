const { ObjectId } = require('mongodb');

/**
 * create a new user document in the specified collection
 *
 * @param {object} db  - db instance
 * @param collectionName - name of the collection
 * @param document - the document to insert
 * @returns {Promise<*>}
 */
const create_user = async (db, collectionName, document) => {
    try {
        const collection = db.collection(collectionName);
        console.log(`attempting to create user in collection: ${collectionName}`)

        const result = await collection.insertOne(document);
        console.log('user created successfully', result)
        return result;
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

const update_user_by_id = async (db, collectionName, userId, updateData) => {
    try {
        const collection = db.collection(collectionName)

        if (!ObjectId.isValid(userId)) {
            console.error(`Invalid user ID format for update: ${userId}`)
            return {
                acknowledged: false,
                matchedCount: 0,
                modifiedCount: 0,
                error: "invalid id format"
            };
        }

        const { _id, ...dataToUpdate} = updateData

        console.log(
            `attempting to update user ID: ${userId} in collection: ${collectionName} with data: `, dataToUpdate)

        const result = await collection.updateOne({_id: new ObjectId(userId)}, { $set: dataToUpdate})

        console.log('user update result', result)
        return result;

    } catch (err) {
        console.error(`error udating user by id: ${userId}`)
        throw err;
    }
}

module.exports = {
    create_user,
    get_user_by_id,
    get_all_users
}