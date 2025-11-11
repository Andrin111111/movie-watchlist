import db from "$lib/db.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
  const movie = await db.getMovie(params.id);
  if (!movie) throw error(404, "Movie not found");
  return { movie };
};
