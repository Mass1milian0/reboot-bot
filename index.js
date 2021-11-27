require('dotenv').config()
require('./register-commands')
const axios = require('axios').default;
const MCutil = require('minecraft-server-util');
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
        const values = interaction.values.toString().split(',')
        await interaction.update({ content: values[0] + " has been selected for reboot, initiating vote!", components: [], fetchReply: true });
        let status = {}
        try {
            status = await MCutil.statusFE01(values[1], Number(values[2]))
        } catch (error) {
            status.players = {online: 5}
        }
        await interaction.deleteReply();
        let followup = await interaction.followUp('Vote for ' + values[0] + ' reboot! ' + status.players.online + ' vote(s) needed for reboot! (1 minute expire!)');
        followup.react("✅")
        setTimeout(async () => {
            const votes = followup.reactions.cache.get('✅').count - 1
            await followup.edit("vote has ended with: " + votes + " vote(s) of the " + status.players.online + " needed for the reboot!")
            if (votes >= status.players.online) {
                interaction.followUp("Rebooting " + values[0] + " please wait")
            }
        }, 10*1000);
    }
})
client.login(process.env.DISCORD_TOKEN)