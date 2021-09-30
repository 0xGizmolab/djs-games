class GTF {

    constructor(options) {
        if (!options.token) throw new TypeError('Missing argument: token')
        if (typeof options.token !== 'string') throw new TypeError('token must be in a string')
        if (!options.stopCommand) throw new TypeError('Missing argument: stopCommand')
        if (typeof options.stopCommand !== 'string') throw new TypeError('stopCommand Must be a string')
        if (!options.message) throw new TypeError('Missing argument: message')
        /*
                if (typeof options.winFooter !== 'string') throw new TypeError('embedFooter must be a string')
                if (typeof options.winColor !== 'string') throw new TypeError('embedColor must be a string')
        
                if (typeof options.lostFooter !== 'string') throw new TypeError('embedFooter must be a string')
                if (typeof options.lostColor !== 'string') throw new TypeError('embedColor must be a string')
        
                if (typeof options.questionFooter !== 'string') throw new TypeError('embedFooter must be a string')
                if (typeof options.questionColor !== 'string') throw new TypeError('embedColor must be a string')
                */
        this.message = options.message;
        this.token = options.token;
        this.winFooter = options.winFooter;
        this.winColor = options.winColor
        this.lostColor = options.lostColor;
        this.lostFooter = options.lostFooter;
        this.questionColor = options.questionColor;
        this.questionFooter = options.questionFooter;
        this.stopCommand = options.stopCommand
        this.maxAttempts = options.maxAttempts || 3;
        this.winMessage = options.winMessage || '`You Guessed It Right!`';
        this.loseMessage = options.loseMessage || 'You Lost!';
        this.wrongGuess = options.wrongGuess || 'Wrong Guess Try Again!';
        this.stopCommand = options.stopCommand || 'stop';
        this.commandName = options.commandName || 'guessTheFlag';

    }
    async start() {
        const fetch = require("node-fetch")
        const Discord = require('discord.js');
        fetch(`https://api.dagpi.xyz/data/flag`, {
            headers: {
                "Authorization": this.token
            }
        })
            .then(res => res.json())
            .then(data => {
                const que = new Discord.MessageEmbed()
                    .setTitle(`Guess the Flag!`)
                    .setColor(this.questionColor || "RANDOM")
                    .setImage(data.flag)
                    .setFooter(this.questionFooter || "Made by GizmoLab")


                const right = new Discord.MessageEmbed()
                    .setTitle(this.winMessage)
                    .setAuthor(this.message.author.tag)
                    .setColor(this.winColor || "RANDOM")
                    .setDescription(`It was ${data.Data.name.common}`)
                    .setImage(data.flag)
                    .setFooter(this.winFooter || "Made by GizmoLab")


                const wrong = new Discord.MessageEmbed()
                    .setTitle(this.loseMessage)
                    .setColor(this.lostColor || "RANDOM")
                    .setAuthor(this.message.author.tag)
                    .setDescription(`It was ${data.Data.name.common}`)
                    .setImage(data.flag)
                    .setFooter(this.lostFooter || "Made by GizmoLab")


                this.message.channel.send({ embeds: [que] })
                const gameFilter = m => m.author.id === this.message.author.id
                const gameCollector = this.message.channel.createMessageCollector({ gameFilter });
                let i = this.maxAttempts - 1;
                gameCollector.on('collect', async msg => {
                    if (msg.author.bot || msg.author.id != this.message.author.id) return
                    const selection = msg.content;
                    if (msg.author.id === this.message.author.id && selection.includes((this.commandName).toLowerCase())) {
                        this.message.channel.send({ content: `You already have one game running` })
                        return;
                    }
                    if (selection === data.Data.name.common.toLowerCase()) {
                        this.message.reply({ embeds: [right] })
                        gameCollector.stop()
                    } else if (selection === this.stopCommand) {
                        this.message.channel.send({ embeds: [wrong] })
                        gameCollector.stop();
                    } else if (i <= this.maxAttempts && selection !== data.Data.name.common && selection !== this.stopCommand && i > 0) {
                        i--;
                        this.message.channel.send({ content: `${this.wrongGuess} | You have ${i + 1} chances left | Type ${this.stopCommand} to cancel the Game` })
                    } else if (i <= 0 && selection !== data.Data.name.common) {
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

module.exports = GTF;
