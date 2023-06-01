
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

    
    let olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

// run function when page loads
printHighscores();
