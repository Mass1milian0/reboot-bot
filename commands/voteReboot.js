const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('votereboot')
        .setDescription('reboots a server'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Select a server to reboot')
                    .addOptions([
                        {
                            label: 'Pixelmon',
                            description: 'reboots Pixelmon',
                            value: 'Pixelmon,77.68.118.63,25568,Pixelmon',
                        },
                        {
                            label: 'Enigmatica 6',
                            description: 'reboots Enigmatica 6',
                            value: 'Enigmatica 6,77.68.118.63,25575,MCEnigmatica6',
                        },
                        {
                            label: 'Cave Factory',
                            description: 'reboots Cave Factory',
                            value: 'Cave Factory,77.68.118.63,25569,MCCaveFactory',
                        },
                        {
                            label: 'Stacia Expert',
                            description: 'reboots Stacia Expert',
                            value: 'Stacia Expert,77.68.118.63,25570,StaciaExpert',
                        },
                        {
                            label: 'AOF5',
                            description: 'reboots AOF5',
                            value: 'AOF5,77.68.118.63,25566,AOF5',
                        },
                        {
                            label: 'Ragnamod 6',
                            description: 'reboots Ragnamod 6',
                            value: 'Ragnamod 6,77.68.118.63,25588,Ragnamod6',
                        },
                    ]),
            );
        await interaction.reply({ content: 'Please select a server to reboot', components: [row] })
    }, 
};
