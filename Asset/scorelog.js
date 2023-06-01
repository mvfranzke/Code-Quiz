
// Functions to store and display score and user name or initials
function printHighscores() {
  /* retrieves saved date or return empaty array if no data available */
  let highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  /* sorts data in decending order */
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  /* for loop to create listed items when displaying saved score and initials */
  for (let i = 0; i < highscores.length; i += 1) {
    let liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

  /* use appendChild to display created li element on the page */  
    let olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

/* deletes all data in local storage and reloads it */
function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}


/* deletes local storage file when user clicks the clear button */
document.getElementById('clear').onclick = clearHighscores;

/* initiats the display of scores on the page */
printHighscores();
