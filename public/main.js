let isSplashPage = true
let DealerScoreValue = 0
let PlayerScoreValue = 0
let playerHand, dealerHand, deck
let playAgain = 0

class Deck {
  constructor() {
    this.cards = this.createDeck()
    this.shuffle()
  }
  createDeck() {
    let deck = []
    let suits = ['spades', 'hearts', 'clubs', 'diamonds']
    let cards = [
      { face: '2', value: 2 },
      { face: '3', value: 3 },
      { face: '4', value: 4 },
      { face: '5', value: 5 },
      { face: '6', value: 6 },
      { face: '7', value: 7 },
      { face: '8', value: 8 },
      { face: '9', value: 9 },
      { face: '10', value: 10 },
      { face: 'jack', value: 10 },
      { face: 'queen', value: 10 },
      { face: 'king', value: 10 },
      { face: 'ace', value: 11 }
    ]

    for (let index = 0; index < suits.length; index++) {
      for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        deck.push({
          face: cards[cardIndex].face,
          value: cards[cardIndex].value,
          suit: suits[index]
        })
      }
    }
    return deck
  }
  shuffle() {
    for (let index = 52 - 1; index > 1; index -= 1) {
      let otherIndex = Math.floor(Math.random() * index)

      let firstCard = this.cards[index]
      let secondCard = this.cards[otherIndex]

      this.cards[index] = secondCard
      this.cards[otherIndex] = firstCard
    }
  }
  deal() {
    return this.cards.pop()
  }
}
class Hand {
  constructor() {
    this.cards = []
  }
  takeCard(card) {
    this.cards.push(card)
  }
  totalValue() {
    let value = 0
    this.cards.forEach(card => {
      value += card.value
    })
    return value
  }
  busted() {
    return this.totalValue() > 21
  }
  dealerShouldKeepTakingCards() {
    let once = 0
    let interval = null
    let dealCard = function() {
      if (dealerHand.totalValue() <= 17) {
        let card = deck.deal()
        dealerHand.takeCard(card)
        let Hand = document.querySelector('div.Dealer')
        if (once == 0) {
          document.querySelector('img.backOfCard').classList.add('hidden')
          once = +1
        }
        let displayedCard = document.createElement('img')
        displayedCard.classList.add('card')
        displayedCard.src = `./assets/${card.face}_of_${card.suit}.svg`

        Hand.appendChild(displayedCard)

        let total = document.querySelector('h2.Dealertotal')
        total.textContent = 'Dealer' + ' ' + `(${dealerHand.totalValue()})`
      } else {
        clearInterval(interval)
        whoWon()
      }
    }
    interval = setInterval(dealCard, 600)
  }
  StartGameHTML() {
    // this is used to determine the name displayed on the dom and class
    // name of either "Dealer" or "Player"
    if (playAgain > 1) {
      document.querySelector('div.resetButton').classList.add('hidden')
    }
    let playerOrDealer = this.cards.length === 1 ? 'Dealer' : 'Player'

    let scoreContainer = document.querySelector('.score')
    let TheScore = document.createElement('h4')
    TheScore.classList.add(`gamesWon${playerOrDealer}`)
    TheScore.textContent = `${playerOrDealer} Won: ${
      this.cards.length === 1 ? DealerScoreValue : PlayerScoreValue
    }`
    scoreContainer.appendChild(TheScore)

    // this is the default HTML tag that we will append to
    let HandContainer = document.querySelector('.game')

    // this is the first element created
    // everything else needs to be appended to the individual hand
    let PlayerOrDealerPlusTotal = document.createElement('h2')
    PlayerOrDealerPlusTotal.classList.add(`${playerOrDealer}total`)
    PlayerOrDealerPlusTotal.textContent =
      playerOrDealer + ' ' + `(${this.totalValue()})`
    HandContainer.appendChild(PlayerOrDealerPlusTotal)
    // we need a individual div for each hand to append to now
    // with class added
    let individualHand = document.createElement('div')
    individualHand.classList.add(playerOrDealer)
    HandContainer.appendChild(individualHand)

    if (this.cards.length === 1) {
      let displayedCard = document.createElement('img')
      displayedCard.classList.add('card')
      displayedCard.classList.add('backOfCard')
      displayedCard.src = `./assets/backOfCard.png`
      individualHand.appendChild(displayedCard)
    }
    this.cards.forEach(card => {
      // creating a image tag for each card in the hand and adding class name of "card"
      let displayedCard = document.createElement('img')
      displayedCard.classList.add('card')
      displayedCard.src = `./assets/${card.face}_of_${card.suit}.svg`
      individualHand.appendChild(displayedCard)
    })
    document.querySelector('div.gameButtons').classList.remove('hidden')
  }
}
const winnerHTML = who => {
  let whoWonContainer = document.querySelector('.whoWon')
  let whoWonElement = document.createElement('h4')
  whoWonElement.textContent = who
  whoWonContainer.appendChild(whoWonElement)
}
const incrementWinCount = who => {
  switch (who) {
    case 'Dealer':
      DealerScoreValue += 1
      let DealerGameWon = document.querySelector('h4.gamesWonDealer')
      DealerGameWon.textContent = `Dealer Won: ${DealerScoreValue}`
      break
    case 'Player':
      PlayerScoreValue += 1
      let PlayerGameWon = document.querySelector('h4.gamesWonPlayer')
      PlayerGameWon.textContent = `Player Won: ${PlayerScoreValue}`
      break
    default:
      break
  }
}

