const $디스코드 = require("discord.js");

exports.run = async ($감자봇, $메시지, pars) => {
    let $입력 = pars.join(" ").slice(0);
    let $고른거 = $입력.split(" ");
    let $선택번호 = Math.floor(Math.random() * ($고른거.length) + 0);
    $메시지.channel.send(`<:next:511059373691502614> 선택! **${$고른거[$선택번호]}**`)
};

exports.help = {
    name: "선택",
    description: "다중선택을 합니다.",
    use: "감자야 선택 <아무거나1> <아무거나2> <아무거나3> ... <아무거나 12390>"
};