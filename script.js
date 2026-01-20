const players = [
  { name: "Balen", img: "Balen.jpg" },
  { name: "Harka", img: "harka.jpg" },
  { name: "Oli", img: "oli.jpg" },
  { name: "Rabi", img: "rabi.jpg" },
  { name: "Deuwa", img: "deuwa.jpg" },
  { name: "Prachanda", img: "prachanda.jpg" },
  { name: "Sagar", img: "sagar.jpg" },
  { name: "Aashika", img: "aashika.jpg" }
];

const battleDiv = document.getElementById("battle");
let contestants = shuffle([...players]);
let winners = [];
let round = 1;
let currentMatch = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Get round name
function getRoundName(numPlayers) {
  switch (numPlayers) {
    case 2: return "Final";
    case 4: return "Semifinals";
    case 8: return "Quarterfinals";
    default: return `Round ${round}`;
  }
}

// Change background color slightly per round
function setRoundBackground(numPlayers) {
  switch(numPlayers) {
    case 8: document.body.style.backgroundColor = "#1e1e2f"; break;
    case 4: document.body.style.backgroundColor = "#2e1e3f"; break;
    case 2: document.body.style.backgroundColor = "#1e2e3f"; break;
  }
}

function startRound() {
  setRoundBackground(contestants.length);
  battleDiv.innerHTML = "";
  currentMatch = 0;
  winners = [];

  const roundHeading = document.createElement("h2");
  roundHeading.textContent = getRoundName(contestants.length);
  battleDiv.appendChild(roundHeading);

  showNextMatch();
}

function showNextMatch() {
  const oldMatch = document.getElementById("current-match");
  if (oldMatch) oldMatch.remove();

  if (currentMatch >= contestants.length) {
    contestants = shuffle(winners);
    winners = [];
    round++;
    if (contestants.length > 1) startRound();
    else displayChampion(contestants[0]);
    return;
  }

  const player1 = contestants[currentMatch];
  const player2 = contestants[currentMatch + 1];

  const matchDiv = document.createElement("div");
  matchDiv.id = "current-match";

  const createPlayerDiv = (player) => {
    const div = document.createElement("div");
    div.className = "player-card";

    const img = document.createElement("img");
    img.src = player.img;
    img.alt = player.name;

    const name = document.createElement("p");
    name.textContent = player.name;

    const button = document.createElement("button");
    button.textContent = "Vote";
    button.onclick = () => {
      // Shrink animation
      div.classList.add("vote-shrink");
      setTimeout(() => div.classList.remove("vote-shrink"), 200);

      winners.push(player);
      currentMatch += 2;
      setTimeout(showNextMatch, 300); // slight delay for shrink effect
    };

    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(button);

    return div;
  };

  matchDiv.appendChild(createPlayerDiv(player1));

  if (player2) {
    const vsDiv = document.createElement("div");
    vsDiv.id = "vs-sign";
    vsDiv.textContent = "VS";
    matchDiv.appendChild(vsDiv);

    matchDiv.appendChild(createPlayerDiv(player2));
  } else {
    winners.push(player1);
  }

  battleDiv.appendChild(matchDiv);
}

// Champion display
function displayChampion(player) {
  battleDiv.innerHTML = "";
  const champDiv = document.createElement("div");
  champDiv.className = "champion-card";

  const img = document.createElement("img");
  img.src = player.img;
  img.alt = player.name;

  const h2 = document.createElement("h2");
  h2.textContent = `🏆 Champion: ${player.name} 🏆`;

  champDiv.appendChild(img);
  champDiv.appendChild(h2);
  battleDiv.appendChild(champDiv);
}

// Start tournament
startRound();

