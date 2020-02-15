/*
------------------------------------------------------------------------------------------------

    본 소스 코드는 감자봇 프로잭트의 core.js 파일 중 일부만 올라와 있습니다.
    토큰이나 키가 적혀있지 않으며, 일반 채팅 명령어도 공개되지 않습니다.
    본 소스 코드를 편집하지 않고 작동을 하면 작동되지 않습니다.
    감자봇은 오픈 소스 소프트웨어로 누구나 이 소스를 열람 및 편집, 재배포를 할 수 있습니다.
    
    This source code is uploaded only a part of Core.js file, potatoBot Project.
    No Token and API Key is inserted and chatting command is not reveiled.
    You can't run this code without inserting Token and API Key in line 26 and 30.
    PotatoBot is an Open Source Software, so anyone can see and edit the code or redistribute.

    문의(Content me): hackg179@gmail.com / potato179#8362
    디스코드(Korean Discord Server): https://discord.gg/ecsApMn
    페이스북(Facebook): https://facebook.com/potato179bot

------------------------------------------------------------------------------------------------ 
*/
const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const GOOGLE_API_KEY = "" //이 칸에 구글 API키를 작성하세요. Please insert your Google API Key here.
const YouTube = require('simple-youtube-api');
const superagent = require('superagent')
const client = new Discord.Client();
bot.login('') //이 칸에 봇의 토큰을 작성하세요. Please insert your Discord Bot's API Key here.
var guilds = {};

bot.on('message', async message => {
    let pr = message.content.replace('감자야 ', '')
	let command = pr.split(' ')[0];
});

bot.on("ready", async() => {
    console.log(`작동 성공!!!`);
    bot.user.setActivity("", {type: 0})
});

