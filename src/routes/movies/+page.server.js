import db from "$lib/db.js";

export const load = async () => {
  const movies = await db.getMovies();
  return { movies };
};
