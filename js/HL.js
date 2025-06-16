console.log('Main loaded');

let name = prompt("Plaats hier uw naam.");
const heading = document.querySelector(".h3");
heading.textContent = name;

if (name.toLowerCase() === "jamal") {
  document.body.style.backgroundImage = "url('https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-fd5e770d3e129efe4b0ed6c19271ed29afc807dc.jpg?s=1100&c=85&f=webp')";
} else if (name.toLowerCase() === "joker") {
  document.body.style.backgroundImage = "url('https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/305747850_193982036326158_1523785680975268763_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=H-tH2uOo0dQQ7kNvgH0V5_K&_nc_ht=scontent-ams2-1.xx&_nc_gid=Avvb2hJhiJUrzB-H7gzx1DF&oh=00_AYDxJX0LJ6a6_D-eSS4zRQYYiTr3vCY0_mGULo4gXRhOtA&oe=66F96F5F')";
} else if (name.toLowerCase() === "henkie") {
  document.body.style.backgroundImage = "url('https://i.scdn.co/image/5b9ba0b40ac37ee2052bbf466af4d562cc1b45fb')";
  const audio = new Audio('spotifydown.com - Wie Ben Jij.mp3');
  audio.play();
} else if (name.toLowerCase() === "thong") {
  document.body.style.backgroundImage = "url('https://media.printables.com/media/prints/181162/images/1692717_d0085c93-77e5-42c0-8007-abe5b21e6c18/thumbs/inside/1600x1200/png/mew_0.webp')";
} else if (name.toLowerCase() === "senna") {
  document.body.style.backgroundImage = "url('https://th.bing.com/th/id/R.5f73346a52776faccdca51c20588e1af?rik=mnazYAop3vHbjg&riu=http%3a%2f%2f25.media.tumblr.com%2f7c307d89682c5f8d1047d4ab178ec6c8%2ftumblr_mz1mdq2DTl1qdmmiqo1_500.gif&ehk=tF9ntU7fghEOpOIwioRA0gsvxgz4RMVh9ABtxSvzzBE%3d&risl=&pid=ImgRaw&r=0')";
} else if (name.toLowerCase() === "jeremy") {
  document.body.style.backgroundImage = "url('https://i.kym-cdn.com/entries/icons/original/000/051/371/baby_oil_meme_cover.jpg')";
} else if (name.toLowerCase() === "davi") {
  document.body.style.backgroundImage = "url('https://th.bing.com/th/id/OIP.5IZKhw-GzueO1Mp2MHqE2wHaFX?rs=1&pid=ImgDetMain')";
  if (name.toLowerCase() === "banana") {
    document.body.style.backgroundImage = "url('https://media1.tenor.com/m/f-D6FBIz5mQAAAAd/peely-the-shame.gif')";
}
  } else {

  console.log("Hello, " + name + "!");
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateDice(element, roll) {
  const diceUnicode = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;'];
  element.innerHTML = diceUnicode[roll - 1];
}

document.querySelector(".dice-button").addEventListener("click", function() {
 
  const computerRoll1 = rollDice();
  const computerRoll2 = rollDice();
  updateDice(document.querySelector(".computer-dice-one"), computerRoll1);
  updateDice(document.querySelector(".computer-dice-two"), computerRoll2);

  
});
document.querySelector(".go-button").addEventListener("click", function() {

const playerRoll1 = rollDice();
const playerRoll2 = rollDice();
updateDice(document.querySelector(".player-dice-one"), playerRoll1);
updateDice(document.querySelector(".player-dice-two"), playerRoll2);
});

const button = document.querySelector(".go-button");


const audio = new Audio('Toesh.mp4');
audio.preload = 'auto';

button.addEventListener("click", function () {
  audio.currentTime = 0;
  audio.play();
});

const search = prompt("Type een achtergrond die je wilt.");
fetch(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=ShOnwClHH15wo-GH_tmmhWgJGc2AX982Hk-6HbgEoi8`)
    .then(v => v.json())
    .then(data => {
        const imgUrl = data.results[0].urls.full;
        console.log(data.results[0].urls.full);
        const body = document.querySelector('body');
        body.style.backgroundImage = `url(${imgUrl})`;
    });





// Const Naam =”Speler”;
// Const Slotmachine =”Punten”;
// Let  Punten = [ 0, 0, 0];
// Const lengte = 1.95;
// Const millionair =”true”;
// const maxAttempts = 10;
// const guessHigher = False;
// const guessLower = True;
// let playerWon = False;

// Image search engine

// // Prompt the user for their name or search term
// let searchQuery = prompt("Plaats hier uw zoekterm voor een achtergrond.");
// if (searchQuery) {
//   // Fetch the first image result from Google Custom Search
//   fetchImageFromGoogle(searchQuery).then(imageURL => {
//       // Set the background image to the fetched image URL
//       document.body.style.backgroundImage = `url('${imageURL}')`;

//       // Update the heading with the user's search term
//       const heading = document.querySelector(".h3");
//       if (heading) {
//           heading.textContent = `Background set for: ${searchQuery}`;
//       }
//   }); <script async src="https://cse.google.com/cse.js?cx=84d84a646b5f54aa3"></script>
// {/* <div class="gcse-search"></div> */}