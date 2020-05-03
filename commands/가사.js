const $디스코드 = require("discord.js");
const $가사가져오기 = require("superagent");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, pars) => {
    let $노래 = pars.join(" ").slice(0);
    let { body } = await $가사가져오기
    .get(`https://some-random-api.ml/lyrics?title=${$노래}`);
    if (body.error) {
        $메시지.channel.send(`${body.error}`);
    } else {
        let $가사 = new $디스코드.RichEmbed()
            .setColor($아무색깔())
            .setTitle("가사전체")
            .setURL(body.links.genius)
            .setDescription(`"${body.title}" -${body.author}`)
            .setThumbnail(`${body.thumbnail.genius}`)
            .setFooter("https://some-random-api.ml 에서 가져옴");
        let lyrics = body.lyrics;
        let lyrics1 = lyrics.substring(0, 999);
        let lyrics2 = lyrics.substring(1000, 1999);
        let lyrics3 = lyrics.substring(2000, 2999);
        let lyrics4 = lyrics.substring(3000, 3999);
        let lyrics5 = lyrics.substring(4000, 4999);
        if (lyrics1) { $메시지.author.send(lyrics1); }
        if (lyrics2) { $메시지.author.send(lyrics2); }
        if (lyrics3) { $메시지.author.send(lyrics3); }
        if (lyrics4) { $메시지.author.send(lyrics4); }
        if (lyrics5) { $메시지.author.send(lyrics5); }
        $메시지.channel.send("DM을 확인하세요!");
        $메시지.author.send($가사);
    }
};

exports.help = {
    name: "가사검색",
    description: "가사를 검색합니다",
    use: "감자야 가사"
};