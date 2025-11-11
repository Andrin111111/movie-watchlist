import db from "$lib/db.js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const title = String(form.get("title") ?? "").trim();
    const year = Number(form.get("year"));
    const length = String(form.get("length") ?? "").trim();
    const poster = String(form.get("poster") ?? "").trim();

    if (!title || !Number.isFinite(year) || year <= 0 || !length) {
      return fail(400, { error: "Bitte Titel, Jahr (>0) und Länge angeben." });
    }

    const movie = { title, year, length };
    if (poster) movie.poster = poster; // wenn leer, setzt db.createMovie Platzhalter

    await db.createMovie(movie);
    throw redirect(303, "/movies");
  }
};
