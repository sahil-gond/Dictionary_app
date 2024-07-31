const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
const numb = document.getElementById("hist-number");

// Initialize history count based on localStorage
let tasks = JSON.parse(localStorage.getItem('input-word')) || [];
let a = tasks.length;
numb.innerHTML = a < 10 ? "0" + a : a;

// Fetch word details and display them
btn.addEventListener("click", () => {
  let inpword = document.getElementById("inp-word").value;
  fetch(`${url}${inpword}`)
    .then(response => response.json())
    .then(data => {
      if (data && data[0]) {
        result.innerHTML = `
          <div class="word">
            <h3>${inpword}</h3>
          </div>
          <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic}</p>
          </div>
          <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
          </p>
          <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
          </p>`;
        updateHistory(inpword);
      } else {
        alert("Word not found. Please try another word.");
      }
    });
});

// Text-to-speech setup
let speech = new SpeechSynthesisUtterance();
let voices = [];
  window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[12];
  };

// Speak the input word
document.querySelector(".speak").addEventListener('click', () => {
  let wordElement = document.querySelector('.word h3');
  if (wordElement && wordElement.textContent.trim()) {
    speech.text = wordElement.textContent;
    window.speechSynthesis.speak(speech);
  } else {
    alert("No word to speak.");
  }
});

// Update history
function updateHistory(word) {
  if (word.trim()) {
    tasks.unshift(word.trim()); // Add the new word at the beginning of the array
    localStorage.setItem('input-word', JSON.stringify(tasks));
    a = tasks.length;
    numb.innerHTML = a < 10 ? "0" + a : a;
  }
  document.getElementById("inp-word").value = '';
}

// Redirect to history page
function history() {
  window.location.href = "history.html";
}

//starred section


// Redirect to star page
function starred(){
  window.location.href = "star.html";
}
