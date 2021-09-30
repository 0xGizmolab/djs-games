class Pokemon {
    /**
     * @name ShuffleGuess
     * @kind constructor
     * @param {Object} options options
     * @param {any} [options.message] message
     * @param {any} [options.token] token
     * @param {any} [options.winMessage] win message
     * @param {any} [options.loseMessage] lose message
     * @param {any} [options.embedColor] embedcolor
     * @param {any} [options.stopCommand] stop command
     * @param {any} [options.wrongGuess] wrong guess
     * @param {any} [options.maxAttempts] max attempts
      */
    constructor(options) {
        if (!options.token) throw new TypeError('Missing argument: token')
        if (typeof options.token !== 'string') throw new TypeError('token must be in a string')

        if (!options.message) throw new TypeError('Missing argument: message')

        this.message = options.message;
        this.winMessage = options.winMessage || '`You Guessed It Right!`';
        this.loseMessage = options.loseMessage || 'You Lost!';
        this.wrongGuess = options.wrongGuess || 'Wrong Guess Try Again!';
        this.token = options.token;
        this.embedColor = options.embedColor || '#0099ff';
        this.stopCommand = options.stopCommand || 'stop';
        this.maxAttempts = options.maxAttempts || 3;

    }
    async start() {
        const fetch = require("node-fetch")
        const Discord = require('discord.js');
        fetch(`https://api.dagpi.xyz/data/wtp`, {
            headers: {
                "Authorization": this.token
            }
        })
            .then(res => res.json())
            .then(data => {

                const pok = new Discord.MessageEmbed()
                    .setTitle(`Who's That Pokemon?`)
                    .addField(`Type:`, `${data.Data.Type}`, true)
                    .addField(`Abilities:`, `${data.Data.abilities}`)
                    .setImage(data.question)
                    .setColor(this.embedColor)
                    .setFooter(`You have Unlimited Chances! Type stop to stop the game`)

                const right = new Discord.MessageEmbed()
                    .setTitle(this.winMessage)
                    .setAuthor(this.message.author.tag)
                    .setURL(data.Data.Link)
                    .setDescription(`It was ${data.Data.name}`)
                    .setColor(this.embedColor)
                    .setImage(data.answer)


                const wrong = new Discord.MessageEmbed()
                    .setTitle(this.loseMessage)
                    .setAuthor(this.message.author.tag)
                    .setURL(data.Data.Link)
                    .setDescription(`It was ${data.Data.name}`)
                    .setColor(this.embedColor)
                    .setImage(data.answer)


                this.message.channel.send({ embeds: [pok] })
                const gameFilter = m => m.author.id === this.message.author.id
                const gameCollector = this.message.channel.createMessageCollector({ gameFilter });
                let i = this.maxAttempts - 1;
                gameCollector.on('collect', async msg => {
                    if (msg.author.bot) return
                    const selection = msg.content.toLowerCase();
                    if (selection === data.Data.name.toLowerCase()) {
                        this.message.channel.send({ embeds: [right] })
                        gameCollector.stop()
                    } else if (selection === this.stopCommand) {
                        this.message.channel.send({ embeds: [wrong] })
                        gameCollector.stop();
                    } else if (i <= this.maxAttempts && selection !== data.Data.name && selection !== this.stopCommand && i > 0) {
                        i--;
                        this.message.channel.send(`${this.wrongGuess} | You have ${i + 1} chances left | Type ${this.stopCommand} to cancel the Game`)
                    } else if (i <= 0 && selection !== data.brand) {
                        this.message.channel.send({ embeds: [wrong] })
                        gameCollector.stop();
                    }
                })

            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = Pokemon;
