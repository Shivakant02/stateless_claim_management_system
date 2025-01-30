import { connect, set } from "mongoose";

const connectToDatabase = async () => {
  console.log(process.env.MONGO_URI);
  try {
    const { connection } = await connect(process.env.MONGO_URI);

    if (connection) {
      console.log(`connection to mongodb: ${connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDatabase;
