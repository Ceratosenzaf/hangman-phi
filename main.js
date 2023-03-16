const img = document.getElementById('hangman')
const winImg = document.getElementById('win')
const bdayImg = document.getElementById('bday')
const list = document.getElementById('letters')
const guess = document.getElementById('guess')
const playAgain = document.getElementById('play-again')

const WORD = "ROSALIA"
const LETTERS_IN_WORD =  WORD.split("")


const play = () => {
  let GUESS = LETTERS_IN_WORD.map(()=> "_")
  let errors = 0

  guess.innerText = GUESS.join(" ")
  const letters = new Array(26).fill(0).map((_, i) => String.fromCharCode(i+65))
  img.classList.remove("hidden")
  img.src = "assets/0.png"
  list.innerHTML = ""
  
  const handleWin = () => {
    img.classList.add("hidden")
    list.innerHTML = ""
    winImg.classList.remove("hidden")
    bdayImg.classList.remove("hidden")
  }
  
  const handleLoss = () => {
    list.innerHTML = ""
    playAgain.classList.remove("hidden")
    playAgain.addEventListener("click", ()=> {
      playAgain.classList.add("hidden")
      play()
    })
  }

  const handleError = (el) => {
    el.classList.replace("bg-violet-300", "bg-transparent")
    el.classList.add("text-transparent")
    errors += 1
    img.src = `assets/${errors}.png`
    if(errors >= 10) handleLoss()
  }

  const handleCorrect = (el) => {
    el.classList.replace("bg-violet-300", "bg-pink-600")
    el.classList.add("text-white")
    GUESS = GUESS.map((l ,i)=> LETTERS_IN_WORD[i] === el.innerText ? el.innerText: l)
    guess.innerText = GUESS.join(" ")
    if(GUESS.join("") === WORD) handleWin()
  }

  const handleClick = (el) => {
    el.disabled = true
    if(!LETTERS_IN_WORD.includes(el.innerText)) handleError(el)
    else handleCorrect(el)
  }

  letters.forEach((l) => {
    const el = document.createElement("button")
    el.innerText = l
    el.className = "h-16 w-16 lg:h-10 lg:w-10 rounded-md bg-violet-300 align-middle text-center"
    list.appendChild(el)
    el.addEventListener('click', () => handleClick(el))
  })
}

play()