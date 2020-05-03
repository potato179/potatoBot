const $디스코드 = require("discord.js");
const $정보가져오기 = require("superagent");
const $아무색깔 = require("random-hex-color");

exports.run = async ($감자봇, $메시지, $쪼개) => {
    const filter = (m) => m.author.id === $메시지.author.id;
    $메시지.channel.send(`깃허브 ID를 입력해주세요.`).then((q) => q.delete(60000));
    $메시지.channel.awaitMessages(filter, {
		max: 1,
		time: 60000
    }).then((collected) => {
        let $입력 = collected.first().content;
        collected.delete();
		if ($입력 === "취소") { 
            $메시지.channel.send("<:no:511056028364832779> 취소됨");
        } 
        else {
            $정보가져오기.get(`https://api.github.com/users/${$입력}`).then((res) => {
                let $깃허브 = new $디스코드.RichEmbed()
                .setColor($아무색깔());
                if (res.body.name) {
                    if (res.body.company) {
                        $깃허브.setTitle(`**${res.body.company} / ${res.body.name}의 GitHub 프로필**`);
                    } 
                    else {
                        $깃허브.setTitle(`**${res.body.name}의 GitHub 프로필**`);
                    }
                } else {
                    $깃허브.setTitle(`**${res.body.login}의 GitHub 프로필**`);
                }
                $깃허브.setURL(res.body.html_url)
                .setThumbnail(res.body.avatar_url)
                .setImage("https://imageog.flaticon.com/icons/png/512/25/25231.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF")
                .setDescription(`리포지토리(공개): **${res.body.public_repos}**개, 팔로워: **${res.body.followers}**명, 팔로우: **${res.body.following}**명`)
                .addField(`자기소개`, res.body.bio || "자기소개가 없습니다")
                .addField(`${res.body.name}의 ID`, res.body.login, true)
                .addField(`${res.body.name}의 이름`, res.body.name || "프로필이 없음", true)
                .addField(`${res.body.name}의 고유ID`, res.body.id, true)
                .addField(`${res.body.name}의 유저종류`, res.body.type, true)
                .addField(`${res.body.name}의 프로필 URL`, res.body.html_url, true)
                .addField(`${res.body.name}의 홈페이지`, res.body.blog || "정보없음", true)
                .addField(`${res.body.name}의 위치`, res.body.location || "정보없음", true)
                .addField(`${res.body.name}의 이메일`, res.body.email || "정보없음", true)
                .addField(`${res.body.name}의 가입날`, res.body.created_at, true)
                .setFooter("https://github.com 에서 가져옴.");
                $메시지.channel.send($깃허브);
            }).catch(($오류) => {
                if ($오류) { 
                    $메시지.channel.send(`<:warn:511059374073053184> 오류가 발생했습니다! 다시 시도해주세요.`);
                    console.log($오류);
                }
            });
        }
    });
};

exports.help = {
    name: "깃허브",
    description: "깃허브 프로필 가져오기",
    use: "감자야 깃허브"
};