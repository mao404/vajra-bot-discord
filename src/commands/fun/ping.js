const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const sent = await interaction.reply('Pong!')
		interaction.editReply(`Pong! ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
}
