const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");
const $불러오기 = require("request");

module.exports.run = async ($감자봇, $메시지, pars) => {
        let $말할거 = pars.join(" ").slice(0);
        if ($메시지.member.voiceChannel) {
                $메시지.member.voiceChannel.join().then((connection) => {
                    $불러오기.post("https://soundoftext.com/sounds", {
                        json: {
                            "engine": "Google",
                            "data": {
                                "text": "Hello, world",
                                "voice": "ko-KR"
                            }
                        }
                    }, (error, res, body) => {
                        if (error){
                            console.log(error);
                            return;
                        }
                    });
            });
            let $말하기성공 = new $디스코드.RichEmbed()
                .setColor($아무색깔())
                .addField(`<:save:511059374056275968> TTS 대신 말해주기!`, `${$메시지.author}님이 이렇게 말했습니다: ${$말할거}`);
            $메시지.channel.send($말하기성공);
        } 
        else {
            let $말하기실패 = new $디스코드.RichEmbed()
                .setColor($아무색깔())
                .addField(`<:no:511056028364832779> 말하기 실패`, `음성채널에 입장하세요.`);
            $메시지.channel.send($말하기실패);
        }
};

module.exports.help = {
	name: "tts"
};