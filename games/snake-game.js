const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');


const WIDTH = 10;
const HEIGHT = 8;
const gameBoard = [];
const apple = { x: 1, y: 1 };

class SnakeGame {

    constructor(options) {

        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                gameBoard[y * WIDTH + x] = "⬜";
            }
        }

        if (!options.message) throw new TypeError('Missing argument: message')

        this.message = options.message;
        this.buttons = options.buttons || false;
        this.snake = options.snake || "🟩";
        this.apple = options.apple || "🍎";
        this.embedColor = options.embedColor || '#0099ff';
        this.leftButton = options.leftButton || '⬅';;
        this.rightButton = options.rightButton || '➡';
        this.upButton = options.upButton || '⬆️';
        this.downButton = options.downButton || '⬇';

    }

    start() {
        if (!this.buttons) {

            let snake = [{ x: 5, y: 5 }]
            let snakeLength = 1;
            let score = 0;

            const gameBoardTostring = () => {


                let str = ""
                for (let y = 0; y < HEIGHT; y++) {
                    for (let x = 0; x < WIDTH; x++) {
                        if (x == apple.x && y == apple.y) {
                            str += this.apple;
                            continue;
                        }

                        let flag = true;
                        for (let s = 0; s < snake.length; s++) {
                            if (x == snake[s].x && y == snake[s].y) {
                                str += this.snake;
                                flag = false;
                            }
                        }

                        if (flag)
                            str += gameBoard[y * WIDTH + x];
                    }
                    str += "\n";
                }
                return str;

            }

            const isLocInSnake = (pos) => {
                return snake.find(sPos => sPos.x == pos.x && sPos.y == pos.y)
            }

            const newAppleLoc = () => {

                let newApplePos = { x: 0, y: 0 };

                if (isLocInSnake(newApplePos)) newApplePos = { x: parseInt(Math.random() * WIDTH), y: parseInt(Math.random() * HEIGHT) };

                apple.x = newApplePos.x;
                apple.y = newApplePos.y;

            }

            const embed = new MessageEmbed()
                .setColor(this.embedColor)
                .setTitle(`Snake Game - ${this.message.author.username}`)
                .setDescription(gameBoardTostring())
                .setTimestamp();

            this.message.channel.send({ embeds: [embed] }).then(gameMessage => {
                gameMessage.react('⬅️');
                gameMessage.react('⬆️');
                gameMessage.react('⬇️');
                gameMessage.react('➡️');

                const waitForReaction = () => {

                    const filter = (reaction, user) => ["⬅️", "⬆️", "⬇️", "➡️"].includes(reaction.emoji.name) && (user.id === this.message.author.id);

                    gameMessage.awaitReactions({ filter: filter, max: 1, time: 60000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first()

                            const snakeHead = snake[0]
                            const nextPos = { x: snakeHead.x, y: snakeHead.y };

                            if (reaction.emoji.name === '⬅️') {
                                let nextX = snakeHead.x - 1;
                                if (nextX < 0)
                                    nextX = WIDTH - 1;
                                nextPos.x = nextX;
                            }
                            else if (reaction.emoji.name === '⬆️') {
                                let nextY = snakeHead.y - 1;
                                if (nextY < 0)
                                    nextY = HEIGHT - 1;
                                nextPos.y = nextY;
                            }
                            else if (reaction.emoji.name === '⬇️') {
                                let nextY = snakeHead.y + 1;
                                if (nextY >= HEIGHT)
                                    nextY = 0;
                                nextPos.y = nextY;
                            }
                            else if (reaction.emoji.name === '➡️') {
                                let nextX = snakeHead.x + 1;
                                if (nextX >= WIDTH)
                                    nextX = 0;
                                nextPos.x = nextX;
                            }

                            reaction.users.remove(reaction.users.cache.filter(user => user.id !== gameMessage.author.id).first().id).then(() => {
                                if (isLocInSnake(nextPos)) {
                                    gameOver()
                                }
                                else {
                                    snake.unshift(nextPos);
                                    if (snake.length > snakeLength)
                                        snake.pop();

                                    step();
                                }
                            });
                        })
                        .catch(collected => {
                            gameMessage.reactions.removeAll()

                            const editEmbed = new MessageEmbed()
                                .setColor(this.embedColor)
                                .setTitle(`Game Over - ${this.message.author.username}`)
                                .setDescription(`**You didn't react for a while!**\n**Total Apples Grabbed: **${score}`)
                                .setTimestamp()
                            gameMessage.edit({ embeds: [editEmbed] })
                        });
                }

                waitForReaction()

                const step = () => {

                    if (apple.x == snake[0].x && apple.y == snake[0].y) {
                        score += 1;
                        snakeLength++;
                        newAppleLoc();
                    }

                    const editEmbed = new MessageEmbed()
                        .setColor(this.embedColor)
                        .setTitle(`Snake Game - ${this.message.author.username}`)
                        .setDescription(gameBoardTostring())
                        .setTimestamp();
                    gameMessage.edit({ embeds: [editEmbed] })

                    waitForReaction()
                }

                const gameOver = () => {

                    const editEmbed = new MessageEmbed()
                        .setColor(this.embedColor)
                        .setTitle(`Game Over - ${this.message.author.username}`)
                        .setDescription(`**Total Apples Grabbed: **${score}`)
                        .setTimestamp()
                    gameMessage.edit({ embeds: [editEmbed] })

                    gameMessage.reactions.removeAll()
                }
            });
        } else {

            let snake = [{ x: 5, y: 5 }]
            let snakeLength = 1;
            let score = 0;

            const gameBoardTostring = () => {


                let str = ""
                for (let y = 0; y < HEIGHT; y++) {
                    for (let x = 0; x < WIDTH; x++) {
                        if (x == apple.x && y == apple.y) {
                            str += this.apple;
                            continue;
                        }

                        let flag = true;
                        for (let s = 0; s < snake.length; s++) {
                            if (x == snake[s].x && y == snake[s].y) {
                                str += this.snake;
                                flag = false;
                            }
                        }

                        if (flag)
                            str += gameBoard[y * WIDTH + x];
                    }
                    str += "\n";
                }
                return str;

            }

            const isLocInSnake = (pos) => {
                return snake.find(sPos => sPos.x == pos.x && sPos.y == pos.y)
            }

            const newAppleLoc = () => {

                let newApplePos = { x: 0, y: 0 };

                if (isLocInSnake(newApplePos)) newApplePos = { x: parseInt(Math.random() * WIDTH), y: parseInt(Math.random() * HEIGHT) };

                apple.x = newApplePos.x;
                apple.y = newApplePos.y;

            }

            const embed = new MessageEmbed()
                .setColor(this.embedColor)
                .setTitle(`Snake Game - ${this.message.author.username}`)
                .setDescription(gameBoardTostring())
                .setTimestamp();

            const row1 = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setStyle('SECONDARY')
                    .setLabel(`\u200b`)
                    .setCustomId('extra1')
                    .setDisabled(true),

                )
                .addComponents(new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('up')
                    .setEmoji(this.upButton)

                )
                .addComponents(new MessageButton()
                    .setStyle('SECONDARY')
                    .setLabel(`\u200b`)
                    .setCustomId('extra2')
                    .setDisabled(true),
                )

            const row2 = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setStyle('PRIMARY')
                    .setEmoji(this.leftButton)
                    .setCustomId('left'),


                )
                .addComponents(new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('down')
                    .setEmoji(this.downButton)

                )
                .addComponents(new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('right')
                    .setEmoji(this.rightButton)

                )


            this.message.channel.send({ embeds: [embed], components: [row1, row2] }).then(gameMessage => {


                const waitForReaction = () => {

                    const filter = i => {
                        return i.user.id === this.message.author.id;
                    };

                    gameMessage.awaitMessageComponent({ filter, componentType: 'BUTTON', max: 1, time: 60000, errors: ['time'] })
                        .then(interaction => {

                            const button = interaction
                            const snakeHead = snake[0]
                            const nextPos = { x: snakeHead.x, y: snakeHead.y };

                            if (button.customId === 'left') {
                                button.deferUpdate();
                                let nextX = snakeHead.x - 1;
                                if (nextX < 0)
                                    nextX = WIDTH - 1;
                                nextPos.x = nextX;
                            }
                            else if (button.customId === 'up') {
                                button.deferUpdate();
                                let nextY = snakeHead.y - 1;
                                if (nextY < 0)
                                    nextY = HEIGHT - 1;
                                nextPos.y = nextY;
                            }
                            else if (button.customId === 'down') {
                                button.deferUpdate();
                                let nextY = snakeHead.y + 1;
                                if (nextY >= HEIGHT)
                                    nextY = 0;
                                nextPos.y = nextY;
                            }
                            else if (button.customId === 'right') {
                                button.deferUpdate();
                                let nextX = snakeHead.x + 1;
                                if (nextX >= WIDTH)
                                    nextX = 0;
                                nextPos.x = nextX;
                            }


                            if (isLocInSnake(nextPos)) {
                                gameOver()
                            }
                            else {
                                snake.unshift(nextPos);
                                if (snake.length > snakeLength)
                                    snake.pop();

                                step();
                            }

                        })
                        .catch(collected => {

                            const editEmbed = new MessageEmbed()
                                .setColor(this.embedColor)
                                .setTitle(`Game Over - ${this.message.author.username}`)
                                .setDescription(`**You didn't react for a while!**\n**Total Apples Grabbed: **${score}`)
                                .setTimestamp()
                            gameMessage.edit({ embeds: [editEmbed], components: [] })
                        });
                }

                waitForReaction()

                const step = () => {

                    if (apple.x == snake[0].x && apple.y == snake[0].y) {
                        score += 1;
                        snakeLength++;
                        newAppleLoc();
                    }

                    const editEmbed = new MessageEmbed()
                        .setColor(this.embedColor)
                        .setTitle(`Snake Game - ${this.message.author.username}`)
                        .setDescription(gameBoardTostring())
                        .setTimestamp();
                    gameMessage.edit({ embeds: [editEmbed], components: [row1, row2] })

                    waitForReaction()
                }

                const gameOver = () => {

                    const editEmbed = new MessageEmbed()
                        .setColor(this.embedColor)
                        .setTitle(`Game Over - ${this.message.author.username}`)
                        .setDescription(`**Total Apples Grabbed: **${score}`)
                        .setTimestamp()
                    gameMessage.edit({ embeds: [editEmbed], components: [] })


                }
            });
        }
    }
}

module.exports = SnakeGame;
