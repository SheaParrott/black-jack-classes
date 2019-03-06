class Deck {
  constructor() {
    this.cards = this.createDeck()
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
}
let deck = new Deck()
console.log(deck)

const main = () => {}

document.addEventListener('DOMContentLoaded', main)
