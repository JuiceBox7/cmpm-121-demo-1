import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "This game is just a static page";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = 0;
const score: HTMLDivElement = document.createElement("div");
score.innerHTML = `🌮's: ${counter}`;
app.append(score);

const increaseButton: HTMLButtonElement = document.createElement("button");
increaseButton.innerHTML = `🌮`;
const passiveUpgradeButton: HTMLButtonElement =
  document.createElement("button");
passiveUpgradeButton.innerHTML = "Earn a 🌮 every second! Cost: 10 🌮";
app.append(increaseButton);
app.append(passiveUpgradeButton);
passiveUpgradeButton.disabled = true;

increaseButton.addEventListener("click", function handleClick(event) {
  console.log("button was clicked");
  console.log(event);
  counter++;
  score.innerHTML = `🌮's: ${counter}`;
  if (counter >= 10) passiveUpgradeButton.disabled = false;
  else passiveUpgradeButton.disabled = true;
});

passiveUpgradeButton.addEventListener("click", function handleClick(event) {
  console.log("upgrade was purchased");
  console.log(event);
  passiveUpgradeButton.innerHTML = "Purchased!";
});

function passive(): void {
  counter++;
  score.innerHTML = `🌮's: ${counter}`;
}

let start: number,
  fps: number = 0,
  frameCounter: number = 0;

function step(timeStamp: number) {
  if (start === undefined) {
    start = timeStamp;
  }
  // track amount of time passed
  const elapsed = timeStamp - start;

  // once a minute has passed, log the fps
  if (elapsed < 1000) {
    fps++;
  }

  // then, count frames up to a second, and increase counter
  if (elapsed > 1000 && !passiveUpgradeButton.disabled) {
    frameCounter += 1 / fps;
    if (frameCounter > 1) {
      passive();
      frameCounter = 0;
    }
  }
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
