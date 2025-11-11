import db from '$lib/server/db';
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
  const movie = await db.getMovie(params.id);
  if (!movie) throw error(404, "Movie not found");
  return { movie };
};