const whoWon = () => {
  let playerTotal = playerHand.totalValue()
  let dealerTotal = dealerHand.totalValue()
  if (playerHand.busted() && !dealerHand.busted()) {
    winnerHTML('Dealer Wins!')
    incrementWinCount('Dealer')
  } else if (!playerHand.busted() && dealerHand.busted()) {
    winnerHTML('Player Wins!')
    incrementWinCount('Player')
  } else if (playerHand.busted() && dealerHand.busted()) {
    winnerHTML('Everyone Busted!')
  } else if (playerTotal > dealerTotal) {
    winnerHTML('Player Wins!')
    incrementWinCount('Player')
  } else if (playerTotal < dealerTotal) {
    winnerHTML('Dealer Wins!')
    incrementWinCount('Dealer')
  } else if (playerTotal === dealerTotal) {
    winnerHTML('Tie!')
  }
}
const stayButton = () => {
  dealerHand.dealerShouldKeepTakingCards()
  document.querySelector('div.gameButtons').classList.add('hidden')
  document.querySelector('div.resetButton').classList.remove('hidden')
}
const hitButton = () => {
  if (playerHand.busted()) {
    return
  }
  let card = deck.deal()
  playerHand.takeCard(card)
  // creating a image tag for each card in the hand and adding class name of "card"
  let displayedCard = document.createElement('img')
  displayedCard.classList.add('card')
  displayedCard.src = `./assets/${card.face}_of_${card.suit}.svg`
  // 2_of_clubs.svg
  document.querySelector('div.Player').appendChild(displayedCard)
  // new total of players hand
  if (playerHand.busted()) {
    let newTotal = document.querySelector('h2.Playertotal')
    newTotal.textContent = 'BUSTED!'
    // increment dealer score and change the text value on the dom
    document.querySelector('div.gameButtons').classList.add('hidden')
    document.querySelector('div.resetButton').classList.remove('hidden')
    dealerHand.dealerShouldKeepTakingCards()
  } else {
    let newTotal = document.querySelector('h2.Playertotal')
    newTotal.textContent = 'Player' + ' ' + `(${playerHand.totalValue()})`
  }
}
const newGame = () => {
  playAgain += 1
  document.querySelector('.game').innerHTML = ''
  document.querySelector('.score').innerHTML = ''
  document.querySelector('.whoWon').innerHTML = ''
  if (isSplashPage) {
    isSplashPage = false
    document.querySelector('.logoCentering').classList.add('hidden')
    document.querySelector('main').classList.add('logoCentering')
    document.querySelector('main').classList.remove('hidden')
  }
  deck = new Deck()

  dealerHand = new Hand()
  dealerHand.takeCard(deck.deal())
  dealerHand.StartGameHTML()
  playerHand = new Hand()
  for (let i = 2; i > 0; i--) {
    playerHand.takeCard(deck.deal())
  }
  playerHand.StartGameHTML()
}
const Home = () => {
  isSplashPage = true
  DealerScoreValue = 0
  PlayerScoreValue = 0
  document.querySelector('.game').innerHTML = ''
  document.querySelector('.score').innerHTML = ''
  document.querySelector('.whoWon').innerHTML = ''
  document.querySelector('.logoCentering').classList.remove('hidden')
  document.querySelector('main').classList.add('hidden')
}

const main = () => {
  document.querySelector('.PlayGame').addEventListener('click', newGame)
  document.querySelector('.RESET').addEventListener('click', newGame)
  document.querySelector('.HIT').addEventListener('click', hitButton)
  document.querySelector('.STAY').addEventListener('click', stayButton)
  document.querySelector('.Home').addEventListener('click', Home)
}

document.addEventListener('DOMContentLoaded', main)
