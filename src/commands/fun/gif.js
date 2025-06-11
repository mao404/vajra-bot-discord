/* eslint-disable no-dupe-keys */
const { SlashCommandBuilder } = require('discord.js');
const { tenor } = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Get a random gif')
    .addStringOption((option) =>
      option
        .setName('search')
        .setDescription('Gif to search')
        .setMaxLength(20)
        .setRequired(true),
    ),
  async execute(interaction) {
    const search = interaction.options.getString('search');

    const URL = `https://tenor.googleapis.com/v2/search?q=${search}&random=true&key=${tenor.apiKey}&limit=1`;

    const response = await fetch(URL);
    const gif = await response.json();

    const gifURL = gif.results[0].media_formats.gif.url;

    await interaction.reply({ content: gifURL });
  },
};
