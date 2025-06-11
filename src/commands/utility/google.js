const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('google')
    .setDescription('Google a query.')
    .addStringOption((option) =>
      option.setName('query').setDescription('Query to search'),
    ),
  async execute(interaction) {
    const query = interaction.options.getString('query');
    const querySpace = query.replace(' ', '+');
    const url = `https://www.google.com/search?q=${querySpace}`;

    if (!query) {
      return interaction.reply({
        content: 'You need to google something.',
        ephemeral: true,
      });
    }
    await interaction.reply(query, true).catch((error) => {
      console.error(error);
      interaction.reply({
        content: 'There was an error trying to query!',
        ephemeral: true,
      });
    });

    return interaction.editReply(`${url}`);
  },
};
