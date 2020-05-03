const $디스코드 = require("discord.js");
const $사진가져오기 = require("superagent");
const $아무색깔 = require("random-hex-color");

module.exports.run = async ($감자봇, $메시지, pars) => {
    let $만들사람 = $메시지.mentions.users.first() || $메시지.guild.members.get(pars[0]) || $메시지.author;
    $사진가져오기.get(`https://nekobot.xyz/api/imagegen?type=iphonex&url=${$만들사람.displayAvatarURL}`)
    .then((res) => {
        let $아이폰 = new $디스코드.RichEmbed()
            .setTitle($메시지.author)
            .setImage(res.body.message)
            .setColor($아무색깔())
            .setFooter("https://nekobot.xyz 에서 가져옴.");
        $메시지.channel.send($아이폰);
    }).catch(($오류) => { 
        $메시지.channel.send(`<:warn:511059374073053184> 오류가 발생했습니다! 다시 시도해주세요.`);
        console.log($오류);
    });
};

module.exports.help = {
    name: "아이폰",
    description: "아이폰에 당신의 얼굴을 넣어봅니다."
};