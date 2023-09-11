
const connectToDB = require('./db');

export async function insertData(data) {
    const db = await connectToDB();
    const collection = db.collection('hangout');
    
    try {
        const result = await collection.insertOne(data);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (e) {
        console.error(e);
    }  
}

export async function getData(query) {
    const db = await connectToDB();
    const collection = db.collection('hangout');

    try {
        const result = await collection.findOne({}, query);
        console.log(`A document was retrieved`)
    } catch (e) {
        console.error(e);
    }
}