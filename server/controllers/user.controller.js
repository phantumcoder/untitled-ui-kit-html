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

/**
 * retrieves a single user by their id from the specified collection
 *
 * @param db
 * @param collectionName
 * @param userId
 * @returns {Promise<*|null>}
 */
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

/**
 * retrieves all users from the specified collection, optionally matching a query
 *
 * @param db
 * @param collectionName
 * @param query
 * @returns {Promise<*>}
 */

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

/**
 * update a user by their id
 * @param db
 * @param collectionName
 * @param userId
 * @param updateData
 * @returns {Promise<{acknowledged: boolean, matchedCount: number, modifiedCount: number, error: string}|*>}
 */
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

const delete_user_by_id = async (db, collectionName, userId) => {
    try {
        const collection = db.collection(collectionName)

        if (!ObjectId.isValid(userId)) {
            console.error(`Invalid user ID format for delete: ${userId}`)
            return {
                acknowledged: false,
                deletedCount: 0,
                error: "invalid id format"
            };
        }

        console.log(`attempting to delete user ID: ${userId} from collection: ${collectionName}`)
        const result = await collection.deleteOne({_id: new ObjectId(userId)})

        console.log('user delete result', result)
        return result;
    } catch (err) {
        console.error(`error deleting user by id: ${userId} from ${collectionName}`)
    }
}
module.exports = {
    create_user,
    get_user_by_id,
    get_all_users,
    update_user_by_id,
    delete_user_by_id
}