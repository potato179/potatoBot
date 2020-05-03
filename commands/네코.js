const $디스코드 = require("discord.js");
const $사진가져오기 = require("superagent");
const $아무색깔 = require("random-hex-color");

module.exports.run = async ($감자봇, $메시지, $쪼개) => {
    $사진가져오기.get("https://nekobot.xyz/api/image?type=neko")
    .then((res) => {
        let $네코 = new $디스코드.RichEmbed()
            .setColor($아무색깔())
            .setTitle("Here you go!")
            .setURL(res.body.message)
            .setDescription(`Neko for ${$메시지.author}"`)
            .setImage(res.body.message)
            .setFooter("https://nekobot.xyz 에서 가져움");
        $메시지.channel.send($네코);
    });
};

module.exports.help = {
    name: "네코",
    description: "따꾸따꾸를 위한 기능",
    use: "감자야 네코"
};