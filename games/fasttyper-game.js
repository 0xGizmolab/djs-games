const { MessageEmbed } = require("discord.js")
const randomWords = require("random-words")

class fastTyper {
    constructor(options) {
        if(options.slash) {
            if(!options.interaction) throw new TypeError("[djs-games] Interaction is not defined.")

            this.message = options.interaction
        } else {
            if(!options.message) throw new TypeError("[djs-games] Message is not defined.")

            this.message = options.message
        }

        this.embed = options.embed ? options.embed : {}
        this.timeOut = options.timeout ? options.timeout : 30000
        this.stopMessage = options.stopMessage ? options.stopMessage : "Game stopped"
        this.loseMessage = options.loseMessage ? options.loseMessage : "You Lose :()) : points: {points}"
        this.winMessage = options.winMessage ? options.winMessage : "Youuuuu Woooon : {level} : points = {points}"
        this.slash = options.slash ? options.slash : false
        this.maxTime = options.maxTime ? options.maxTime : 60000
        this.words = ""
    }

    async start() {
        let level = 1;
        let points = 0;
        let player;

        if(this.slash) {
            player = this.message.user
        } else {
            player = this.message.author
        }
            
        this.embed = new MessageEmbed()
        .setTitle(this.embed.title ? this.embed.title : "FastType -")
        .setColor(this.embed.color ? this.embed.color : "RANDOM")
        .setFooter(this.embed.footer ? this.embed.footer : "djs-games")
        .setTimestamp()
        .setDescription("Game will start in 5sec...")

        this.msg = await this.message.reply({embeds: [this.embed]})

        await sleep(5000)

        this.words = randomWords(level)

        this.embed.setDescription(`Type:\n\n> ${this.words.join(", ")}`)

        this.msg.reply({embeds: [this.embed]})
                let filter = m => m.author.id === player.id

        this.collector = this.message.channel.createMessageCollector({filter, time: this.maxTime})
                this.collector.on("collect", async m => {
            if(m.content === "stop") {
                return this.collector.stop()
            }

            

            if(m.content === this.words.join(" ")) {
                level++


                points++
                m.reply(this.winMessage.replace("{level}", level).replace("{points}", points))
            } else {
                m.reply(this.loseMessage.replace("{level}", level).replace("{points}", points))
                level++            }

            this.words = randomWords(level)

            this.embed.setDescription(`Type:\n\n> ${this.words.join(", ")}`)

        this.msg.reply({embeds: [this.embed]})
        })

        this.collector.on("end", () => {
            this.msg.reply(this.stopMessage.replace("{level}", level).replace("{points}", 
points))
        })   
    }
}
        
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = fastTyper 
