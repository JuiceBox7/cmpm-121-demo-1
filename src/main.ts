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
  name: string = "";
  isOwned: boolean = false;
  cost: number = 0;
  rate: number = 0;
  TPSCounter: number = 0;
  button?: HTMLButtonElement;
}

interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Chef 👨‍🍳", cost: 10, rate: 0.1 },
  { name: "Taqueria 👨‍🍳🔪👩‍🍳🔪", cost: 100, rate: 2 },
  { name: "Taco Truck 🛻", cost: 1000, rate: 50 },
];

const chef = new upgrade();
chef.name = "Chef 👨‍🍳";
chef.cost = 10;
chef.rate = 0.1;

const kitchen = new upgrade();
kitchen.name = "Taqueria 👨‍🍳🔪👩‍🍳🔪";
kitchen.cost = 100;
kitchen.rate = 2;

const truck = new upgrade();
truck.name = "Taco Truck 🛻";
truck.cost = 1000;
truck.rate = 50;

const upgrades: Array<upgrade> = [chef, kitchen, truck];

const increaseButton: HTMLButtonElement = document.createElement("button");
increaseButton.innerHTML = `🌮`;
app.append(increaseButton);

const chefUpgrade: HTMLButtonElement = document.createElement("button");
chef.button = chefUpgrade;
chefUpgrade.innerHTML = `${availableItems[0].name} Cost: ${availableItems[0].cost} 🌮 (${availableItems[0].rate}) `;
app.append(chefUpgrade);

const kitchenUpgrade: HTMLButtonElement = document.createElement("button");
kitchen.button = kitchenUpgrade;
kitchenUpgrade.innerHTML = `${availableItems[1].name} Cost: ${availableItems[1].cost} 🌮 (${availableItems[1].rate})`;
app.append(kitchenUpgrade);

const truckUpgrade: HTMLButtonElement = document.createElement("button");
truck.button = truckUpgrade;
truckUpgrade.innerHTML = `${availableItems[2].name} Cost: ${availableItems[2].cost} 🌮 (${availableItems[2].rate})`;
app.append(truckUpgrade);

increaseButton.addEventListener("click", function handleClick(event) {
  console.log("Taco button was clicked");
  console.log(event);
  counter++;
  score.innerHTML = `${counter.toFixed(1)} 🌮`;
});

chefUpgrade.addEventListener("click", function handleClick(event) {
  console.log("Chef upgrade was purchased");
  console.log(event);
  update(chef);
});

kitchenUpgrade.addEventListener("click", function handleClick(event) {
  console.log("Taqueria upgrade was purchased");
  console.log(event);
  update(kitchen);
});

truckUpgrade.addEventListener("click", function handleClick(event) {
  console.log("Taco Truck was purchased");
  console.log(event);
  update(truck);
});

function update(upgrade: upgrade): void {
  upgrade.isOwned = true;
  counter = minusFloat(counter, upgrade.cost);
  rate = addFloat(rate, upgrade.rate);
  upgrade.cost = multiplyFloat(upgrade.cost, 1.15);
  TPS.innerHTML = `TPS: ${rate.toFixed(1)}`;
  score.innerHTML = `${counter.toFixed(1)} 🌮`;
  upgrade.button!.innerHTML = `${upgrade.name} Cost: ${upgrade.cost.toFixed(
    1,
  )} 🌮 (${upgrade.rate.toFixed(1)}) `;
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
