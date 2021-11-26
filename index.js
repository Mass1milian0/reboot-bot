require('dotenv').config()
require('./register-commands')
const axios = require('axios').default;
const fs = require('fs')
const ampapi = require("@cubecoders/ampapi");
const { Client, Collection, Intents } = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on("ready", async () => {
    console.log("bot is ready to roll")
})

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName)
        if (!command) {
            console.log(interaction);
        }
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
    if (interaction.isSelectMenu()) {
        
        //console.log(interaction.values[0]);
        await interaction.update({ content: interaction.values[0] + " has been selected for reboot, initiating vote!", components: [], fetchReply: true });
        await interaction.deleteReply();
        let followup =await interaction.followUp('Vote for ' + interaction.values[0] + ' reboot! (1 minute expire!)');
        //console.log(followup)
        followup.react("✅")
        setTimeout(async () => {
            await followup.edit("vote has ended!")
            const votes = followup.reactions.cache.get('✅').count - 1
            console.log();
        }, 5*1000);
    }
})
client.login(process.env.DISCORD_TOKEN)