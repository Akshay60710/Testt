# Premium Only Example

```

        premiumGuildSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) { 
    
        message.reply({embeds: [noprem]}) 
      
      } else {
         // Command Here
      }
  })
  ```
  