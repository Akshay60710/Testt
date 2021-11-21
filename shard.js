const config = require("./botconfig/config.json");

const chalk = require("chalk")

const { ShardingManager } = require("discord.js");



const shards = new ShardingManager("./index.js", {
  token: config.token, 
  totalShards: "auto", 
});

shards.on("shardCreate", shard => console.log(`[SHARD] => [LAUNCH] ${shard.id} LAUCHED SUCCESSFULLY...`))

shards.spawn({amount: shards.totalShards, delay: 5500, timeout: 30000});

