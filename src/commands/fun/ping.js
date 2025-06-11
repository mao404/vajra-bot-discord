const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
    interaction.editReply(
      `Pong! ${new Date().getTime() - interaction.createdTimestamp}ms`,
    );
  },
};
