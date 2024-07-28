const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");


btn.addEventListener("click", () => {
  let inpword = document.getElementById("inp-word").value;

  fetch(`${url}${inpword}`).then((response) => response.json()).then((data) => {
    console.log(data)
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
  });
});

let speech = new SpeechSynthesisUtterance();
let voices = [];

  window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[12];
};

 document.querySelector(".speak").addEventListener('click', () => {
  let inputText = document.getElementById('inp-word').value;

  if (inputText && inputText.trim().split(' ').length === 1){
    speech.text = inputText;
    window.speechSynthesis.speak(speech);
  }else{
    // console.log("no..");
    alert("please enter only the word");
  }


})



// for antonyms & synonyms 
// <p>antonyms: ${data[0].meanings[0].antonyms}</p>
// <p>synonyms: ${data[0].meanings[0].synonyms}</p>