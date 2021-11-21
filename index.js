const Discord = require("discord.js"); 
const { Intents, WebhookClient , Collection} = require("discord.js");
const app = require("express")
const colors = require("colors"); 
const fs = require("fs"); 
require('discord-reply'); 
const config = require("./botconfig/config.json");
const fetch = require("node-fetch");
const mongoose = require("mongoose")
const { findOrCreateGuild } = require("./handlers/functions")
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/892812718447423568/Z5X6xo5lYuoWH-RsFjeAq3xmqeouzVcD3l6cdI01R_h4mnpwE6tNHF__HbZBtiZvGlAS' }); ////lele bsdk
const { readdirSync } = require("fs")

const intents = new Intents([ // include all non-privileged intents, would be better to specify which ones you actually need
  "GUILD_MEMBERS" // lets you request guild members (i.e. fixes the issue)
]);

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  presence: {
    status: "idle",
    activities: [{
      name: "%play | Astroz Development",
      type: "LISTENING"
    }]
  },
  ws: { intents },
  fetchAllMembers: false,
  restTimeOffset: 0,
  shards: "auto",
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
 ///// abe madarchod mene slahs cmd client me register kiye he bhadwa he kya
//// Me Delete Krdia Uff
//// Wahi H Copy Paste Uff

/// ab tuhi bana handler bimsi me ja raha game khelne


/// mongo teri gand connect krega phir
/// shard wala nikalde mkc ye iska hi error aaraha 


require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);

//Loading files, with the client variable like Command Handler, Event Handler, ...
["clientvariables", "command", "events", "erelahandler"].forEach(handler => { 
  require(`./handlers/${handler}`)(client);
});

//Each Database gets a own file and folder which is pretty handy!
client.databaseCache = {};
client.guildsData = require("./models/Guild"); // Guild mongoose model
client.databaseCache.guilds = new Discord.Collection();


//login into the bot
mongoose.connect(config.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  }).then(() => {
  //login to the bot
  client.login(config.token)




client.on("voiceStateUpdate", async (oldState, newState) => {
    if (newState.channelId && newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
        try {
            await newState.guild.me.voice.setSuppressed(false);
        } catch (e) {
            console.log(e)
        }
    }
})



client.on('guildCreate', async (guild) => {
  try {
    const owner = await guild.fetchOwner()
    const embed = new Discord.MessageEmbed()           
    .setTitle("Joined A New Server")
    .setColor("GREEN")
    .setThumbnail(guild.iconURL())
    .setDescription("Hey Developer Look! I've Joined A New Server !!")
    .addField("**Server Name**", guild.name, true)
    .addField("**Server ID**", guild.id, true)
    .addField("**Owner**", `Tag - ${owner.user.tag}\nID - ${owner.id}`, true)
    .addField("**Members**", `${guild.memberCount} + <@812605686583394304>`, true)
    try { embed.addField("**Region**", guild.region, true) } catch {/** */}
    client.channels.cache.get("891768371442495524").send({embeds: [embed]})
  } catch (e) { console.log(e) }
});
client.on('guildCreate', async (guild) => {
  try {
    const guildData = await findOrCreateGuild(client, { id: guild.id });
    let prefix = guildData.prefix;
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    guildData.announce = true;
    guildData.save();
  
    let schannel = guild.channels.cache.find(
      channel =>
      channel.type === "text" &&
      channel.permissionsFor(guild.me).has(Discord.Permissions.FLAGS.SEND_MESSAGES)
    );
    const texts = "If you need help, feel free to join our support server at https://discord.gg/FAkqYEPGjq"
    const guildembed = new Discord.MessageEmbed()
    .setTitle("Thank you for adding me in your server! ❤️")
    .setColor("RED")

    .setDescription(`\`\`\`fix\nMy prefix here is ${prefix}\nYou can see a list of commands by typing ${prefix}help or ${prefix}commands\nYou can change my prefix using ${prefix}prefix <New Prefix>\`\`\``);
    message.guild.owner.send({content: texts, embeds: [guildembed]});
  } catch {/** */}
});
client.on('guildDelete', async (guild) => {
  try {
    const owner = await guild.fetchOwner()
    const embed = new Discord.MessageEmbed()
    .setTitle("Leaved A Server")
    .setColor("RED")
    .setThumbnail(guild.iconURL())
    .setDescription("Hey Developers Look! Someone kicked me from their server !!")
    .addField("**Server Name**", guild.name, true)
    .addField("**Owner**", `Tag - ${owner.user.tag}\nID - ${owner.id}`, true)
    .addField("**Members**", `${guild.memberCount} - <@812605686583394304>`, true)
    try { embed.addField("**Region**", guild.region, true) } catch {/** */}
  
    client.channels.cache.get("891768371442495525").send({embeds: [embed]})  
  } catch (e) { console.log(e) }
});


 



     
 });




process.on('unhandledRejection', (error) => {
  web.send(`\`\`\`js\n${error.stack}\`\`\``)
});
process.on("uncaughtException", (err, origin) => {
  web.send(`\`\`\`js\n${err.stack}\`\`\``)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  web.send(`\`\`\`js\n${err.stack}\`\`\``)
});
process.on('beforeExit', (code) => {
  web.send(`\`\`\`js\n${code}\`\`\``)
});
process.on('exit', (code) => {
  web.send(`\`\`\`js\n${code}\`\`\``)
});
process.on('multipleResolves', (type, promise, reason) => {
}); 

//uhh