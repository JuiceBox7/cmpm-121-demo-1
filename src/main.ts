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
score.innerHTML = `🌮's: ${counter}`;
app.append(score);

const TPS: HTMLDivElement = document.createElement("div");
TPS.innerHTML = `TPS: ${rate}`;
app.append(TPS);

class upgrade {
  name: string = "";
  isOwned: boolean = false;
  cost: number = 0;
  ogRate: number = 0;
  rate: number = 0;
  TPSCounter: number = 0;
  button?: HTMLButtonElement;
}

const chef = new upgrade();
chef.name = "Chef 👨‍🍳";
chef.cost = 10;
chef.ogRate = 0.1;
chef.rate = 0.1;

const kitchen = new upgrade();
kitchen.name = "Kitchen 👨‍🍳🔪👩‍🍳🔪";
kitchen.cost = 100;
kitchen.ogRate = 2;
kitchen.rate = 2;

const truck = new upgrade();
truck.name = "Taco Truck 🛻";
truck.cost = 1000;
truck.ogRate = 50;
truck.rate = 50;

const upgrades: Array<upgrade> = [chef, kitchen, truck];

const increaseButton: HTMLButtonElement = document.createElement("button");
increaseButton.innerHTML = `🌮`;
app.append(increaseButton);

const chefUpgrade: HTMLButtonElement = document.createElement("button");
chef.button = chefUpgrade;
chefUpgrade.innerHTML = `Chef 👨‍🍳 Cost: ${chef.cost} 🌮 (${chef.rate}) `;
app.append(chefUpgrade);

const kitchenUpgrade: HTMLButtonElement = document.createElement("button");
kitchen.button = kitchenUpgrade;
kitchenUpgrade.innerHTML = `Kitchen 👨‍🍳🔪👩‍🍳🔪 Cost: ${kitchen.cost} 🌮 (${kitchen.rate})`;
app.append(kitchenUpgrade);

const truckUpgrade: HTMLButtonElement = document.createElement("button");
truck.button = truckUpgrade;
truckUpgrade.innerHTML = `Taco Truck 🛻 Cost: ${truck.cost} 🌮 (${truck.rate})`;
app.append(truckUpgrade);

increaseButton.addEventListener("click", function handleClick(event) {
  console.log("Taco button was clicked");
  console.log(event);
  counter++;
  score.innerHTML = `🌮's: ${counter}`;
});

chefUpgrade.addEventListener("click", function handleClick(event) {
  console.log("Chef upgrade was purchased");
  console.log(event);
  update(chef);
});

kitchenUpgrade.addEventListener("click", function handleClick(event) {
  console.log("Kitchen upgrade was purchased");
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
  upgrade.rate = addFloat(upgrade.rate, upgrade.ogRate);
  upgrade.cost = multiplyFloat(upgrade.cost, 1.15);
  TPS.innerHTML = `TPS: ${rate.toFixed(2)}`;
  score.innerHTML = `🌮's: ${counter.toFixed(2)}`;
  upgrade.button!.innerHTML = `${upgrade.name} Cost: ${upgrade.cost.toFixed(
    2,
  )} 🌮 (${upgrade.rate.toFixed(2)}) `;
}

function passive(inc: number): void {
  counter += inc;
  score.innerHTML = `🌮's: ${counter}`;
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
