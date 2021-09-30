class GTL {

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
        this.stopCommand = options.stopCommand || "stop";
        this.maxAttempts = options.maxAttempts || 3;
        this.commandName = options.commandName || 'guessTheLogo';

    }

    async start() {

        const fetch = require("node-fetch")
        const Discord = require('discord.js');
        fetch(`https://api.dagpi.xyz/data/logo`, {
            headers: {
                "Authorization": this.token
            }
        })
            .then(res => res.json())
            .then(data => {

                const que = new Discord.MessageEmbed()
                    .setTitle(`Guess the Logo!`)
                    .addField(`Clue:`, `${data.clue || `No Clue for this round`}`, true)
                    .addField(`Hint:`, `${data.hint}`)
                    .setColor(this.questionColor || "RANDOM")
                    .setImage(data.question)
                    .setFooter(this.questionFooter || "Made by GizmoLab")


                const right = new Discord.MessageEmbed()
                    .setTitle(`You Guessed It Right!`)
                    .setAuthor(this.message.author.tag)
                    .setColor(this.winColor || "RANDOM")
                    .setDescription(`It was ${data.brand}`)
                    .setImage(data.answer)
                    .setFooter(this.winFooter || "Made by GizmoLab")


                const wrong = new Discord.MessageEmbed()
                    .setTitle(`You Lost`)
                    .setColor(this.lostColor || "RANDOM")
                    .setAuthor(this.message.author.tag)
                    .setDescription(`It was ${data.brand}`)
                    .setImage(data.answer)
                    .setFooter(this.lostFooter || "Made by GizmoLab")


                this.message.channel.send({ embeds: [que] })
                // .then(() => {
                //     
                //     this.message.channel.awaitMessages({ max: this.maxAttempt })
                //         .then(collected => {
                //             console.log(collected)
                //             if (collected.first().content.toLowerCase() === this.stopCommand) {
                //                 this.message.channel.send({ embeds: [wrong] })
                //                 return;
                //             }
                //             if (collected.first().content.toLowerCase() === data.brand.toLowerCase()) {
                //                 this.message.channel.send({ embeds: [right] })
                //             } else {
                //                 this.message.channel.send({ embeds: [wrong] })
                //             }
                //         })
                //         .catch(err => {
                //             console.log(err)
                //         })
                // })
                const gameFilter = (m) => m.author.id === this.message.author.id;
                const gameCollector = this.message.channel.createMessageCollector({ gameFilter });
                let i = this.maxAttempts - 1;
                gameCollector.on('collect', async msg => {
                    if (msg.author.bot || msg.author.id != this.message.author.id) return
                    const selection = msg.content.toLowerCase();
                    if (selection === data.brand.toLowerCase()) {
                        this.message.channel.send({ embeds: [right] })
                        gameCollector.stop()
                    } else if (selection === this.stopCommand) {
                        this.message.channel.send({ embeds: [wrong] })
                        gameCollector.stop();
                    } else if (i <= this.maxAttempts && selection !== data.brand && selection !== this.stopCommand && i > 0) {
                        i--;
                        this.message.channel.send({ content: `Wrong Guess Try Again! | You have ${i + 1} chances left - Type ${this.stopCommand} to cancel the Game` })
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

module.exports = GTL;

