const { random } = require("random-unicode-emoji")
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

let emojiChoosen;

class FindEmoji {
  constructor(options) {
    if (!options.message) throw new TypeError('Missing argument: message')

    if (typeof options.timeoutTime !== 'number') throw new TypeError('Error: timeoutTime must be a number')

    this.message = options.message
    this.winMessage = options.winMessage ? options.winMessage : "WoW! You won."
    this.loseMessage = options.loseMessage ? options.loseMessage : "Oops! thats wrong."
    this.timeOutMessage = options.timeOutMessage ? options.timeOutMessage : "Timeout :()"
    this.timeoutTime = options.timeoutTime ? options.timeoutTime : 60000
    this.emojiUsed = []
  }

  //Start Game

  async start() {

    let buttons = createButtons(this.emojiUsed)

    let msg = await this.message.channel.send({
      content: "Here's your board I  will edit the buttons after 5 sec...", components: [
        {
          type: 1,
          components: [
            buttons[0],
            buttons[1],
            buttons[2]
          ]
        },
        {
          type: 1,
          components: [
            buttons[3],
            buttons[4],
            buttons[5],
          ]
        },
        {
          type: 1,
          components: [
            buttons[6],
            buttons[7],
            buttons[8]
          ]
        }
      ]
    })


    setTimeout(async () => {
      await editButtons(msg, this.message, this.winMessage, this.loseMessage, this.timeOutMessage, this.emojiUsed)
    }, 5000)
  }
}

function createButtons(emojiUsed) {
  let buttons = []

  for (let i = 0; i < 9; i++) {
    let emoji = random({ count: 1 })
    emojiUsed.push(emoji)

    const button = new MessageButton()
      .setLabel(`${emoji}`)
      .setCustomId(`${emoji}`)
      .setStyle("PRIMARY")

    buttons.push(button)
  }

  return buttons;
}

async function editButtons(msg, message, winMessage, loseMessage, timeOutMessage, emojiUsed) {
  const buttons = []

  msg.components.map(c => {
    c.components.map(c => {
      c.label = "~"

      buttons.push(c)
    })
  })

  let emoji = emojiUsed[Math.floor(Math.random() * emojiUsed.length)]

  emojiChoosen = emoji

  await msg.edit({
    content: `Find \\${emoji} | Before the Time Runs Out`, components: [
      {
        type: 1,
        components: [
          buttons[0],
          buttons[1],
          buttons[2]
        ]
      },
      {
        type: 1,
        components: [
          buttons[3],
          buttons[4],
          buttons[5],
        ]
      },
      {
        type: 1,
        components: [
          buttons[6],
          buttons[7],
          buttons[8]
        ]
      }
    ]
  })

  await handleGame(msg, message, winMessage, loseMessage, timeOutMessage)
}

async function handleGame(msg, message, winMessage, loseMessage, timeOutMessage) {

  const filter = i => {
    return i.user.id === message.author.id
  }

  msg.awaitMessageComponent({ filter, componentType: 'BUTTON', time: this.timeoutTime })
    .then(interaction => {
      if (interaction.customId === `${emojiChoosen}`) {
        const buttons = []

        msg.components.map(c => {
          c.components.map(c => {
            if (c.customId === interaction.customId && c.customId === `${emojiChoosen}`) {
              c.style = "SUCCESS"
            }

            c.label = c.customId

            buttons.push(c)
          })
        })

        msg.edit({
          components: [
            {
              type: 1,
              components: [
                buttons[0],
                buttons[1],
                buttons[2]
              ]
            },
            {
              type: 1,
              components: [
                buttons[3],
                buttons[4],
                buttons[5],
              ]
            },
            {
              type: 1,
              components: [
                buttons[6],
                buttons[7],
                buttons[8]
              ]
            }
          ]
        })

        interaction.reply(winMessage)
      } else {
        const buttons = []

        msg.components.map(c => {
          c.components.map(c => {
            if (c.customId === interaction.customId) {
              c.style = "DANGER"
            }

            c.label = c.customId

            buttons.push(c)
          })
        })

        msg.edit({
          components: [
            {
              type: 1,
              components: [
                buttons[0],
                buttons[1],
                buttons[2]
              ]
            },
            {
              type: 1,
              components: [
                buttons[3],
                buttons[4],
                buttons[5],
              ]
            },
            {
              type: 1,
              components: [
                buttons[6],
                buttons[7],
                buttons[8]
              ]
            }
          ]
        })

        interaction.reply(loseMessage)
      }
    })
    .catch(err => {
      msg.edit({
        content: timeOutMessage,
        components: []
      })
    })
}


module.exports = FindEmoji
