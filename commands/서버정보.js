const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

module.exports.run = async ($감자봇, $메시지, pars) => {
		let $서버아이콘 = $메시지.guild.$서버아이콘URL;
		let $서버정보 = new $디스코드.RichEmbed()
            .setTitle(`${$메시지.guild.name.toString()} 서버 정보`)
            .setDescription(`${$메시지.guild.name.toString()}`)
            .setThumbnail($서버아이콘)
            .setColor($아무색깔())
            .addBlankField()
            .addField(`이 서버의 이름은?`, $메시지.guild.name)
            .addField(`이 서버가 만들어진 날은?`, $메시지.guild.createdAt)
            .addField(`${$메시지.author.toString()}(이)가 들어온 날은?`, $메시지.member.joinedAt)
            .addField(`총 유저수는?`, $메시지.guild.memberCount);
		$메시지.channel.send($서버정보);
};

module.exports.help = {
	name: "serverinfo"
};