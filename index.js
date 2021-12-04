require('dotenv').config()
require('./register-commands')
const axios = require('axios').default;
const MCutil = require('minecraft-server-util');
const fs = require('fs')
const { Client, Collection, Intents } = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let inCoolDown = new Set()

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
        console.log(response)
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
        if (inCoolDown.has("cooling")) {
            await interaction.update({ content: "bot in cooldown!, wait a while before using it again", components: [], fetchReply: true });
        } else {
            const values = interaction.values.toString().split(',')
            await interaction.update({ content: values[0] + " has been selected for reboot, initiating vote!", components: [], fetchReply: true });
            let status = {}
            try {
                status = await MCutil.statusFE01(values[1], Number(values[2]))
            } catch (error) {
                status.players = { online: process.env.MIN_VOTES }
            }
            if (status.players.online == 0) { status.players.online = process.env.MIN_VOTES }
            await interaction.deleteReply();
            let followup = await interaction.followUp('Vote for ' + values[0] + ' reboot! ' + status.players.online + ' vote(s) needed for reboot! (1 minute expire!)');
            followup.react("✅")
            setTimeout(async () => {
                const votes = followup.reactions.cache.get('✅').count - 1
                await followup.edit("vote has ended with: " + votes + " vote(s) of the " + status.players.online + " needed for the reboot!")
                if (votes >= status.players.online) {
                await followup.edit("Rebooting " + values[0] + " please wait")
                await restartInstance(values[3])
                await followup.edit(`${values[0]} has been rebooted, please wait for server to start!`)
                inCoolDown.add("cooling")
                setTimeout(() => {
                    inCoolDown.remove("cooling")
                }, process.env.GLOBAL_COOLDOWN_SECONDS * 60)
                }
            }, 60 * 1000);
        }
    }
})
client.login(process.env.DISCORD_TOKEN)