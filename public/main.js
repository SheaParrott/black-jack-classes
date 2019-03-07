let isSplashPage = true
let DealerScoreValue = 0
let PlayerScoreValue = 0
let playerHand, dealerHand, deck

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
    return this.totalValue() <= 17
  }
  StartGameHTML() {
    // this is used to determine the name displayed on the dom and class
    // name of either "Dealer" or "Player"
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

    // let total = document.createElement('h4')
    // total.textContent = `Total: ${this.totalValue()}`
    // HandContainer.appendChild(total)
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
      // 2_of_clubs.svg
      individualHand.appendChild(displayedCard)
    })
    document.querySelector('div.gameButtons').classList.remove('hidden')
  }
}
const hitButton = () => {
  if (playerHand.busted()) {
    return
  }
  let card = deck.deal()
  playerHand.takeCard(card)
  console.log(playerHand)
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
    DealerScoreValue += 1
    let DealerGameWon = document.querySelector('h4.gamesWonDealer')
    DealerGameWon.textContent = `Dealer Won: ${DealerScoreValue}`
    document.querySelector('div.gameButtons').classList.add('hidden')
    document.querySelector('div.resetButton').classList.remove('hidden')
  } else {
    let newTotal = document.querySelector('h2.Playertotal')
    newTotal.textContent = 'Player' + ' ' + `(${playerHand.totalValue()})`
  }
}
const newGame = () => {
  document.querySelector('.game').innerHTML = ''
  if (isSplashPage) {
    isSplashPage = false
    document.querySelector('.logoCentering').classList.add('hidden')
    document.querySelector('main').classList.add('logoCentering')
    main()
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

const main = () => {
  document.querySelector('.PlayGame').addEventListener('click', newGame)
  document.querySelector('.HIT').addEventListener('click', hitButton)
  // document.querySelector('.STAY').addEventListener('click')
  document.querySelector('.Home').addEventListener('click', () => {
    location.reload(true)
  })
}

document.addEventListener('DOMContentLoaded', main)
