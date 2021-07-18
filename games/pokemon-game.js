class Pokemon {
    
    
    constructor(options) {
        if(!options.token) throw new TypeError('Missing argument: token')
        if(typeof options.token !== 'string') throw new TypeError('token must be in a string')
      
        if(!options.message) throw new TypeError('Missing argument: message')
    
        this.message = options.message;
        this.token = options.token;
      
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
    .addField(`Type:`,`${data.Data.Type}`, true)
    .addField(`Abilities:`, `${data.Data.abilities}`)
    .setImage(data.question)
    .setFooter(`You have Unlimited Chances! Type stop to stop the game`)

    const right = new Discord.MessageEmbed()
    .setTitle(`You Guessed It Right!`)
    .setAuthor(this.message.author.tag)
    .setURL(data.Data.Link)
    .setDescription(`It was ${data.Data.name}`)
    .setImage(data.answer)
   

    const wrong = new Discord.MessageEmbed()
    .setTitle(`You Lost`)
    .setAuthor(this.message.author.tag)
    .setURL(data.Data.Link)
    .setDescription(`It was ${data.Data.name}`)
    .setImage(data.answer)
    

    this.message.channel.send(pok)
    const gameFilter = m => m.author.id
    const gameCollector = this.message.channel.createMessageCollector(gameFilter);

    gameCollector.on('collect', async msg => {
      if(msg.author.bot) return
          const selection = msg.content.toLowerCase();
if (selection === data.Data.name.toLowerCase()) {
this.message.reply(right)
gameCollector.stop()
          }else if (selection === "stop") {
            this.message.channel.send(wrong)
            gameCollector.stop();
          } else if (selection !== data.Data.name ) {
            this.message.channel.send(`Wrong Guess Try Again! - Type stop to cancel the Game`)
          }
    })
    
})
}
}

module.exports = Pokemon;
