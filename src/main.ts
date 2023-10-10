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

increaseButton.addEventListener("click", function handleClick(event) {
  console.log("button was clicked");
  console.log(event);
  counter++;
  score.innerHTML = `🌮's: ${counter}`;
});

app.append(increaseButton);
