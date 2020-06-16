const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, $쪼개, $감자야) => {
    let $사진 = $감자봇.user.displayAvatarURL;

	let $도움말 = new $디스코드.RichEmbed()
        .setColor($아무색깔())
        .setTitle(`감자봇 도움말 바로가기!`)
        .setURL(`https://github.com/potato179/potatoBot/blob/master/README.md`)
        .addBlankField()
        .addField(`초대 링크`, `https://discordapp.com/oauth2/authorize?client_id=508091800922357760&permissions=8&scope=bot`)
        .addField(`깃허브`, `https://github.com/potato179/potatoBot/`)
        .addField(`디스코드`, `https://discord.com/invite/ecsApMn`)
        .setFooter(`감자봇을 이용해 주셔서 감사합니다!`, $사진);
    $메시지.channel.send($도움말);
};

exports.help = {
    name: "$도움말",
    description: "도움말",
    use: "감자야 도움"
};