const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, pars) => {
    var $뽑은숫자 = Math.floor(Math.random() * 13);
    var $뽑은도형 = Math.floor(Math.random() * 4);
    if($뽑은숫자 === 0) var $카드숫자 = ":regional_indicator_a:";
    if($뽑은숫자 === 1) var $카드숫자 = ":two:";
    if($뽑은숫자 === 2) var $카드숫자 = ":three:";
    if($뽑은숫자 === 3) var $카드숫자 = ":four:";
    if($뽑은숫자 === 4) var $카드숫자 = ":five:";
    if($뽑은숫자 === 5) var $카드숫자 = ":six:";
    if($뽑은숫자 === 6) var $카드숫자 = ":seven:";
    if($뽑은숫자 === 7) var $카드숫자 = ":eight:";
    if($뽑은숫자 === 8) var $카드숫자 = ":nine:";
    if($뽑은숫자 === 9) var $카드숫자 = ":keycap_ten: ";
    if($뽑은숫자 === 10) var $카드숫자 = ":regional_indicator_j:";
    if($뽑은숫자 === 11) var $카드숫자 = ":regional_indicator_q:";
    if($뽑은숫자 === 12) var $카드숫자 = ":regional_indicator_k:";       
    if($뽑은도형 === 0) var $카드도형 = ":spades:";
    if($뽑은도형 === 1) var $카드도형 = ":diamonds:";
    if($뽑은도형 === 2) var $카드도형 = ":hearts:";
    if($뽑은도형 === 3) var $카드도형 = ":clubs:";

    let $결과 = new $디스코드.RichEmbed()
        .setTitle(`${$메시지.author.toString()}가 뽑은 카드!`)
        .setDescription(`${$메시지.guild.name.toString()}`)
        .setColor($아무색깔())
        .addField(`나온 카드는?`, $카드숫자 + $카드도형)
    return $메시지.channel.send($결과);
}

exports.help = {
    name: "카드",
	description: "카드를 뽑습니다. 사용법: 감자야 카드"
};