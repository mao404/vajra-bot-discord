const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('8-ball')
		.setDescription('Ask a question and get a random response')
		.addStringOption(option => option
			.setName('question')
			.setDescription('Question to ask the 8-ball')
			.setMinLength(10)
			.setMaxLength(50)
			.setRequired(true),
		)
		.addBooleanOption(option => option
			.setName('hidden')
			.setDescription('To hide or not the response from the 8-ball'),
		),
	async execute(interaction) {
		const { options, user } = await interaction
		const question = await options.getString('question')
		const hidden = await options.getBoolean('hidden')

		if (!question.endsWith('?')) {
			return interaction.reply({ ephemeral: true, content: 'Sentence must end with a "?"' })
		}
		const randomNumber = Math.floor(Math.random() * responses.length - 0.001)

		const embed = new EmbedBuilder()
			.setTitle('8-ball')
			.setAuthor({ name: user.username, avatar: user.displayAvatarURL() })
			.setColor('Fuchsia')
			.addFields(
				{
					name: 'Question',
					value: question,
				},
				{
					name: 'Response',
					value: responses[randomNumber],
				},
			);
		interaction.reply({ ephemeral: hidden, embeds: [embed] })
	},
}

const responses = [
	'It is certain',
	'Without a doubt',
	'Most likely',
	'Sources tell me no',
	'No',
	'Maybe next time',
	'Try again',
	'Outlook not so good',
	'Yes',
	'Probably',
	'Looks good to me',
	'Signs point to yes',
	'The CIA says not happening',
]