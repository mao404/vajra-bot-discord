/* eslint-disable no-dupe-keys */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { openWeather } = require('../../config')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Retrieve the weather of a city')
		.addStringOption(option => option
			.setName('city')
			.setDescription('City to search')
			.setMaxLength(50)
			.setRequired(true),
		),
	async execute(interaction) {
		const city = interaction.options.getString('city')
		const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeather.apiKey}&units=metric`

		const response = await fetch(URL);
		const weather = await response.json();

		const embed = new EmbedBuilder()
			.setTitle(`${weather.name}, ${weather.sys.country}`)
			.setDescription(`${weather.weather[0].main}, ${weather.weather[0].description}`)
			.setColor('Green')
			.addFields(
				{ name: 'Temp', value: `${weather.main.temp}` },
				{ name: 'Feels like', value: `${weather.main.feels_like}`, inline:true },
				{ name: 'Min Temp', value: `${weather.main.temp_min}`, inline:true },
				{ name: 'Max Temp', value: `${weather.main.temp_max}`, inline:true },
				{ name: 'Humidity', value: `${weather.main.humidity}`, inline:true },
			)
		await interaction.reply({ embeds: [embed] });

	},
}

