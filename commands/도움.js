const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, $쪼개, $감자야) => {
    let $사진 = $감자봇.user.displayAvatarURL;

	let $도움말 = new $디스코드.RichEmbed()
        .setColor($아무색깔())
        .setTitle(`감자봇 도움말 바로가기!`)
        .setURL(`https://github.com/potato179/potatoBot/blob/master/README.md`)
        .addBlankField()
        .addField(`이 프로잭트는 개발중입니다!`, `이 프로잭트는 개발중으로, 재미없으며 버그가 자주 발생합니다. 버그 발생 시 깃허브 이슈 또는 공식 포럼에 오류 내용을 남겨주세요.`)
        .setFooter(`감자봇을 이용해 주셔서 감사합니다!`, $사진);
    let $봇초대링크 = new $디스코드.RichEmbed()
        .setColor($아무색깔())
        .setTitle(`감자봇 초대링크!`)
        .setURL("https://discordapp.com/oauth2/authorize?client_id=508091800922357760&permissions=8&scope=bot")
        .setDescription(`이 링크를 클릭해 감자봇을 초대해 보세요!`)
        .setThumbnail($사진)
        .setFooter(`감자봇을 이용해 주셔서 감사합니다!`, $사진);
    let $포럼링크 = new $디스코드.RichEmbed()
        .setColor($아무색깔())
        .setTitle(`감자봇 FORUM!`)
        .setURL("https://discord.gg/ecsApMn")
        .setDescription(`이 링크를 클릭해 감자봇 포럼에 입장해 보세요!`)
        .setFooter(`감자봇을 이용해 주셔서 감사합니다!`, $사진);
    let $깃헙이슈 = new $디스코드.RichEmbed()
        .setColor($아무색깔())
        .setTitle(`오류 제보하기`)
        .setURL("https://github.com/potato179/potatoBot/issues")
        .setDescription(`이 링크를 클릭해 감자봇의 버그를 제보하세요! (또는 공식 포럼에서도 할 수 있습니다.)`)
        .setFooter(`감자봇을 이용해 주셔서 감사합니다!`, $사진);
    let $오픈소스 = new $디스코드.RichEmbed()
        .setColor($아무색깔())
        .setTitle(`감자봇 소스`)
        .setURL(`https://github.com/potato179/potatoBot`)
        .setDescription(`이 링크를 클릭해 감자봇의 소스를 보세요!`)
        .setFooter(`감자봇을 이용해 주셔서 감사합니다!`, $사진);
    $메시지.channel.send($도움말);
    $메시지.channel.send($봇초대링크);
    $메시지.channel.send($포럼링크);
    $메시지.channel.send($깃헙이슈);
    $메시지.channel.send($오픈소스);
};

exports.help = {
    name: "$도움말",
    description: "도움말",
    use: "감자야 도움"
};