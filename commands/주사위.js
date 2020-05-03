const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

module.exports.run = async ($감자봇, $메시지, pars) => {
    var $주사위 = Math.floor(Math.random() * (5) + 0);
    if($주사위 === 1){
        let $결과 = new $디스코드.RichEmbed()
            .setTitle(`${$메시지.author.toString()}가 던진 주사위!`)
            .setDescription(`${$메시지.guild.name.toString()}`)
            .setColor($아무색깔())
            .addField(`나온 수는?`, `:one:`)
        return $메시지.channel.send($결과);
    }
    if($주사위 === 2){
        let $결과 = new $디스코드.RichEmbed()
            .setTitle(`${$메시지.author.toString()}가 던진 주사위!`)
            .setDescription(`${$메시지.guild.name.toString()}`)
            .setColor($아무색깔())
            .addField(`나온 수는?`, `:two:`)
        return $메시지.channel.send($결과);
    }
    if($주사위 === 3){
        let $결과 = new $디스코드.RichEmbed()
            .setTitle(`${$메시지.author.toString()}가 던진 주사위!`)
            .setDescription(`${$메시지.guild.name.toString()}`)
            .setColor($아무색깔())
            .addField(`나온 수는?`, `:three:`)
        return $메시지.channel.send($결과);
    }
    if($주사위 === 4){
        let $결과 = new $디스코드.RichEmbed()
            .setTitle(`${$메시지.author.toString()}가 던진 주사위!`)
            .setDescription(`${$메시지.guild.name.toString()}`)
            .setColor($아무색깔())
            .addField(`나온 수는?`, `:four:`)
        return $메시지.channel.send($결과);
    }
    if($주사위 === 5){
        let $결과 = new $디스코드.RichEmbed()
            .setTitle(`${$메시지.author.toString()}가 던진 주사위!`)
            .setDescription(`${$메시지.guild.name.toString()}`)
            .setColor($아무색깔())
            .addField(`나온 수는?`, `:five:`)
        return $메시지.channel.send($결과);
    }
    if($주사위 === 6){
        let $결과 = new $디스코드.RichEmbed()
            .setTitle(`${$메시지.author}가 던진 주사위!`)
            .setDescription(`${$메시지.guild.name.toString()}`)
            .setColor($아무색깔())
            .addField(`나온 수는?`, `:six:`)
        return $메시지.channel.send($결과);
    }
}

module.exports.help = {
	name: "dice"
};