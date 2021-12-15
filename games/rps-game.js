const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

class RockPaperScissors {

    constructor(options) {
        
        if(options.slash) {
            
            if(!options.interaction) throw new TypeError("[djs-games] Interaction is not defined.")

            this.message = options.interaction
        } else {
            
            if(!options.message) throw new TypeError("[djs-games] Message is not defined.")

            this.message = options.message
        }
        this.winMessage = options.Winmessage ? options.winMessage : "{winner} is the winner!"
        this.AI = options.AI ? options.AI : true
        this.opponent = options.opponent
        this.tieMessage = options.tieMessage ? options.tieMessage : "Its a tie." 
        this.timeOutMessage = options.timeOutMessage ? options.timeOutMessage : "Times Up!"
        this.rock = options.rock ? options.rock : "🪨"
        this.paper = options.paper ? options.paper : "🧻"
        this.scissor = options.scissor ? options.scissor : "✂️"
        this.slash = options.slash ? options.slash : false
        this.embed = options.embed ? options.embed : {}

            }

  async start() {
    let player1Choosed;
    let player2Choosed;
    let winner;      
    
    let button1 = new MessageButton()
    .setLabel(this.rock)
    .setCustomId("rock")
    .setStyle("PRIMARY")

    let button2 = new MessageButton()
    .setLabel(this.paper)
    .setCustomId("paper")
    .setStyle("PRIMARY")

    let button3 = new MessageButton()
    .setLabel(this.scissor)
    .setCustomId("scissors")
    .setStyle("PRIMARY")

    const row = new MessageActionRow().addComponents(button1, button2, button3)

    if(!this.opponent && !this.AI) return this.message.reply("Mention the user you want to play with. ")


    if(!this.opponent && this.AI) {

        if(this.slash) {
           this.player = this.message.user
            this.message.reply("Game Started!")
        } else {
           this.player = this.message.author
        }

      this.embed = new MessageEmbed()
        .setTitle(this.embed.title ? this.embed.title : `${this.player.username} v/s AI`)
        .setDescription(this.embed.description ? this.embed.description : "Game Started!")
        .setColor(this.embed.color ? this.embed.color : "RANDOM")
        .setFooter(this.embed.footer ? this.embed.footer : "djs-games")
        .setTimestamp()

      let msg = await this.message.channel.send({ embeds: [this.embed], components: [row]})

      
      let filter = i => {return i.user.id === this.player.id}

      msg.awaitMessageComponent({filter, componentType: "BUTTON" , time: 60000, max: 1, errors: ["time"]}).then(interaction => {
        let player1Choosed = interaction.customId
          
        let botChoosed = ["rock", "paper", "scissors"]

         player2Choosed = botChoosed[Math.floor(Math.random() * botChoosed.length)]
           
        if(player1Choosed === "rock" && player2Choosed === "scissors"){
          winner = this.player.id
        }
        if(player1Choosed === "scissors" && player2Choosed === "paper"){
          winner = this.player.id
        }
        if(player1Choosed === "paper" && player2Choosed === "rock"){
          winner = this.player.id
        }
        if(player1Choosed === "paper" && player2Choosed === "scissors"){
          winner = "AI"
        }
        if(player1Choosed === "scissors" && player2Choosed === "rock"){
          winner = "AI"
        }
        if(player1Choosed === "rock" && player2Choosed === "paper"){
          winner = "AI"
        }

        if(winner === "AI"){
          interaction.reply(this.winMessage.replace("{winner}", "AI"))
            
       this.embed.setDescription(`Your Answer: ${player1Choosed}\nAI: ${player2Choosed}\n\nWinner: AI`)
                                 
         msg.edit({embeds: [this.embed], components: []})
          
        } else if(winner === this.player.id){
          interaction.reply(this.winMessage.replace("{winner}", this.player.username))

                            this.embed.setDescription(`Your Answer: ${player1Choosed}\nAI: ${player2Choosed}\n\nWinner: ${this.player.username}`)

            msg.edit({embeds: [embed], components: []})
          
        } else {
          interaction.reply(this.tieMessage)
            
        this.embed.setDescription(`Your Answer: ${player1Choosed}\nAI: ${player2Choosed}\n\nWinner: NoOne`)

            msg.edit({embeds: [this.embed], 
components: []})
        }
        
      }).catch((e) => {
        this.message.channel.send(this.timeOutMessage)
        console.log(e)
      })
    } else if(this.opponent){

        if(this.slash) {
           this.player = this.message.user
            this.message.reply("Game Started!")
            this.opp = this.opponent.user
        } else {
           this.player = this.message.author
           this.opp = this.message.guild.members.cache.get(this.opponent?.user ? this.opponent.user.id : this.opponent.author.id).user
        }
              
       this.embed = new MessageEmbed()
        .setTitle(this.embed.title ? this.embed.title : `${this.player.username} v/s ${this.opp.username}`)
        .setDescription(this.embed.description ? this.embed.description : "Game Started!")
        .setColor(this.embed.color ? this.embed.color : "RANDOM")
        .setFooter(this.embed.footer ? this.embed.footer : "djs-games")
        .setTimestamp()

      let msg = await this.message.channel.send({ embeds: [this.embed], components: [row]})

      const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

      collector.on('collect', i => {
	if (i.user.id === this.player.id || i.user.id === this.opp.id) {

     if(i.user.id === this.player.id){
       if(player1Choosed) return i.reply({content: "You have already chosen your answer.", ephemeral: true})
       
       player1Choosed = i.customId 
       i.reply({content: `You choosed ${i.customId} `, ephemeral: true})
     } else {
       if(player2Choosed) return i.reply({content: "You have already chosen your answer.", ephemeral: true})
       
       player2Choosed = i.customId
      i.reply({content: `You choosed ${i.customId}`, ephemeral: true})
     }

    if(player1Choosed && player2Choosed){
      if(player1Choosed === "rock" && player2Choosed === "scissors"){
          winner = this.player.id
        }
        if(player1Choosed === "scissors" && player2Choosed === "paper"){
          winner = this.player.id
        }
        if(player1Choosed === "paper" && player2Choosed === "rock"){
          winner = this.player.id
        }
        if(player1Choosed === "paper" && player2Choosed === "scissors"){
          winner = this.opp.id
        }
        if(player1Choosed === "scissors" && player2Choosed === "rock"){
          winner = this.opp.id
        }
        if(player1Choosed === "rock" && player2Choosed === "paper"){
          winner = this.opp.id
        }

        if(winner === this.opp.id){
        
            msg.reply(this.winMessage.replace("{winner}", this.opp.username))
            
          this.embed.setDescription( `${this.player.username}'s Answer: ${player1Choosed}\n${this.opp.username}'s Answer: ${player2Choosed}\n\nWinner: ${this.opp.username}`)
          
          msg.edit({embeds: [this.embed], components: []})
          
        } else if(winner === this.player.id){
          msg.reply(this.winMessage.replace("{winner}", this.player.username))
            
          this.embed.setDescription(`${this.player.username}'s Answer: ${player1Choosed}\n${this.opp.username}'s Answer: ${player2Choosed}\n\nWinner: ${this.player.username}`)

            msg.edit({embeds: [this.embed], components: []})
          
        } else {
          msg.reply(this.tieMessage)
            
          this.embed.setDescription( `${this.player.username}'s Answer: ${player1Choosed}\n${this.opp.username}'s Answer: ${player2Choosed}\n\nWinner: NoOne`)
          
          msg.edit({embeds: [this.embed ], components: []})
        }
    }
	} else {
		i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
	}
});

collector.on('end', collected => {
	    this.embed.setDescription("Game Ended!")
	    
	    msg.edit({embeds: [this.embed ], components: []})
     })
    
  }
    
 }
}

module.exports = RockPaperScissors
