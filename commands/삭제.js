const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, $쪼개) => {
    if (!$메시지.member.hasPermission('MANAGE_MESSAGES')) {
        return $메시지.channel.send(`<:no:511056028364832779> <@${$메시지.author.id}>님은 차단할 권한을 갖지 않고 있습니다.`); 
    }
    if (isNaN($쪼개[0]) || parseInt($쪼개[0]) <= 0) {
        return $메시지.channel.send(`<:no:511056028364832779> 숫자가 아닌 것을 입력했습니다.`); 
    }
    if (!$메시지.guild.me.hasPermission('MANAGE_MESSAGES')) {
        return $메시지.channel.send("<:no:511056028364832779> 제가 메시지를 삭제할 권한을 갖지 않고 있네요..."); 
    }
    
    let $삭제할개수;
    if (parseInt($쪼개[0]) > 99) {
        $삭제할개수 = 100;
    } else {
        $삭제할개수 = parseInt($쪼개[0]) + 1;
    }

    $메시지.channel.bulkDelete($삭제할개수, true).then(del =>
        $메시지.channel.send(`${del.size}개의 메시지를 삭제했습니다.`).then(msg => msg.delete({timeout: 20000}))
    ).catch(err => null)
}

exports.help = {
    name: "삭제",
    description: "사용자가 요청한 개수만큼 메시지를 삭제합니다.",
    use: "감자야 삭제 <개수>"
}