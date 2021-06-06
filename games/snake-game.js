const Discord = require('discord.js');

const WIDTH = 10;
const HEIGHT = 8;
const gameBoard = [];
const apple = { x: 1, y: 1 };

class SnakeGame {

    constructor() {

        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                gameBoard[y * WIDTH + x] = "⬜";
            }
        }

    }

    startGame(msg) {

        let snake = [{ x: 5, y: 5 }]
        let snakeLength = 1;
        let score = 0;

        const gameBoardTostring = () => {

            let str = ""
            for (let y = 0; y < HEIGHT; y++) {
                for (let x = 0; x < WIDTH; x++) {
                    if (x == apple.x && y == apple.y) {
                        str += "🍎";
                        continue;
                    }
    
                    let flag = true;
                    for (let s = 0; s < snake.length; s++) {
                        if (x == snake[s].x && y == snake[s].y) {
                            str += "🟩";
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

            if(isLocInSnake(newApplePos)) newApplePos = { x: parseInt(Math.random() * WIDTH), y: parseInt(Math.random() * HEIGHT) };

            apple.x = newApplePos.x;
            apple.y = newApplePos.y;

        }

        const embed = new Discord.MessageEmbed()
        .setColor('#03ad03')
        .setTitle(`Snake Game - ${msg.author.username}`)
        .setDescription(gameBoardTostring())
        .setTimestamp();

        msg.channel.send(embed).then(gameMessage => {
            gameMessage.react('⬅️');
            gameMessage.react('⬆️');
            gameMessage.react('⬇️');
            gameMessage.react('➡️');

            const waitForReaction = () => {

                const filter = (reaction, user) => ["⬅️", "⬆️", "⬇️", "➡️"].includes(reaction.emoji.name) && (user.id === msg.author.id);

                gameMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
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

                const editEmbed = new Discord.MessageEmbed()
                .setColor("#03ad03")
                .setTitle(`Game Over - ${msg.author.username}`)
                .setDescription(`**You didn't react for a while!**
                **Total Apples Grabbed: **${score}`)
                .setTimestamp()
                gameMessage.edit(editEmbed)
            });
            }

            waitForReaction()

            const step = () => {

                if(apple.x == snake[0].x && apple.y == snake[0].y) {
                    score += 1;
                    snakeLength++;
                    newAppleLoc();
                }
    
                const editEmbed = new Discord.MessageEmbed()
                .setColor("#03ad03")
                .setTitle(`Snake Game - ${msg.author.username}`)
                .setDescription(gameBoardTostring())
                .setTimestamp();
                gameMessage.edit(editEmbed)

                waitForReaction()
            }

            const gameOver = () => {

                const editEmbed = new Discord.MessageEmbed()
                .setColor("#03ad03")
                .setTitle(`Game Over - ${msg.author.username}`)
                .setDescription(`**Total Apples Grabbed: **${score}`)
                .setTimestamp()
                gameMessage.edit(editEmbed)

                gameMessage.reactions.removeAll()
            }
    });
    }

}

module.exports = SnakeGame;