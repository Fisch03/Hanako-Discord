const ytdl = require("ytdl-core");
const queue = new Map()
const VoiceConnectionStatus = require("@discordjs/voice");
const {joinVoiceChannel} = require('@discordjs/voice');
const {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
 
} = require('@discordjs/voice');


async function execute(message, serverQueue){
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I don't have permission to connect/speak in the voice channel you're currently in"
      );
    }
  
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
     };
  
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 4,
        playing: true
      };
  
      queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
      
        connection = await joinVoiceChannel(
          {
              selfDeaf: false,
              channelId: message.member.voice.channel.id,
              guildId: message.guild.id,
              adapterCreator: message.guild.voiceAdapterCreator
          });
          
  
      queueContruct.connection = connection;
      // Calling the play function to start a song
      
      play(message.guild, queueContruct.songs[0]);
     } catch (err) {
      // Printing the error message if the bot fails to join the voicechat
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
     }
      }
  
  }

function skip(message, serverQueue){
    if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to skip music!"
    );
    if (!serverQueue)
        return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
    
  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

async function play(guild, song){
  const serverQueue = queue.get(guild.id);
if (!song) {
  //serverQueue.voiceChannel.leave();
  queue.delete(guild.id);
  return;

}

console.log('song');
console.log(song.begin);
const stream = await ytdl(song.url, {filter: 'audioonly', begin: song.begin});
const player = await createAudioPlayer();
const resource = await createAudioResource(stream);

await player.play(resource);
await connection.subscribe(player);
console.log(VoiceConnectionStatus.getVoiceConnection(guild.id));
console.log("OMG");


  player.on(AudioPlayerStatus.Idle, () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
  })
  player.on("error", error => console.error(error));

serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

module.exports = {
    execute: execute,
    skip: skip,
    stop: stop,
    queue: queue
};