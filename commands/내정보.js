const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

module.exports.run = async ($감자봇, $메시지, pars) => {
    let $유저 = $메시지.guild.member($메시지.mentions.users.first() || $메시지.guild.members.get(pars[0]));
    let $와꾸 = $유저.displayAvatarURL;
    let $내정보 = new $디스코드.RichEmbed()
        .setTitle(`${$유저.user.username} Infomation!`)
        .setDescription(`${$메시지.guild.name.toString()}`)
        .setThumbnail($와꾸)
        .setColor($아무색깔())
        .addBlankField()
        .addField("당신의 이름은?", $유저.user.username)
        .addField("당신이 서버에서 사용하는 별명은?", $유저.displayName)
        .addField("당신의 태그는?", $유저.user.tag)
        .addField("당신의 아이디는?", $유저.id)
        .addField("당신의 상태는?", $유저.presence.status)
        .addField("당신이 하고있는 게임은?", $유저.presence.game)
        .addField("당신의 프사 url은?", $유저.user.displayAvatarURL)
        .addField("당신이 가입한 날은?", $유저.user.createdAt);
    $메시지.channel.send($내정보);
};

module.exports.help = {
    name: "유저정보",
    description: "해당 유저의 정보를 보여줍니다.",
    use: "감자야 내정보"
};