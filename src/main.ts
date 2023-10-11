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
app.append(increaseButton);

increaseButton.addEventListener("click", function handleClick(event) {
  console.log("button was clicked");
  console.log(event);
  counter++;
  score.innerHTML = `🌮's: ${counter}`;
});

function passiveIncrease(): void {
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
  if (elapsed > 1000) {
    frameCounter += 1 / fps;
    if (frameCounter > 1) {
      passiveIncrease();
      frameCounter = 0;
    }
  }
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
