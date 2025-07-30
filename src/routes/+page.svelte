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

<div class="flex flex-col items-center">
  <div class="w-[400px] m-5">
    <input class="input w-full" bind:value={searchQuery}/>
    <div class="w-full h-full">
    {#each results as result}
      <div class="card card-m">
        <div class="card-body">
          <div class="card-title text-2xl">{result.obj.name}</div>
          <div class="">
            <div class="italic">{result.obj.relation_type}: {result.obj.character_name}</div>
            {#each result.obj.choices.sort((a, b) => a.number - b.number ) as choice}
              <div class="mb-3">
                <div class="text-xl">{choice.text}</div>
                {#if choice.outcome_fail != null}
                  <div class="text-green-300">{choice.outcome}</div>
                  <div class="text-red-300">{choice.outcome_fail}</div>
                {:else}
                  <div>{choice.outcome}</div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
    </div>
  </div>
</div>
