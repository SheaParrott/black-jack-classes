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
  html() {
    // console.log('html')
    if (this.cards.length === 1) {
      console.log('dealer')
    } else if (this.cards.length === 2) {
      // this is the default HTML tag that we will append to
      let HandHTML = document.querySelector('.game')
      // we need a individual div for each hand to append to now
      // with class added
      let individualHand = document.createElement('div')
      individualHand.classList.add('playerHand')
      HandHTML.appendChild(individualHand)
      console.log(HandHTML)
      // this is the first element created
      // everything else needs to be appended to the individual hand
      let header = document.createElement('h4')
      header.textContent = 'Player'
      HandHTML.appendChild(header)
    }
  }
}
let isSplashPage = true
const newGame = () => {
  // console.log('newgame')
  if (isSplashPage) {
    console.log(isSplashPage)
    isSplashPage = false
    console.log(isSplashPage)
  }
  let deck = new Deck()
  let playerHand = new Hand()
  for (let i = 2; i > 0; i--) {
    playerHand.takeCard(deck.deal())
  }
  playerHand.html()
  let dealerHand = new Hand()
  dealerHand.takeCard(deck.deal())
  dealerHand.html()
  // console.log('new game html' + dealerHand.html())
}

const main = () => {
  document.querySelector('.PlayGame').addEventListener('click', newGame)
}

document.addEventListener('DOMContentLoaded', main)
