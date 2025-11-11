<script>
  import MovieCard from "$lib/components/MovieCard.svelte";
  export let data;
</script>

<h1>Movies</h1>

<a href="/movies/create" class="btn btn-primary mb-3">Add New Movie</a>

<div class="row">
  {#each data.movies as movie}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <a href={`/movies/${movie._id}`} aria-label={`${movie.title} Details`}>
        <MovieCard {movie} />
      </a>
    </div>
  {/each}
</div>
