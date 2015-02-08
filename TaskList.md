## Task List

TODO:

 + Extract card from sprite - figure out how.
 + Object classes - decide on architecture.
 - Set up 3 or 5 chair layout
 - Combo/Permutations library?
 - Set up card back image & hideHand method
 - Add landing image
 - Create Pot object
 - Create Bank object
 - Convert to vanilla JS?
 - Swap out card sprite to add jokers?

Nice-to-haves:

 - Swap out sprite for one with jokers


Classes:

 - Game
   - setOptions (optional)
   - initialize
   - renderPlayers
   - renderCard
   - renderHand
   - declareWinner
 - Player
   - getCashBalance
   - placeBet
   - fold
 - Computer
   - placeBet
   - fold
 - Shoe
   - shuffle
   - dealCard
 - Deck
   - init
   - showCard
 - Hand
   - addCard
   - rankHand

