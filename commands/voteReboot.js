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
                            label: 'Cave factory',
                            description: 'reboots cave factory',
                            value: 'cavefactory',
                        },
                        {
                            label: 'Enigmatica 6',
                            description: 'reboots enigmatica 6',
                            value: 'enigmatica6',
                        },
                        {
                            label: 'MedievalMC',
                            description: 'reboots medievalMC',
                            value: 'MedievalMC',
                        },

                        {
                            label: 'Ragnamod 6',
                            description: 'reboots ragnamod 6',
                            value: 'ragnamod6',
                        }, {
                            label: 'Stacia Expert',
                            description: 'reboots stacia expert',
                            value: 'stacia',
                        },
                    ]),
            );
        await interaction.reply({ content: 'Please select a server to reboot', components: [row] })
    }, 
};
