const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, pars) => {
    let $추방할인간 = $메시지.guild.member($메시지.mentions.users.first() || $메시지.guild.members.get(pars[0]));
    if (!$추방할인간) { 
        $메시지.delete().catch((O_o) => {}); 
        return $메시지.channel.send("<:no:511056028364832779> 그런 사람이 없습니다!").then((thismsg) => thismsg.delete(2000));
    }
    let $추방할이유 = pars.join(" ").slice(22);
    if (!$메시지.member.hasPermission("BAN_MEMBERS")) { 
        return $메시지.channel.send(`<:no:511056028364832779> <@${$메시지.author.id}>님은 추방할 권한을 갖지 않고 있습니다.`); 
    }
    if ($추방할인간.hasPermission("BAN_MEMBERS")) { 
        return $메시지.channel.send("<:no:511056028364832779> 제가 그분을 추방할 권리를 갖고 있지 않네요..."); 
    }

    let $추방할인간의와꾸 = $메시지.guild.iconURL;
    let $추방 = new $디스코드.RichEmbed()
        .setTitle(`${$메시지.guild.name.toString()}에서 추방됨!`)
        .setColor($아무색깔())        
        .setDescription(`${$메시지.createdAt}`)
        .setThumbnail($추방할인간의와꾸)
        .addBlankField()
        .addField("추방한 유저", `${$추방할인간} (ID: ${$추방할인간.id})`)
        .addField("추방한 사람", `${$메시지.author} (ID: ${$메시지.author.id})`)
        .addField("추방된 장소", $메시지.channel)
        .addField("추방된 이유", `${$추방할이유}.`);
    $메시지.guild.member($추방할인간).kick($추방할이유);
    $메시지.channel.send($추방);
};

exports.help = {
	name: "추방",
    description: "서버에서 유저를 추방합니다. 사용법: 감자야 추방 <유저언급> <사유>"
};