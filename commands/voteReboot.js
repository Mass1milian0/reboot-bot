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
                            value: 'Cave factory,cavefactory.devious.gg,25569,MCCaveFactory',
                        },
                        {
                            label: 'Enigmatica 6',
                            description: 'reboots enigmatica 6',
                            value: 'Enigmatica 6,e6.devious.gg,25575,MCEnigmatica6',
                        },
                        {
                            label: 'MedievalMC',
                            description: 'reboots medievalMC',
                            value: 'MedievalMC,medieval.devious.gg,25567,MedievalMC',
                        },
                        {
                            label: 'Ragnamod 6',
                            description: 'reboots ragnamod 6',
                            value: 'Ragnamod 6,r6.devious.gg,25588,Ragnamod6v3',
                        },
                        {
                            label: 'Stacia Expert',
                            description: 'reboots stacia expert',
                            value: 'Stacia,stacia.devious.gg,25570,StaciaExpert',
                        },
                    ]),
            );
        await interaction.reply({ content: 'Please select a server to reboot', components: [row] })
    }, 
};
