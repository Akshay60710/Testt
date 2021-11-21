const {
  MessageEmbed
} = require("discord.js");
const Discord  = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  getRandomInt
} = require("../../handlers/functions")
module.exports = {
  name: "stats",
  category: "Info",
  aliases: ["musicstats"],
  cooldown: 10,
  usage: "stats",
  description: "Shows music Stats, like amount of Commands and played Songs etc.",
  run: async (client, message, args, guildData, player, prefix) => {
    
    try {
      let totalSeconds = message.client.uptime / 1000;
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);
      
      let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
  


      let connectedchannelsamount = 0;
      let guilds = client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
      if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

      const statsEmbed = new Discord.MessageEmbed()
      .setColor("#00fefc")
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`Astroz Music Stats`)
      .setThumbnail(ee.footericon)
      .setDescription(`\`\`\`nim
› Version    ::   1.0.1
› Node.js    ::   16.6.9
› Discord.js ::   13.0.1
› Servers    ::   ${client.guilds.cache.size}
› Users      ::   ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}
› Shards     ::   0/1
› Ping       ::   ${client.ws.ping}ms
› Players    ::   ${connectedchannelsamount}
› Platform   ::   ${process.platform}
› CPU        ::   ${require('os').cpus()[0].model}
› Developers ::   Astroz Development
\`\`\`
      `)
      message.channel.send({embeds: [statsEmbed]});

    } catch (e) {
      console.log(String(e.stack).bgRed)
			const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.message}\`\`\``);
			return message.channel.send({embeds: [emesdf]});
    }
  }
}


