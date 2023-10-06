const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice6')
		.setDescription('Roll a D6 dice (6 sided dice)'),
	async execute(interaction) {
		const randomInt = (max, min) => {
			return Math.floor(Math.random() * (max - min + 1) + min)
		}
		const dice = randomInt(1, 6)
		interaction.reply(`Dice rolled ${dice}`);
	},
}
