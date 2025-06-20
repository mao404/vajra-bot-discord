const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prune')
    .setDescription('Prune up to 99 messages.')
    .addIntegerOption((option) =>
      option.setName('amount').setDescription('Number of messages to prune'),
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    const isGuildOwner = interaction.member.id === interaction.guild.ownerId;
    const isAdmin = interaction.member.permissions.has(
      PermissionsBitField.Flags.Administrator,
    );

    if (!isGuildOwner && !isAdmin) {
      return interaction.reply({
        content:
          'You must be the server owner or have Administrator permissions to use this command.',
        ephemeral: true,
      });
    }

    if (amount < 1 || amount > 99) {
      return interaction.reply({
        content: 'You need to input a number between 1 and 99.',
        ephemeral: true,
      });
    }
    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      console.error(error);
      interaction.reply({
        content: 'There was an error trying to prune messages in this channel!',
        ephemeral: true,
      });
    });

    return interaction.reply({
      content: `Successfully pruned \`${amount}\` messages.`,
      ephemeral: true,
    });
  },
};
