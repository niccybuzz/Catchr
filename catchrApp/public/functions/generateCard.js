function addStage1Card(pokemonName) {

  let html = `


  <!-- Stage -->
  <div class="text-xxxs w-11/12">Basic Pokemon</div>

  <!-- Pokemon name, hp, lvl -->
  <div class="flex items-baseline gap-2 p-0 m-0">
    <h1 class="flex-grow font-semibold">${pokemonName}</h1>
    <h1 class="self-end text-red-700 font-semibold">60 HP</h1>
    <img class="h-4 w-4 self-center" src="/images/energysymbol.png" />
  </div>

  <!-- Card image -->
  <img
    class="h-44 border-4 border-amber-400 self-center"
    src="/images/charmander.png"
  />

  <!-- Height/weight description -->
  <div class="border-2 flex-nowrap bg-amber-400 w-5/6 self-center m-1">
    <p class="italic text-xxxs text-center">
      No. 004 Lizard Pokemon HT: 2'00" WT: 18.7 lbs.
    </p>
  </div>

  <!-- Abilities -->
  <!-- Ability 1 -->
  <div
    class="flex flex-nowrap justify-between items-center border-b border-black m py-1"
  >
    <img class="h-4 w-4" src="/images/energysymbol.png" />
    <h1 class="relative text-s">Scratch</h1>
    <h1 class="self-end">10</h1>
  </div>

  <!-- Ability 2 -->
  <div class="flex items-center justify-center border-b border-black m p">
    <!-- Ability cost -->
    <img class="h-4 w-4" src="/images/energysymbol.png" />

    <!-- Container for ability name and description -->
    <div class="mx-4">
      <p class="text-xxs leading-tight">
        <span class="font-bold text-xs">Ember</span>
        Discard 1
        <img class="inline w-3 h-3" src="/images/energysymbol.png" />
        Energy card attached to Charmander in order to use this attack
      </p>
    </div>

    <!-- Ability Damage -->
    <h1>30</h1>
  </div>

  <!-- weakness/resistance/retreat cost -->
  <div class="flex justify-between">
    <div class="text-xxs flex flex-col items-center">
      weakness
      <img class="inline w-3 h-3" src="/images/energysymbol.png" />
    </div>
    <div class="text-xxs flex flex-col items-center">resistance</div>
    <div class="text-xxs flex flex-col items-center">
      retreat cost
      <img class="inline w-3 h-3" src="/images/energysymbol.png" />
    </div>
  </div>

  <!-- Bottom description -->
  <div
    class="border border-amber-400 flex-nowrap bg-transparent self-center m-1 mb-0"
  >
    <p class="italic text-xxxs text-center">
      Obviously prefers hot places. If it gets caught in the rain, steam
      is said to spout from the tip of its tail. LV.10 #4
    </p>
  </div>

  <!-- Fine print -->
  <div class="flex justify-between">
    <div class="text-xxxxs font-bold flex flex-col items-center">
      Illus. Mitsuhiro Arita
    </div>
    <div class="text-xxxxs flex flex-col items-center">
      @1995, 96, 97 Nintendo Creatures, GAMEFREAK 1999 Wizards
    </div>
    <div class="text-xxxxs font-bold flex flex-col items-center">
      46/102
    </div>
  </div>

`

  const newDiv = document.createElement("div");
  let gridDiv = document.getElementById("gridDiv");

  newDiv.classList.add("flex", "flex-col", "bg-white", "border-8", "border-yellow-300", "h-96", "w-64", "p-2", "pt-1", "m-10", "box-border", "rounded");
  newDiv.style.backgroundImage = ("url(images/firebackground.jpg)")
  newDiv.innerHTML = html;
  gridDiv.appendChild(newDiv);
}





