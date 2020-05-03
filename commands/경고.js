const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, pars) => {
    let $경고할인간 = $메시지.guild.member($메시지.mentions.users.first() || $메시지.guild.members.get(pars[0]));
    if (!$경고할인간) { 
        $메시지.delete().catch((O_o) => {}); 
        return $메시지.channel.send("<:no:511056028364832779> 그런 사람이 없습니다!").then((thismsg) => thismsg.delete(2000));
    }
    let $경고할이유 = pars.join(" ").slice(22);
    if (!$메시지.member.hasPermission("MANAGE_ROLES")) { 
        return $메시지.channel.send(`<:no:511056028364832779> <@${$메시지.author.id}>님은 경고할 권한을 갖지 않고 있습니다.`); 
    }
    if ($경고할인간.hasPermission("MANAGE_ROLES")) { 
        return $메시지.channel.send("<:no:511056028364832779> 제가 그분을 경고할 권리를 갖고 있지 않네요..."); 
    }

    let $경고할인간의와꾸 = $메시지.guild.iconURL;
    let $경고 = new $디스코드.RichEmbed()
        .setTitle(`${$메시지.guild.name.toString()}에서 경고됨!`)
        .setColor($아무색깔())        
        .setDescription(`${$메시지.createdAt}`)
        .setThumbnail($경고할인간의와꾸)
        .addBlankField()
        .addField("경고한 유저", `${$경고할인간} (ID: ${$경고할인간.id})`)
        .addField("경고한 사람", `${$메시지.author} (ID: ${$메시지.author.id})`)
        .addField("경고된 장소", $메시지.channel)
        .addField("경고된 이유", `${$경고할이유}.`);
    $메시지.channel.send($경고);
};

exports.help = {
    name: "경고",
    description: "유저를 경고합니다.",
    use: "감자야 경고 <유저언급> <사유>"
};