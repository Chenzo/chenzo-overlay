
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        let dbName = 'ship-logs';
        if (process.env.NODE_ENV === 'development') {
          console.log('development mode for dbName');
          dbName = 'ship-logs-dev';
        } 
        const db = client.db(dbName);

        const overlayData = await db
            .collection("thbar_data")
            .find({})
            .limit(10)
            .toArray();

        res.json(overlayData);
    } catch (e) {
        console.error(e);
    }
};