bot.on("message", async message => {
    if(message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

//도움말 Help--------------------------------------------------

    if(message.content.startsWith("감자야 도움") || message.content.startsWith("감자도움")){
        let help = new Discord.RichEmbed()
        .setTitle('**감자봇 도움말**')
        .addField('')
        .setColor('#d92be0')
        .setFooter('감자봇 - 도움말')
        message.channel.send(help) 
    }

//기본 명령어 Common Commands--------------------------------------------------

    if(message.content.startsWith("감자야 안녕") || message.content.startsWith("감자야 ㅎㅇ")){
        var messagesend = Math.floor(Math.random() * 3);
        if(messagesend === 0) message.channel.send("안반가운데");
        if(messagesend === 1) message.channel.send("누구세요?");
        if(messagesend === 2) message.channel.send("ㅎㅇㅎㅇ");
    }

//뽑기 Random Dice--------------------------------------------------

    if(message.content.startsWith("감자야 주사위") || message.content.startsWith("감자주")){
        var rand = Math.floor(Math.random() * 6) + 1;        
        message.channel.send(":game_die: 주사위를 던졌습니다: " + rand);
    }
    if(message.content.startsWith("감자야 카드")){
        var randnum = Math.floor(Math.random() * 13);
        var randshape = Math.floor(Math.random() * 4);
        if(randnum === 0) var cardnum = ":regional_indicator_a:";
        if(randnum === 1) var cardnum = ":two:";
        if(randnum === 2) var cardnum = ":three:";
        if(randnum === 3) var cardnum = ":four:";
        if(randnum === 4) var cardnum = ":five:";
        if(randnum === 5) var cardnum = ":six:";
        if(randnum === 6) var cardnum = ":seven:";
        if(randnum === 7) var cardnum = ":eight:";
        if(randnum === 8) var cardnum = ":nine:";
        if(randnum === 9) var cardnum = ":keycap_ten: ";
        if(randnum === 10) var cardnum = ":regional_indicator_j:";
        if(randnum === 11) var cardnum = ":regional_indicator_q:";
        if(randnum === 12) var cardnum = ":regional_indicator_k:";       
        if(randshape === 0) var cardshape = ":spades:";
        if(randshape === 1) var cardshape = ":diamonds:";
        if(randshape === 2) var cardshape = ":hearts:";
        if(randshape === 3) var cardshape = ":clubs:";
        message.channel.send(cardnum + cardshape);
    }
}); 

//음악봇 Music Bot--------------------------------------------------

bot.on("message", async message => {
    const queue = new Map();
    const youtube = new YouTube(GOOGLE_API_KEY);
    const args = message.content.split(' ');
	const searchString = args.slice(2).join(' ');
	const url = args[2] ? args[2].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);
    const searchString2 = args.slice(1).join(' ');
	const url2 = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';

	if(message.content.startsWith("감자야 플레이")) {
		const voiceChannel = message.member.voiceChannel;
		if(!voiceChannel) return message.channel.send(":no: ${message.author.username} 이 음성채널에 없어... 음성채널에 입장한 후 다시 불러봐!");
		const permissions = voiceChannel.permissionsFor(message.client.user);mhnyunh
		if(!permissions.has('CONNECT')) return message.channel.send(":no: 그곳에 입장할 권한이 없어... 관리자께 문의해봐!");
		if(!permissions.has('SPEAK')) return message.channel.send(":no: 그곳서 말하기 권한이 없어... 관리자께 문의해봐!");
		if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)){
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, message, voiceChannel, true);
			}
            ytdl.getBasicInfo(playlist.url, (err1, info) => {
                let vedl = `${info.length_seconds / 60}`
                vedl = vedl.split('.')
                vedl = `${vedl[0]}` + `:` + `${info.length_seconds % 60}`
                return message.channel.send(`:okay: **${playlist.title}**( ${vedl} )를 재생목록에 추가했어!`);
            });
        } 
            else {
                try{
                    var video = await youtube.getVideo(url);
                } 
                catch(err){
                    try{
                        var videos = await youtube.searchVideos(searchString, 5);
                        let index = 0;
                        message.channel.send(`
                            __**검색결과:**__
                            ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
                            1~5중 원하는 결과를 10초 이내로 번호로 입력해줘.
                        `).then((th) => th.delete(10000));
                        try{
                            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } 
                        catch(err){
                            console.error(err);
                            return message.channel.send(":alarm_clock: 시간이 초과됐어. 다시 시도해 줘.");
                        }
                        const videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } 
                    catch (err){
                        console.error(err);
                        return message.channel.send('');
                    }
                }
                return handleVideo(video, message, voiceChannel);
            }
        }
        if(message.content.startsWith("감자야 스킵")){
            if(!message.member.voiceChannel) return message.channel.send(":no: 스킵할 노래가 없어!");
            if(!serverQueue) return message.channel.send(":no: 스킵할 노래가 없어!");
            serverQueue.connection.dispatcher.end("쳇...");
            message.channel.send(":next: 스킵했어!");
            return undefined;
        } 
        if(message.content.startsWith("감자야 정지")){
            if(!message.member.voiceChannel) return message.channel.send(":no: 정지할 노래가 없어!");
            if(!serverQueue) return message.channel.send(":no: 정지할 노래가 없어!");
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('쳇...');
            message.channel.send(":clean: 재생목록을 초기화했어!");
            return undefined;
        }
        if(message.content.startsWith("감자야 볼륨")){
            if(!message.member.voiceChannel) return message.channel.send(":no: 볼륨을 조정할 노래가 없어!");
            if(!serverQueue) return message.channel.send(":no: 볼륨을 조정할 노래가 없어!");
            if(!args[2]) return message.channel.send(`현재 볼륨: **${serverQueue.volume * 100}**`);
            let vollum = parseInt(args[2]) / 100;
            serverQueue.volume = vollum;
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[2] / 100);
            return message.channel.send(`:loud_sound: ${args[2]}%로 볼륨을 변경했어!`);
        } 
        if(message.content.startsWith("감자야 뭐해")){
            if(!serverQueue) return message.channel.send("너랑 디코하는중");
            ytdl.getBasicInfo(serverQueue.songs[0].url, (err1, info) => {
                let vedl = `${info.length_seconds / 60}`
                vedl = vedl.split('.')
                vedl = `${vedl[0]}` + `:` + `${info.length_seconds % 60}`
                return message.channel.send(`:music: 지금 \`${serverQueue.songs[0].title}** ( ${vedl} )\`을 부르고 있어!`);
            });
        } 
        if(message.content.startsWith("감자야 재생목록")) {
            if(!serverQueue) return message.channel.send(":no: 재생목록에 노래가 없어. `감자야 플레이 {곡명}`으로 노래를 틀어봐!");
            return message.channel.send(`
                __**재생목록:**__
                ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
                :music: 핸재 재생곡: ${serverQueue.songs[0].title}
            `);
        } 
        if(message.content.startsWith("감자야 일시정지")) {
            if(serverQueue && serverQueue.playing){
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return message.channel.send(":pause_button: 노래를 일시정지했어. `감자야 다시`로 다시 재생할 수 있어!");
            }
            return message.channel.send(":no: 일시정지할 노래가 없어!");
        } 
        if(message.content.startsWith("감자야 다시")) {
            if(serverQueue && !serverQueue.playing){
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return message.channel.send();
            }
            return message.channel.send(":no: 다시부를 노래가 없어!");
        }
        return undefined;

    async function handleVideo(video, message, voiceChannel, playlist = false) {
        const serverQueue = queue.get(message.guild.id);
        console.log(video);
        const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        if(!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 0.5,
                playing: true
            };
            queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
            try{
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } 
            catch(error){
                console.error(`************************************************************\n************************************************************\n채널에 들어갈수 없음: ${error}\n************************************************************\n************************************************************`);
                queue.delete(message.guild.id);
                return message.channel.send(`${error}(으)로 인해 채널에 들어갈 수 없어. 관리자에게 오류가 보고됐어!`);
            }
        } 
        else{
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if(playlist) return undefined;
            else{
                ytdl.getBasicInfo(song.url, (err1, info) => {
                    let vedl = `${info.length_seconds / 60}`
                    vedl = vedl.split('.')
                    vedl = `${vedl[0]}` + `:` + `${info.length_seconds % 60}`
                    return message.channel.send(`:okay: **${playlist.title}**( ${vedl} )를 재생목록에 추가했어!`);
                });
            }
        }
        return undefined;
    }

    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        console.log(serverQueue.songs);
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if(reason === 'Stream is not generating quickly enough.') console.log('노래가 강제로 중단되었습니다.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume);
        ytdl.getBasicInfo(song.url, (err1, info) => {
            let vedl = `${info.length_seconds / 60}`
            vedl = vedl.split('.')
            vedl = `${vedl[0]}` + `:` + `${info.length_seconds % 60}`
            serverQueue.textChannel.send(`:okay: \`${song.title}\` (${vedl}) 들려줄게!`);
        });
    }
});

