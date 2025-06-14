const { SlashCommandBuilder } = require('discord.js');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  NoSubscriberBehavior,
} = require('@discordjs/voice');
const play = require('play-dl');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a YouTube song')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('YouTube link or search keywords')
        .setRequired(true),
    ),

  async execute(interaction) {
    try {
      const query = interaction.options.getString('query');

      // Ensure the user is in a voice channel
      const voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) {
        return await interaction.reply(
          '❌ You must be in a voice channel to play music.',
        );
      }

      // Acknowledge the interaction
      await interaction.reply(`🔍 Searching for: **${query}**`);

      // Connect to the voice channel
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
      console.log('✅ Connected to voice channel');

      let videoUrl = query;

      // Validate the input (URL or search)
      const validate = await play.validate(query);
      console.log('🔍 yt_validate result:', validate);

      if (validate !== 'search' && validate !== 'video') {
        return await interaction.editReply(
          '❌ Invalid query. Please provide a valid YouTube link or search term.',
        );
      }

      if (validate === 'search') {
        // Perform YouTube search
        console.log('🔍 Performing search for:', query);
        const results = await play.search(query, { limit: 1 });
        if (!results.length) {
          return await interaction.editReply('❌ No results found.');
        }

        videoUrl = results[0].url;
        console.log('✅ Search found video:', results[0].title);
        console.log('🔗 Video URL:', videoUrl);
      }

      // Get video info safely
      const yt_info = await play.video_info(videoUrl);
      const title = yt_info.video_details.title;
      console.log('📄 Video info title:', title);

      // Get stream using stream_from_info
      const stream = await play.stream_from_info(yt_info, { filter: 'audio' });
      console.log('🎵 Stream fetched');

      // Create resource and audio player
      const resource = createAudioResource(stream.stream, {
        inputType: stream.type,
      });

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Play,
        },
      });

      player.play(resource);
      connection.subscribe(player);

      console.log('🎶 Now playing:', title);
      await interaction.editReply(`🎶 Now playing: **${title}**`);

      // Handle playback end
      player.on(AudioPlayerStatus.Idle, () => {
        console.log('ℹ️ Playback finished, disconnecting');
        connection.destroy();
      });
    } catch (err) {
      console.error('❌ Error during play command:', err);
      await interaction.editReply(
        '❌ There was an error trying to play that song.',
      );
    }
  },
};
