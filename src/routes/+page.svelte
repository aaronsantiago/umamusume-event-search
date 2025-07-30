<script>
  import fuzzysort from 'fuzzysort'
  import { events } from '$lib/events';
  let searchQuery = $state("");

  let results = $derived(fuzzysort.go(searchQuery, events, {
    keys: ['name', 'character_name', obj => obj.choices.map(c => c.text).join(" ")],
  }))

  let searchResults = $state([]);
  $effect(() => {
    console.log(searchQuery);
  });
</script>

<input class="input" bind:value={searchQuery}/>
{#each results as result}
  <div class="whitespace-pre">
      {JSON.stringify(result.obj, null, 2)}
  </div>
{/each}
