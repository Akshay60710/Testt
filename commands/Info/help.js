
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "help",
  category: "Info",
  description: "Lund Lelo",
  run: async (client, message, args, guildData, player, prefix) => {
    try {

      


      const mainmenu = new MessageEmbed()
        .setAuthor("Astroz Music Help Panel", "https://cdn.discordapp.com/attachments/891768371308281975/892807444852506674/a-monogram-letter-logo-red-letter-vector-21989290.jpg")
        .setThumbnail(ee.footericon)
        .setDescription(`Hey! This is Astroz. Am here to provide you 24/7 high quality music.`)
        .addField(`● Config [5]`, `\`24/7\`, \`djrole\`, \`prefix\`, \`reset\`, \`toggle-np\`, \`toggle-pruning\``)
        .addField(`● Filters [7]`, `\`8d\`, \`bassboost\`, \`nightcore\`, \`slowmo\`, \`speed\`, \`vaporwave\`, \`clearfilter\``)
        .addField(`● Music [18]`, `\`autoplay\`, \`clearqueue\`, \`join\`, \`loop\`, \`nowplaying\`, \`pause\`, \`play\`, \`queue\`, \`remove\`, \`replay\`, \`resume\`, \`restart\`, \`resume\`, \`search\`, \`seek\`, \`shuffle\`, \`skip\`, \`skipto\`, \`stop\`, \`volume\``)
        .addField(`● Owner [3]`, `\`reload\`, \`eval\`, \`status\``)
        .addField(`● Premium [2]`, `\`addpremium\`, \`removepremium\``)
        .addField(`● Info [7]`, `\`config\`, \`help\`, \`invite\`, \`node\`, \`ping\`, \`stats\`, \`uptime\``)
        .addField(`● Links [2]`, `[Invite Me](https://discord.com/oauth2/authorize?client_id=811109715433619476&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/ZqCMvN2fPp)`)
        .setColor(`#00fefc`)



      message.channel.send({ embeds: [mainmenu] })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({ embeds: [emesdf] });
    }
  }
};

