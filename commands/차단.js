const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, pars) => {
    let $차단할인간 = $메시지.guild.member($메시지.mentions.users.first() || $메시지.guild.members.get(pars[0]));
    if (!$차단할인간) { 
        $메시지.delete().catch((err) => {}); 
        return $메시지.channel.send("<:no:511056028364832779> 그런 사람이 없습니다!").then((thismsg) => thismsg.delete(2000));
    }
    let $차단할이유 = pars.join(" ").slice(22);
    if (!$메시지.member.hasPermission("BAN_MEMBERS")) { 
        return $메시지.channel.send(`<:no:511056028364832779> <@${$메시지.author.id}>님은 차단할 권한을 갖지 않고 있습니다.`); 
    }
    if ($차단할인간.hasPermission("BAN_MEMBERS")) { 
        return $메시지.channel.send("<:no:511056028364832779> 제가 그분을 차단할 권리를 갖고 있지 않네요..."); 
    }

    let $차단할인간의와꾸 = $메시지.guild.iconURL;
    let $차단 = new $디스코드.RichEmbed()
        .setTitle(`${$메시지.guild.name.toString()}에서 차단됨!`)
        .setColor($아무색깔())        
        .setDescription(`${$메시지.createdAt}`)
        .setThumbnail($차단할인간의와꾸)
        .addBlankField()
        .addField("차단한 유저", `${$차단할인간} (ID: ${$차단할인간.id})`)
        .addField("차단한 사람", `${$메시지.author} (ID: ${$메시지.author.id})`)
        .addField("차단된 장소", $메시지.channel)
        .addField("차단된 이유", `${$차단할이유}.`);
    $메시지.guild.member($차단할인간).ban($차단할이유);
    $메시지.channel.send($차단);
};

exports.help = {
    name: "유저 차단",
    description: "서버에서 유저를 차단합니다.",
    use: "사용법: 감자야 차단 <유저언급> <사유>"
};