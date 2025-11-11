// src/lib/server/db.js
import { MongoClient, ObjectId } from 'mongodb';
import { env } from '$env/dynamic/private';

// Client nur einmal initialisieren
const client = new MongoClient(env.DB_URI);
let _db;

async function getDb() {
  if (!_db) {
    await client.connect();
    _db = client.db('ScreenStackDB'); // dein bisheriger DB-Name
  }
  return _db;
}

//////////////////////////////////////////
// Movies
//////////////////////////////////////////

// Get all movies
async function getMovies() {
  try {
    const db = await getDb();
    const collection = db.collection('movies');
    const movies = await collection.find({}).toArray();
    return movies.map((m) => ({ ...m, _id: m._id.toString() }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Get movie by id
async function getMovie(id) {
  try {
    const db = await getDb();
    const collection = db.collection('movies');
    const movie = await collection.findOne({ _id: new ObjectId(id) });
    return movie ? { ...movie, _id: movie._id.toString() } : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// create movie
async function createMovie(movie) {
  const doc = {
    poster: '/images/placeholder.jpg',
    actors: [],
    watchlist: false,
    ...movie
  };

  try {
    const db = await getDb();
    const collection = db.collection('movies');
    const result = await collection.insertOne(doc);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// update movie
async function updateMovie(movie) {
  try {
    const id = movie._id;
    const { _id, ...update } = movie;

    const db = await getDb();
    const collection = db.collection('movies');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    return result.matchedCount ? id : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// delete movie by id
async function deleteMovie(id) {
  try {
    const db = await getDb();
    const collection = db.collection('movies');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount ? id : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export default { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
export { ObjectId };
