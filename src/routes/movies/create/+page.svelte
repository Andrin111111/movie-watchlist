<script>
  export let form;
  let title = "";
  let year = "";
  let length = "";
  let poster = "";
  $: preview = poster?.trim() ? poster.trim() : "/images/placeholder.jpg";
</script>

<h1>Add a Movie</h1>
{#if form?.error}<p style="color:red">{form.error}</p>{/if}

<form method="POST" class="d-flex flex-column gap-3" on:submit>
  <label class="form-label">
    Name
    <input class="form-control" name="title" bind:value={title} required />
  </label>

  <label class="form-label">
    Year
    <input class="form-control" name="year" type="number" min="1" bind:value={year} required />
  </label>

  <label class="form-label">
    Length
    <input class="form-control" name="length" placeholder="z. B. 114 Minuten" bind:value={length} required />
  </label>

  <label class="form-label">
    Image URL
    <input class="form-control" name="poster" type="url" bind:value={poster} placeholder="/images/placeholder.jpg" />
  </label>

  <div>
    <p class="mb-1">Preview</p>
    <img src={preview} alt="poster preview" width="220" />
  </div>

  <div class="d-flex gap-2">
    <button class="btn btn-primary" type="submit">Add Movie</button>
    <a class="btn btn-secondary" href="/movies">Back</a>
  </div>
</form>
