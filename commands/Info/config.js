const {
    MessageEmbed
  } = require("discord.js");
  const config = require("../../botconfig/config.json");
  const ee = require("../../botconfig/embed.json");
  const emoji = require("../../botconfig/emojis.json");
  module.exports = {
    name: "config",
    category: "Info",
    aliases: ["musicsettings"],
    cooldown: 10,
    usage: "settings",
    description: "Shows you the current settings, like Premium, which commands are on DJ ONLY, the DJ ROLES and BOT CHANNELS ....",
    run: async (client, message, args, guildData, player, prefix) => {
      try {

        const premiumGuildSchema = require("../../models/premium-guild")

        let data = premiumGuildSchema.findOne({ Guild: message.guild.id })





        //these lines creates the string for all botchannels
    const embed = new MessageEmbed()
      .setAuthor(message.guild.name + " Settings", message.guild.iconURL())
      embed.setColor("#00fefc")
      .setFooter(ee.footertext, ee.footericon);
  
    // Guild prefix
    embed.addField("Server Prefix", `\`${prefix}\``, true);
  
    // DJJRoles
        embed.addField(`${emoji.msg.dj} DJ Role(s)`,
        (guildData.djRoles.length > 0) ? guildData.djRoles.map((ch) => `<@&${ch}>`).join(" | ") : "`None`", true);
  
  
        
  
        embed.addField(`🗑️ Pruning`, guildData.pruning ? `${emoji.msg.SUCCESS} \`Enabled\`` : `${emoji.msg.ERROR} \`Disabled\``, true);
        try {
          embed.addField(`🔔 Now playing messages`, guildData.announce ? `${emoji.msg.SUCCESS} \`Enabled\`` : `${emoji.msg.ERROR} \`Disabled\``, true);

         

        } catch {/* */}
        // DJOnly Commands
        let leftdj = "";
        if (guildData.djonlycmds.sort(function (a, b) {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          }).join("") === "") leftdj = "`None`"
        else
          for (let i = 0; i < guildData.djonlycmds.length; i++) {
            leftdj += "`" + guildData.djonlycmds[i] + "` | "
        }  
        embed.addField(`${emoji.msg.dj} DJ Only Commands`, `\`\`\`${guildData.djonlycmds.join(", ")}\`\`\``);
        embed.addField(`${emoji.msg.prem} Premium Only Commands`, `\`\`\`24/7, toggle-pruning\`\`\``);
  
  
        // send embed
        message.channel.send({embeds: [embed]});
      } catch (e) {
        console.log(String(e.stack).bgRed)
        const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``);
        return message.channel.send({embeds: [emesdf]});


      }
    },
  };
  
  