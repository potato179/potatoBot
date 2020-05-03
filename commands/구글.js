const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");
const $구글 = require("google");

exports.run = async ($감자봇, $메시지, pars) => {
    let $검색어 = pars.join(" ").slice(0);
    let $구글검색 = new $디스코드.RichEmbed()
        .setAuthor($검색어)
        .setTitle("구글 검색결과");
    $구글.$결과sPerPage = 5;
    $구글($검색어, ($오류, res) => { 
        if ($오류) {
            return console.log($오류);
        }
        for (let $횟수 = 0; $횟수 < res.links.length; $횟수++) {
            let $결과 = res.links[$횟수];
            if ($결과) {
                if (!$결과.title) {
                    $구글검색.addField(`${$횟수+1}. ${$결과.href}`, `[바로가기](${$결과.href}) : ${$결과.description}`);
                } 
                else {
                    $구글검색.addField(`${$횟수+1}. ${$결과.title}`, `[바로가기](${$결과.href}) : ${$결과.description}`);
                }
            }
        }
        $구글검색.setColor($아무색깔())
        .setURL(`https://google.com/search?q=${encodeURI($검색어)}`);
        $메시지.channel.send($구글검색);
    });
};

module.exports.help = {
    name: "구글",
    description: "구글검색",
    use: "감자야 구글 <검색어>"
};