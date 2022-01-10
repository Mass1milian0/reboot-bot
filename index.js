require('dotenv').config()
require('./register-commands')
const axios = require('axios').default;
const MCutil = require('minecraft-server-util');
const fs = require('fs')
const { Client, Collection, Intents } = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

async function restartInstance(instance) {
    const API = `http://${process.env.AMPIP}/API`
    try {
        let sessionId = await axios.post(API + "/Core/Login", {
            username: process.env.AMP_USER,
            password: process.env.AMP_PASSWORD,
            token: "",
            rememberMe: false
        }, { Accept: "text / javascript" })
        if (!sessionId.data.success) {
            console.log("Failed to log into API")
            return;
        }
        sessionId = sessionId.data.sessionID
        response = await axios.post(API + "/ADSModule/RestartInstance", { InstanceName: instance, SESSIONID: sessionId })
    } catch (error) {
        console.log(error);
    }


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
        await interaction.update({ content: values[0] + " has been selected for reboot!", components: [], fetchReply: true });
        await interaction.deleteReply();
        let followup = await interaction.followUp("Rebooting " + values[0] + " please wait")
        await restartInstance(values[3])
        await followup.edit(`${values[0]} has been rebooted, please wait for server to start!`)
    }
})
client.login(process.env.DISCORD_TOKEN)