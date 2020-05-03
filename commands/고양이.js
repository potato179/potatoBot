const $디스코드 = require("discord.js");

exports.run = async ($감자야, $메시지, pars) => {
    const { $고양이 } = await fetch('https://aws.random.cat/meow').then(response => response.json());

    $메시지.channel.send($고양이);
};

exports.help = {
    name: "고양이",
    description: "고양이 사진(discord.js guide 문서)",
    use: "감자야 고양이"
};