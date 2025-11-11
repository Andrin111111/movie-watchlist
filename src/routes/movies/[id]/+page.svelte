<script>
  export let data;
  const m = data.movie;
</script>

<h1>{m.title} ({m.year})</h1>
<img src={m.poster} alt={m.title} width="260" />
<p>Länge: {m.length}</p>
{#if m.actors?.length}
  <p>Schauspieler: {m.actors.join(", ")}</p>
{/if}

<a href="/movies">Zurück zur Übersicht</a>
