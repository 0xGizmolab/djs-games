# About
- A discord.js Games Package with Who's that Pokemon, ConnectFour, Snake, rock paper scissors, guessTheNumber, , guess the Logo , Guess The Flag, tictactoe , fast type!
- Join our [Support Server](https://discord.gg/jDP2FbvCdk) for help
The Update for DJS-V13 is Out! 
- For Discord.js v13: npm i djs-games
- For Discord.js v12: npm i djs-games@old
# Installation

```npm i djs-games```

# Example usage

```
USE ACCORDING TO YOUR COMMAND HANDLER
```

**Who's That Pokemon**
=== 
![](https://cdn.discordapp.com/attachments/856573008302309376/856574463453691934/npmpokemon.gif)
```js
 const { Pokemon } = require('djs-games')
    const game = new Pokemon({
    message: message,
    token: "dagpi-token-here", // Get Your Api Token at https://dagpi.xyz/dashboard
    })
    game.start()
```

**Guess The Logo**
=== 

```js
 const { GTL } = require('djs-games')
    const game = new GTL({
    message: message,
    token: "dagpi-token-here", // *Required!! Get Your Api Token at https://dagpi.xyz/dashboard 
    stopCommand: "stop", // *Required!!
    winFooter: "You Win!", // Set The Footer of the win message
    winColor: "GREEN", // The embed color of the win message
    loseFooter: "You Lose!", // Set The Footer of the lose message
    loseColor: "RED", // The embed color of the lose message
    questionFooter: "Guess the Logo!", // Set The Footer of the question message
    questionColor: "BLUE", // The embed color of the question message
    })
    game.start()
```

**Guess The Flag**
=== 

```js
 const { GTF } = require('djs-games')
    const game = new GTF({
    message: message,
    token: "dagpi-token-here", // *Required!! Get Your Api Token at https://dagpi.xyz/dashboard 
    stopCommand: "stop", // *Required!!
    winFooter: "You Win!", // Set The Footer of the win message
    winColor: "GREEN", // The embed color of the win message
    loseFooter: "You Lose!", // Set The Footer of the lose message
    loseColor: "RED", // The embed color of the lose message
    questionFooter: "Guess the Flag!", // Set The Footer of the question message
    questionColor: "BLUE", // The embed color of the question message
    })
    game.start()
```

**Tic Tac Toe**
=== 

```js
const djsGames = require('djs-games')
const TicTacToe = new djsGames.TicTacToe()
 TicTacToe.startGame(message)
```

**ConnectFour**
===

```js
const djsGames = require('djs-games')
const ConnectFour = new djsGames.ConnectFour()
ConnectFour.startGame(message)
```

**SNAKE**
===

```js
const djsGames = require('djs-games')
const SnakeGame = new djsGames.SnakeGame()
SnakeGame.startGame(message)
```

**RockPaperScissors**
===

```js
const djsGames = require('djs-games')
const RockPaperScissors = new djsGames.RockPaperScissors()
 RockPaperScissors.startGame(message)
```

**GuessTheNumber**
===

```js
const djsGames = require('djs-games')
const guessTheNumber = new djsGames.GuessTheNumber()
 guessTheNumber.startGame(message)
```

**Fast Type**
===

```js
const djsGames = require('djs-games')
const FastTyper = new djsGames.FastTyper()
FastTyper.startGame(message)

```

# Credits
Thanks to Koenie For the Code Base!

# Note: 
Please Respect the license and dont just copy  the whole thing as paste as your own package!

# Updates

The Update for DJS-V13 is Out! You Can use this package with djs-13 by installing djs-games@dev

# Help

Join our [Support Server](https://discord.gg/jDP2FbvCdk) for help
