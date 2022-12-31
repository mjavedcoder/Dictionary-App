const searchButton = document.getElementById("btn");
const searchField = document.getElementById("searchWord");
const volume = document.getElementById("micCheck");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const randomWord = () => {
  let saveWord = searchField.value;
  fetch(`${url}${saveWord}`)
    .then((response) => response.json())
    .then((values) => {
      console.log(values);
      output.innerHTML = `
     <div id="box-2">
      <h3>${values[0].word}</h3>
      <button onclick="playSound()">
        <i class="fas fa-volume-up">
        </i>
      </button>
    </div>
    <div id="box-3">
      <p>${values[0].meanings[0].partOfSpeech}</p>
      <p> ${values[0].phonetic} </p>
    </div>

    <div id="box-4">
      <p>
      ${values[0].meanings[0].definitions[0].definition}</br>
      </p>
      <p id="paragraph-2">
    ${values[0].meanings[0].definitions[0].example || ""}
      </p>`;
      //volume.setAttribute("src", `https:${values[0].phonetics[0].audio}`); This will not produce the sound of word as i am adding here manually while the http already contains here.so the down below code without templete literal will work.
      volume.setAttribute("src", values[0].phonetics[0].audio);
    })
    .catch((error) => {
      if (saveWord.length === 0) {
        output.innerHTML = `<h2 class="error-1">Please,Enter valid word</h2>`;
      } else {
        output.innerHTML = `<h2 class="error-1">Sorry,Can't find this word</h2>`;
      }
    });
};

searchButton.addEventListener("click", randomWord);
searchField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    randomWord();
  }
});

function playSound() {
  volume.play();
}
