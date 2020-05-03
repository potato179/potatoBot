const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");
const $잘생긴은표 = "399882457530236929";

exports.run = async ($감자봇, $메시지, $쪼개, $감자야) => {
    let filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '⭕') && user.id === $메시지.author.id;
    if ($잘생긴은표.includes($메시지.author.id)) {
        let $공지내용 = $쪼개.join(" ").slice(1);
        let $공지보내는거확인 = new $디스코드.RichEmbed()
            .setTitle(`${$감자봇.guilds.size}개의 서버에 공지가 발신됩니다`)
            .addField(`공지내용`, `\`\`\`\n${$공지내용}\n\`\`\``)
            .setColor($아무색깔())
            .setFooter(`감자봇`)
        $메시지.channel.send($공지보내는거확인).then((th) => {
            th.react('❌');
            th.react('⭕');
            th.awaitReactions(filter, {
                max: 1
            }).then((collected) => {
                if (collected.array()[0].emoji.name === '⭕') {
                    let $발신 = ``

                    $감자봇.guilds.forEach(g => {
                        let $공지내용 = $메시지.content.replace(`${$감자야} `, '')
                        let $보낼채널모음
                        g.channels.forEach(c => {
                            let $보낼채널걸러 = `${c.name}`;
                            if ($보낼채널걸러.includes('공지')) {
                                $보낼채널모음 = `${c.id}`;
                            }
                        });
                        
                        let $공지보낼거 = new $디스코드.RichEmbed()
                            .setTitle(`${$감자봇.user.username} 공지`)
                            .setThumbnail($감자봇.user.avatarURL)
                            .setDescription(`${$공지내용}`)
                            .setColor($아무색깔())
                            .setFooter(`공지 발신자: ${$메시지.member.user.tag}`, $메시지.author.avatarURL)
                            .setTimestamp()
                        let $보낼채널들 = $감자봇.channels.get($보낼채널모음)
                        let $결과
                        try {
                            if (!g.me.hasPermission(`SEND_MESSAGES`)) {
                                $결과 = `${g.name}: 발신 실패 (메시지 발신 권한 없음)\n`
                            } 
                            else { 
                                $보낼채널들.send($공지보낼거);
                                console.log($보낼채널들)
                            }
                        } 
                        catch (e) {
                            console.log(`${g.name} 채널에 공지를 날릴 수 없습니다.`, e)
                            if (!g.me.hasPermission("MANAGE_CHANNELS")) {
                                $결과 = `${g.name}: 발신 실패 (채널 생성 권한 없음)\n`
                            } 
                            else {
                                $결과 = `${g.name}: 채널 자동 생성 및 발신 성공\n`
                                g.createChannel(`공지`).then(channel => {
                                    channel.send($결과);
                                })
                            }
                        } 
                        finally {
                            if ($결과) { 
                                $발신 += $결과;
                            }
                        }
                    });

                    if ($발신 === ``) $발신 = '성공적으로 모든 서버에 발신되었습니다!';
                    let $발신완료 = new $디스코드.RichEmbed()
                        .setTitle('발신이 완료되었습니다!')
                        .addField('$발신:', `\`\`\`\n${$발신}\`\`\``)
                        .setColor($아무색깔())
                        .setFooter(`감자봇`)
                    th.edit($발신완료);
                } 
                else {
                    let $취소 = new $디스코드.RichEmbed()
                        .setTitle(`공지발신이 취소되었습니다.`)
                        .addField(`공지 취소됨`)
                        .setColor($아무색깔())
                        .setFooter(`감자봇`)
                    th.edit($취소);
                }
            });
        });
    } 
    else {
    let $당신은홍은표가아닙니다 = new $디스코드.RichEmbed()
        .setTitle(`당신은 potato179가 아닙니다.`)
        .setColor($아무색깔())
        .setFooter(`감자봇`)
    $메시지.channel.send($당신은홍은표가아닙니다)
    }
}

exports.help = {
    name: "공지",
    description: "공지를 발신합니다.",
    use: "때려침 ㅅㄱ 오아시스한테 시킬거임"
};