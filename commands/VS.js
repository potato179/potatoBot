const $디스코드 = require("discord.js");
const $사진가져오기 = require("superagent");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, $쪼개) => {
    let $1번선수 = $메시지.mentions.users.first() || $메시지.guild.members.get($쪼개[0]) || $메시지.author;
    let $2번선수 = $메시지.mentions.users.last() || $메시지.author;
    $사진가져오기.get(`https://nekobot.xyz/api/imagegen?type=whowouldwin&user1=${$1번선수.displayAvatarURL}&user2=${$2번선수.displayAvatarURL}`)
    .then((res) => {
        let $싸워 = new $디스코드.RichEmbed()
            .setTitle($1번선수 + " VS " + $2번선수)
            .setImage(res.body.message)
            .setColor($아무색깔())
            .setFooter("https://nekobot.xyz 에서 가져옴");
            $메시지.channel.send($싸워);
    }).catch((err) => {
        if ($오류) { 
            $메시지.channel.send(`<:warn:511059374073053184> 오류가 발생했습니다! 다시 시도해주세요.`);
            console.log($오류);
        }
    });
};

exports.help = {
    name: "VS",
    description: "누가이길까요? 사용법: 감자야 VS <유저언급1> <유저언급2>"
};