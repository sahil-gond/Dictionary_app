document.addEventListener('DOMContentLoaded', (event) => {
  const inputField = document.getElementById('inputField');
  const saveButton = document.getElementById('saveButton');
  const historyList = document.getElementById('historyList');

  // Load existing history from local storage
  loadHistory();

  saveButton.addEventListener('click', () => {
      const inputValue = inputField.value.trim();

      if (inputValue) {
          // Save the new entry to local storage
          saveToLocalStorage(inputValue);
          
          // Update the history list
          addToHistoryList(inputValue);

          // Clear the input field
          inputField.value = '';
      }
  });

  function saveToLocalStorage(value) {
      let history = JSON.parse(localStorage.getItem('history')) || [];
      history.push(value);
      localStorage.setItem('history', JSON.stringify(history));
  }

  function loadHistory() {
      let history = JSON.parse(localStorage.getItem('history')) || [];
      history.forEach(entry => addToHistoryList(entry));
  }

  function addToHistoryList(value) {
      let li = document.createElement('li');
      li.textContent = value;
      historyList.appendChild(li);
  }
});
