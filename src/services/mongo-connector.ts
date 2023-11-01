import { connect, connection } from "mongoose";
const dbUrl = 'mongodb://localhost:27017/training';

export const connectToMongo = async () => {
  const connected = await connect(dbUrl, {
    authSource: "admin",
    family: 4
  });
  const db = connection;

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  db.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  return connected;
}





