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
		)
		.addStringOption(option => option
			.setName('country')
			.setDescription('Country Code of the city')
			.setMaxLength(2),
		),
	async execute(interaction) {
		const city = interaction.options.getString('city')
		const country = interaction.options.getString('country')

		let URL = ''
		if (!country) {
			URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeather.apiKey}&units=metric`
		} else {
			URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}, ${country}&appid=${openWeather.apiKey}&units=metric`
		}
		// const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeather.apiKey}&units=metric`

		const response = await fetch(URL);
		const weather = await response.json();

		const iconCode = weather.weather[0].icon

		const embed = new EmbedBuilder()
			.setTitle(`${weather.name}, ${weather.sys.country}`)
			.setDescription(`${weather.weather[0].main}, ${weather.weather[0].description}`)
			.setThumbnail(`http://openweathermap.org/img/w/${iconCode}.png`)
			.setColor('Green')
			.addFields(
				{ name: 'Temp', value: `${weather.main.temp} °C` },
				{ name: 'Feels like', value: `${weather.main.feels_like} °C`, inline:true },
				{ name: 'Min Temp', value: `${weather.main.temp_min} °C`, inline:true },
				{ name: 'Max Temp', value: `${weather.main.temp_max} °C`, inline:true },
				{ name: 'Humidity', value: `${weather.main.humidity}`, inline:true },
			)
		await interaction.reply({ embeds: [embed] });

	},
}

