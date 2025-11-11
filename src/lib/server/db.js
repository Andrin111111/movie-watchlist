import { MongoClient, ObjectId } from "mongodb";
import { env } from "$env/dynamic/private";

const client = new MongoClient(env.DB_URI);
let _db;

async function getDb() {
  if (!_db) {
    await client.connect();
    _db = client.db("ScreenStackDB"); // dein DB-Name
  }
  return _db;
}

// Movies CRUD-Funktionen
async function getMovies() {
  try {
    const db = await getDb();
    const movies = await db.collection("movies").find({}).toArray();
    return movies.map((m) => ({ ...m, _id: m._id.toString() }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getMovie(id) {
  try {
    const db = await getDb();
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
    return movie ? { ...movie, _id: movie._id.toString() } : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function createMovie(movie) {
  movie.poster = "/images/placeholder.jpg";
  movie.actors = [];
  movie.watchlist = false;

  try {
    const db = await getDb();
    const result = await db.collection("movies").insertOne(movie);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function updateMovie(movie) {
  try {
    const id = movie._id;
    const { _id, ...update } = movie;
    const db = await getDb();
    const result = await db
      .collection("movies")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    return result.matchedCount ? id : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function deleteMovie(id) {
  try {
    const db = await getDb();
    const result = await db.collection("movies").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount ? id : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export default { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
export { ObjectId };
