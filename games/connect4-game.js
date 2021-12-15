const { MessageEmbed } = require("discord.js")

class ConnectFour {

    constructor(options) {
        if(options.slash) {
            if(!options.interaction) throw new TypeError("[djs-games] Interaction is not defined.")

            this.message = options.interaction
        } else {
            if(!options.message) throw new TypeError("[djs-games] Message is not defined.")

            this.message = options.message
        }
        this.player1 = options.player1 || '🔴'
        this.player2 = options.player2 || '🟡'
        this.embed = options.embed ? options.embed : {}
        this.opponent = options.opponent ? options.opponent : options.message.mentions.users.first()
        this.slash = options.slash ? options.slash : false
        this.opponent = options.opponent ? options.opponent : options?.message?.mentions?.users?.first()
      
    }

    start() {

      let challenger;
      let oppenent;
      
      if(this.slash) {
        challenger = this.message.user
        oppenent = this.message.member.guild.members.cache.get(this.opponent).user
        this.message.reply("Game Started.")
      } else {
        challenger = this.message.author
        oppenent = this.opponent
      }
      
        if (!oppenent) return this.message.channel.send(`**Opponent  is required option.**`)

      const board = [
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
        ];

      const renderBoard = (board) => {
            let tempString = "";
            for (const boardSection of board) {
                tempString += `${boardSection.join("")}\n`;
            }

            tempString = tempString.concat("1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣");
            return tempString;
        }

        const initialState = renderBoard(board);

      this.embed = new MessageEmbed()
      .setTitle(this.embed.title ? this.embed.title : "C4 Game-")
      .setDescription(initialState)
      .setFooter(this.embed.footer ? this.embed.footer : `${challenger?.username} v/s ${oppenent?.username}`)
      .setColor(this.embed.color ? this.embed.color : "RANDOM")

      this.message.channel.send({ embeds: [this.embed] }).then(gameMessage => {

            gameMessage.react("1️⃣")
            gameMessage.react("2️⃣")
            gameMessage.react("3️⃣")
            gameMessage.react("4️⃣")
            gameMessage.react("5️⃣")
            gameMessage.react("6️⃣")
            gameMessage.react("7️⃣")

            const gameFilter = (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].includes(reaction.emoji.name) && (user.id === oppenent.id || user.id === challenger.id);

            const gameCollector = gameMessage.createReactionCollector({ filter: gameFilter });

            const gameData = [
                { member: challenger, playerColor: this.player1 },
                { member: oppenent, playerColor: this.player2 }
            ]

            let player = 0;

            const checkFour = (a, b, c, d) => (a === b) && (b === c) && (c === d) && (a !== "⚪");

            const horizontalCheck = () => {

                for (let i = 0; i < 6; i++) {

                    for (let j = 0; j < 4; j++) {
                        if (checkFour(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) return [
                            board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]
                        ];
                    }
                }
            }

            const verticalCheck = () => {
                for (let j = 0; j < 7; j++) {
                    for (let i = 0; i < 3; i++) {

                        if (checkFour(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) return [
                            board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j]
                        ]
                    }
                }
            }

            const diagonal1 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 0; row < 3; row++) {
                        if (checkFour(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])) return [
                            board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]
                        ]
                    }
                }
            }

            const diagonal2 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 5; row > 2; row--) {
                        if (checkFour(board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3])) return [
                            board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]
                        ]
                    }
                }
            }

            const tieCheck = () => {
                let count = 0;
                for (const el of board) {
                    for (const string of el) {
                        if (string !== "⚪") count++;
                    }
                }
                if (count === 42) return true;
                else return false;
            }

            const checks = [horizontalCheck, verticalCheck, diagonal1, diagonal2];

            gameCollector.on("collect", (reaction, user) => {

                reaction.message.reactions.cache.get(reaction.emoji.name).users.remove(user.id);

                if (user.id === gameData[player].member.id) {

                    const openSpaces = [];

                    switch (reaction.emoji.name) {
                        case "1️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][0] === "⚪") openSpaces.push({ i, j: 0 });
                            }
                            if (openSpaces.length == 0) return this.message.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "2️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][1] === "⚪") openSpaces.push({ i, j: 1 });
                            }
                            if (openSpaces.length == 0) return this.message.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "3️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][2] === "⚪") openSpaces.push({ i, j: 2 });
                            }
                            if (openSpaces.length == 0) return this.message.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "4️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][3] === "⚪") openSpaces.push({ i, j: 3 });
                            }
                            if (openSpaces.length == 0) return this.message.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "5️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][4] === "⚪") openSpaces.push({ i, j: 4 });
                            }
                            if (openSpaces.length == 0) return this.message.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "6️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][5] === "⚪") openSpaces.push({ i, j: 5 });
                            }
                            if (openSpaces.length == 0) return this.message.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                        case "7️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][6] === "⚪") openSpaces.push({ i, j: 6 });
                            }
                            if (openSpaces.length == 0) return this.message.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            break;
                    }

                    if (tieCheck()) {
                        gameMessage.reactions.removeAll()
                            this.embed.setTitle(`The game ended, it is a Tie!`)
                            this.embed.setDescription(renderBoard(board))
                        gameCollector.stop("Tie Game")
                        return gameMessage.edit({ embeds: [TieEmbed] })
                    }

                    for (const func of checks) {

                        const data = func();
                        if (data) {
                            gameMessage.reactions.removeAll()
                                this.embed.setTitle(`${gameData[player].member.username} has won the game!`)
                                this.embed.setDescription(renderBoard(board))
                            gameCollector.stop(`${gameData[player].member.id} won`);
                            return gameMessage.edit({ embeds: [this.embed] })
                        }
                    }

                    player = (player + 1) % 2;
                        this.embed.setTitle(`${gameData[player].playerColor} -  It's your turn, ${gameData[player].member.username}!`)
                        this.embed.setDescription(renderBoard(board))
                  
                    gameMessage.edit({ embeds: [this.embed] });
                }
            })
        })

    }
}
module.exports = ConnectFour
