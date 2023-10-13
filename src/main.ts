import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Taco Tycoon";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = 0;
let rate = 0;

const score: HTMLDivElement = document.createElement("div");
score.innerHTML = `${counter} 🌮`;
app.append(score);

const TPS: HTMLDivElement = document.createElement("div");
TPS.innerHTML = `TPS: ${rate}`;
app.append(TPS);

class upgrade {
  name: string;
  isOwned: boolean = false;
  cost: number;
  rate: number;
  TPSCounter: number = 0;
  button?: HTMLButtonElement;
  description: string;

  constructor(
    name: string,
    cost: number,
    rate: number,
    description: string,
    button: HTMLButtonElement,
  ) {
    this.name = name;
    this.cost = cost;
    this.rate = rate;
    this.description = description;
    this.button = button;
  }
}

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Chef 👨‍🍳",
    cost: 10,
    rate: 0.1,
    description: "A set of working hands | 0.1 TPS",
  },
  {
    name: "Taqueria 👨‍🍳🔪👩‍🍳🔪",
    cost: 100,
    rate: 2,
    description: "A bustling restaurant | 2 TPS",
  },
  {
    name: "Taco Truck 🛻",
    cost: 250,
    rate: 10,
    description: "An uber popular Taco Truck | 10 TPS",
  },
  {
    name: "Taco Factory 🏭",
    cost: 500,
    rate: 25,
    description: "A whole factory dedicated to making tacos | 25 TPS",
  },
  {
    name: "Taco-matic 🤖",
    cost: 1000,
    rate: 50,
    description: "A taco making robot for all your taco making needs | 50 TPS",
  },
];

const increaseButton: HTMLButtonElement = document.createElement("button");
increaseButton.innerHTML = `🌮`;
app.append(increaseButton);

const upgrades: Array<upgrade> = [];

availableItems.forEach((item) => {
  const upgradeButton: HTMLButtonElement = document.createElement("button");
  upgradeButton.innerHTML = `${item.name} Cost: ${item.cost} 🌮 ${item.rate} <br> ${item.description}`;
  app.append(upgradeButton);
  const upgradeItem = new upgrade(
    item.name,
    item.cost,
    item.rate,
    item.description,
    upgradeButton,
  );
  upgrades.push(upgradeItem);
  upgradeButton.addEventListener("click", () => {
    update(upgradeItem);
  });
});

increaseButton.addEventListener("click", function handleClick(event) {
  console.log("Taco button was clicked");
  console.log(event);
  counter++;
  score.innerHTML = `${counter.toFixed(1)} 🌮`;
});

function update(upgrade: upgrade) {
  upgrade.isOwned = true;
  counter = minusFloat(counter, upgrade.cost);
  rate = addFloat(rate, upgrade.rate);
  upgrade.cost = multiplyFloat(upgrade.cost, 1.15);
  TPS.innerHTML = `TPS: ${rate.toFixed(1)}`;
  score.innerHTML = `${counter.toFixed(2)} 🌮`;
  upgrade.button!.innerHTML = `${upgrade.name} Cost: ${upgrade.cost.toFixed(
    1,
  )} 🌮 ${upgrade.rate.toFixed(1)} <br> ${upgrade.description}`;
}

function passive(inc: number): void {
  counter += inc;
  score.innerHTML = `${counter.toFixed(1)} 🌮`;
}

function checkUpgrade(upgrade: upgrade): void {
  if (counter < upgrade.cost) upgrade.button!.disabled = true;
  else upgrade.button!.disabled = false;
}

function applyUpgrade(upgrade: upgrade): void {
  if (upgrade.isOwned) {
    upgrade.TPSCounter = addFloat(upgrade.TPSCounter, upgrade.rate);
    console.log(upgrade.name);
    console.log(upgrade.TPSCounter);
    if (upgrade.TPSCounter >= 1) {
      passive(upgrade.TPSCounter);
      upgrade.TPSCounter = 0;
    }
  }
}

function addFloat(float1: number, float2: number): number {
  const a = float1.toString();
  const b = float2.toString();
  return Number(Math.round((parseFloat(a) + parseFloat(b)) * 10) / 10);
}

function multiplyFloat(float1: number, float2: number): number {
  const a = float1.toString();
  const b = float2.toString();
  return Number(Math.round(parseFloat(a) * parseFloat(b) * 10) / 10);
}

function minusFloat(float1: number, float2: number): number {
  const a = float1.toString();
  const b = float2.toString();
  return Number(Math.round((parseFloat(a) - parseFloat(b)) * 10) / 10);
}

let start: number;
let fps: number = 0;
let frameCounter: number = 0;

function step(timeStamp: number): void {
  if (start === undefined) {
    start = timeStamp;
  }

  upgrades.forEach((upgrade) => checkUpgrade(upgrade));

  // track amount of time passed
  const elapsed = timeStamp - start;

  // once a minute has passed, log the fps
  if (elapsed < 1000) {
    fps++;
  }

  // then, count frames up to a second, and increase counter according to upgrades
  if (elapsed >= 1000) {
    frameCounter += 1 / fps;
    if (frameCounter > 1) {
      upgrades.forEach((upgrade) => applyUpgrade(upgrade));
      frameCounter = 0;
    }
  }
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);
