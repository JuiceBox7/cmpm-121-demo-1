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

const increaseButton: HTMLButtonElement = document.createElement("button");
increaseButton.innerHTML = `🌮`;
app.append(increaseButton);

const chefUpgrade: HTMLButtonElement = document.createElement("button");
chefUpgrade.innerHTML = "Chef 👨‍🍳 Cost: 10 🌮 (0.1 TPS) ";
app.append(chefUpgrade);

const kitchenUpgrade: HTMLButtonElement = document.createElement("button");
kitchenUpgrade.innerHTML = "Kitchen Staff 👨‍🍳🔪👩‍🍳🔪 Cost: 100 🌮 (2.0 TPS)";
app.append(kitchenUpgrade);

const truckUpgrade: HTMLButtonElement = document.createElement("button");
truckUpgrade.innerHTML = "Taco Truck 🛻 Cost: 1000 🌮 (50 TPS)";
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

class upgrade {
  isOwned: boolean = false;
  cost: number = 0;
  rate: number = 0;
  TPSCounter: number = 0;
  button?: HTMLButtonElement;
}

const chef = new upgrade();
chef.cost = 10;
chef.rate = 0.1;
chef.button = chefUpgrade;

const kitchen = new upgrade();
kitchen.cost = 100;
kitchen.rate = 2;
kitchen.button = kitchenUpgrade;

const truck = new upgrade();
truck.cost = 1000;
truck.rate = 50;
truck.button = truckUpgrade;

const upgrades: Array<upgrade> = [chef, kitchen, truck];

function update(upgrade: upgrade) {
  upgrade.isOwned = true;
  counter -= upgrade.cost;
  rate += upgrade.rate;
  TPS.innerHTML = `TPS: ${rate}`;
  score.innerHTML = `🌮's: ${counter}`;
  upgrade.button!.innerHTML = "Purchased!";
}

function passive(inc: number): void {
  counter += inc;
  score.innerHTML = `🌮's: ${counter}`;
}

function checkUpgrade(upgrade: upgrade) {
  if (counter < upgrade.cost || upgrade.isOwned)
    upgrade.button!.disabled = true;
  else upgrade.button!.disabled = false;
}

function applyUpgrade(upgrade: upgrade) {
  if (upgrade.isOwned) {
    upgrade.TPSCounter = addFloat(upgrade.TPSCounter, upgrade.rate);
    console.log(upgrade.TPSCounter);
    if (upgrade.TPSCounter >= 1) {
      passive(upgrade.TPSCounter);
      upgrade.TPSCounter = 0;
    }
  }
}

function addFloat(float1: number, float2: number) {
  const a = float1.toString();
  const b = float2.toString();
  return Number(Math.round((parseFloat(a) + parseFloat(b)) * 100) / 100);
}

let start: number,
  fps: number = 0,
  frameCounter: number = 0;

function step(timeStamp: number) {
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
