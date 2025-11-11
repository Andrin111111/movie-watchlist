import db from '$lib/server/db';


export const load = async () => {
  const movies = await db.getMovies();
  return { movies };
};
