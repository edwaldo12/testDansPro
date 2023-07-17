import "dotenv/config";

const { MONGODB_ATLAS_USERNAME, MONGODB_ATLAS_PASSWORD, MONGODB_ATLAS_DBNAME } =
  process.env;

const uri = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@clusters.apbe4.mongodb.net/${MONGODB_ATLAS_DBNAME}?retryWrites=true&w=majority`;

export default uri;
