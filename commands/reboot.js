const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, GuildMember } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('reboot')
        .setDescription('reboots a server'),
    async execute(interaction) {
        if (interaction.member._roles.includes("903796001008123944")) {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder('Select a server to reboot')
                        .addOptions([
                            {
                                label: 'All in One [Modded One Block]',
                                description: 'reboots All in One',
                                value: `All in One [Modded One Block],AllinOneModdedOneBlock`,
                            },
                            {
                                label: 'Create Above & Beyond',
                                description: 'reboots Create Above & Beyond',
                                value: `Create Above & Beyond,CreateAboveBeyond`,
                            },
                            {
                                label: 'Enigmatica 6',
                                description: 'reboots Enigmatica 6',
                                value: `Enigmatica 6,Enigmatica6`,
                            },
                            {
                                label: 'Ragnamod 6',
                                description: 'reboots Ragnamod 6',
                                value: `Ragnamod 6,Ragnamod6`,
                            },
                            {
                                label: 'AQM2',
                                description: 'reboots AQM2',
                                value: `AQM2,AnotherQualityModpack2`,
                            },
                        ]),
                );
            await interaction.reply({ content: 'Please select a server to reboot', components: [row] })
        }else await interaction.reply("You don't have permission to execute this command")
    },
};
