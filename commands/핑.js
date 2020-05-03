const $디스코드 = require("discord.js");
const randomHexColor = require("random-hex-color");

exports.run = async ($감자봇, $메시지, pars) => {
    let ping = new $디스코드.RichEmbed()
        .setTitle(":ping_pong: 퐁!")
        .setColor(randomHexColor())
        .setDescription(`${$메시지.author.toString()} [${Math.round($감자봇.ping)}ms]`);
    $메시지.delete().catch((p) => {});
    $메시지.channel.send(ping);
};

exports.help = {
    name: "핑",
    description: "핑을 측정합니다. 사용법: 감자야 핑"
};