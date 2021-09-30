<p align="center">
   <img src="https://img.shields.io/npm/dt/djs-games?style=for-the-badge">
   <img src="https://img.shields.io/npm/v/djs-games?style=for-the-badge">
   <img src="https://img.shields.io/github/license/gizmolabAI/djs-games.svg?style=for-the-badge">
</p>   

<!-- PROJECT LOGO -->
<br />
<p align="center">

<p align="center"><a href="https://docs.gizmolab.xyz/"><img align="center" style="width:0.5px" src="https://cdn.discordapp.com/attachments/851000698740277330/893173867852484638/DJS-GAMES.png"/></a></p><br/>

  <p align="center">
    <strong>A discord.js Games Package with Who's that Pokemon, ConnectFour, Snake, rock paper scissors, guessTheNumber, , guess the Logo , Guess The Flag, tictactoe , fast type, Hangman and More!</strong>
    <br />
    <a href="https://docs.gizmolab.xyz"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/GizmolabAI/djs-games/issues">Report Bug</a>
    ·
    <a href="https://discord.gg/jDP2FbvCdk">Discord</a>
  </p>
</p>


# About
- A discord.js Games Package with Who's that Pokemon, ConnectFour, Snake, rock paper scissors, guessTheNumber, , guess the Logo , Guess The Flag, tictactoe , fast type, Hangman and More!
- Join our [Support Server](https://discord.gg/jDP2FbvCdk) for help

# Installation

```npm i djs-games```

# Example usage

```
USE ACCORDING TO YOUR COMMAND HANDLER
```

**Who's That Pokemon**
=== 

```js
const { Pokemon } = require('djs-games')
const game = new Pokemon({
  message: message,
  token: 'dagpi-token-here', // Get Your Api Token at https://dagpi.xyz/dashboard
  winMessage: 'You Win!',
  loseMessage: 'You Lose!',
  wrongGuess: 'Wrong Guess!',
  stopCommand = 'stop',
  maxAttempts: 10,
})
game.start()
```

**Guess The Logo**
=== 

```js
const { GTL } = require('djs-games')
const game = new GTL({
  message: message,
  token: 'dagpi-token-here', // *Required!! Get Your Api Token at https://dagpi.xyz/dashboard
  stopCommand: 'stop', // *Required!!
  winFooter: 'You Win!', // Set The Footer of the win message
  winColor: 'GREEN', // The embed color of the win message
  loseFooter: 'You Lose!', // Set The Footer of the lose message
  loseColor: 'RED', // The embed color of the lose message
  questionFooter: 'Guess the Logo!', // Set The Footer of the question message
  questionColor: 'BLUE', // The embed color of the question message
  maxAttempts: 5, //
})
game.start()
```
**Guess The Flag**
=== 

```js
const { GTF } = require('djs-games')
const game = new GTF({
  message: message,
  token: 'dagpi-token-here', // *Required!! Get Your Api Token at https://dagpi.xyz/dashboard
  stopCommand: 'stop', // *Required!!
  winFooter: 'You Win!', // Set The Footer of the win message
  winColor: 'GREEN', // The embed color of the win message
  loseFooter: 'You Lose!', // Set The Footer of the lose message
  loseColor: 'RED', // The embed color of the lose message
  questionFooter: 'Guess the Flag!', // Set The Footer of the question message
  questionColor: 'BLUE', // The embed color of the question message
  winMessage: 'You Win!', // Set The Win Message
  loseMessage: 'You Lose!', // Set The Lose Message
  maxAttempts: 5, //
  wrongGuess: 'Wrong Guess!', // Set The Wrong Guess Message
})
game.start()
```

**Tic Tac Toe**
=== 
```js
const { TicTacToe } = require('djs-games')
const game = new TicTacToe({
  message: message,
  xEmote: '❌', // The Emote for X
  oEmote: '0️⃣', // The Emote for O
  xColor: 'PRIMARY',
  oColor: 'PRIMARY', // The Color for O
  embedDescription: 'Tic Tac Toe', // The Description of the embed
})
game.start()
```

**ConnectFour**
===
```js
const { ConnectFour } = require('djs-games')
const game = new ConnectFour({
  message: message,
  player1: '🔴',
  player2: '🟡',
})
game.start()
```

**SNAKE**
===

```js
const { Snake } = require('djs-games')
const game = new Snake({
  message: message,
  buttons: true, // If you want to use buttons || False if you want to use reactions
  snake: '🟩',
  apple: '🍎',
  embedColor: 'RANDOM',
  leftButton: '◀',
  rightButton: '▶',
  upButton: '▲',
  downButton: '▼',
})
game.start()
```

**RockPaperScissors**
===
```js
const { RockPaperScissors } = require('djs-games')
const game = new RockPaperScissors({
  message: message,
})
game.start()
```

## Docs
Checkout the [docs](https://docs.gizmolab.xyz) for more information on the games and how to use them.


# Feature Requests

If you have any feature requests, please open an issue on [GitHub](https://github.com/GizmolabAI/djs-games)

# Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


# Help

Join Our Discord Server for help related to our projects or programming in General.

[![Support Server](https://img.shields.io/discord/834390097621286922.svg?label=Discord&logo=Discord&colorB=7289da&style=for-the-badge)](https://discord.gg/jDP2FbvCdk)

# Buy us a coffee

<a href="https://www.buymeacoffee.com/g1zmo">
  <img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg" />
</a>