//인사 Welcome--------------------------------------------------

bot.on('guildMemberAdd', member => {
	let welcomechannel = member.guild.channels.find('name', '');
    let memberavatar = member.user.avatarURL
    if(!welcomechannel) return;
        let welcomembed = new Discord.RichEmbed()
        .setColor("#2E9AFE")
        .setThumbnail(memberavatar)
        .addField(":join: | 신입등장! ", `${member}`)
        .addField("ID :", "**[" + `${member.id}` + "]**")
		.addField("서버에 오신것을 환영합니다!", "반드시 서버의 규칙을 읽어주세요!")
		.addField("시각", "가입날자 :")
		.setTimestamp()
        welcomechannel.sendEmbed(welcomembed);
		return;
});

bot.on('guildMemberRemove', member => {
	let welcomechannel = member.guild.channels.find('name', '인사');
    let memberavatar = member.user.avatarURL
    if(!welcomechannel) return;
	
        let byembed = new Discord.RichEmbed()
        .setColor("#2E9AFE")
        .setThumbnail(memberavatar)
        .addField(":leave:  | 퇴장 ", `${member}`)
        .addField("ID :", "**[" + `${member.id}` + "]**")
		.addField("시각", "퇴장날자 :")
		.setTimestamp()
        welcomechannel.sendEmbed(byembed);
        return;
});