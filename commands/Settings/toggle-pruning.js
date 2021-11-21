const {
    MessageEmbed
  } = require("discord.js");
  const config = require("../../botconfig/config.json");
  const ee = require("../../botconfig/embed.json");
  const emoji = require("../../botconfig/emojis.json");

  const noprem = new MessageEmbed()
.setColor("#303037")
.setTitle(`${emoji.msg.prem} | Premium Only Command`)
.setDescription(`This Is A Premium Only Command Dm Owner To Buy [ \[ Free For Now \] ](${config.links.server})`)
.setFooter(ee.footertext, ee.footericon)

const premiumGuildSchema = require("../../models/premium-guild")

  module.exports = {
    name: "toggle-pruning",
    aliases: ["tp", "autodelete"],
    category: "Settings",
    premium: true,
    description: "Toggles pruning. If its true a message of playing a new track will be sent, even if your afk. If false it wont send any message if a new Track plays! | Default: true aka send new Track information",
    usage: "toggle-np",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, guildData, player, prefix) => {
      try {

        premiumGuildSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) { 
    
        message.reply({embeds: [noprem]}) 
      
      } else {
         //set the new prefix
        guildData.announce = !guildData.announce
        guildData.save()
        //return success embed
        const tt = new MessageEmbed()
        .setColor("#00fefc")
        .setDescription(`${guildData.announce ? emoji.msg.SUCCESS : emoji.msg.SUCCESS} Announcing of tracks is now **${guildData.announce ? `Enabled` : `Disabled`}**`)
        return message.channel.send({embeds: [tt]});
      }
  })

        

       
      } catch (e) {
        console.log(String(e.stack).bgRed)
        const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``);
        return message.channel.send({embeds: [emesdf]});
      }
    }
  };