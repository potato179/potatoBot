const $디스코드 = require("discord.js");
const $이미지가져오기 = require("superagent");
const $아무색깔 = require("random-hex-color");

module.exports.run = async ($감자봇, $메시지, pars) => {
    let $캐릭터;
    let $자세선택지;
    let $자세;
    let $배경;
    let $문구;

    const filter = (m) => m.author.id === $메시지.author.id;
    $메시지.channel.send(`캐릭터를 선택해주세요: [사유리/모니카/나츠키/유리] (취소를 원할 경우 \`취소\`라고 입력하세요.)`).then((q) => q.delete(60000));
    $메시지.channel.awaitMessages(filter, {
		max: 1,
		time: 60000
    }).then((collected) => {
        let $캐릭터선택 = collected.first().content;
        collected.delete();
        if ($캐릭터선택 === "취소") { 
            return $메시지.channel.send(`<:no:511056028364832779> 취소됨`);
        } 
        else {
            if ($캐릭터선택 === "사유리") {
                $캐릭터 = "s";
                $자세선택지 = "캐릭터의 자세를 골라주세요: [1/1b/2/2b]";
            } 
            else if ($캐릭터선택 === "모니카") {
                $캐릭터 = "m";
                $자세선택지 = "캐릭터의 자세를 골라주세요: [1/2]";
            } 
            else if ($캐릭터선택 === "나츠키") {
                $캐릭터 = "n";
                $자세선택지 = "캐릭터의 자세를 골라주세요: [1/1b/2/2b]";
            } 
            else if ($캐릭터선택 === "유리") {
                $캐릭터 = "y";
                $자세선택지 = "캐릭터의 자세를 골라주세요: [1/1b/2/2b]";
            } 
            else if ($캐릭터선택 === "potato") {
                    $메시지.channel.send(`감자는 DDLC의 캐릭터가 아닙니다.!!`);
                return;
            } 
            else {
                $메시지.channel.send(`${$캐릭터선택}가 뭐야? 먹는거야?`);
                return;
            }
        }

        const filter = (m) => m.author.id === $메시지.author.id;
        $메시지.channel.send($자세선택지).then((q) => q.delete(60000));
        $메시지.channel.awaitMessages(filter, {
            max: 1,
            time: 60000
        }).then((collected) => {
            let $자세선택 = collected.first().content;
            collected.delete();
            if ($자세선택 === "취소"){
                return $메시지.channel.send(`<:no:511056028364832779> 취소됨`);
            }
            else {
                if ($자세선택 === "1") {
                    $자세 = "1";
                } 
                else if ($자세선택 === "1b") {
                    $자세 = "1b";
                } 
                else if ($자세선택 === "2") {
                    $자세 = "2";
                } 
                else if ($자세선택 === "2b") {
                    $자세 = "2b";
                } 
                else{
                    $메시지.channel.send(`${$자세선택}가 뭐야? 먹는거야?`);
                    return;
                }
            }           
            
                
            const filter = (m) => m.author.id === $메시지.author.id;
            $메시지.channel.send(`이젠 자세를 골라줘: [침실, 교실, 책장, 동아리실, 복도, 집, 집앞, 사유리 침실]`).then((q) => q.delete(60000));
            $메시지.channel.awaitMessages(filter, {
                max: 1,
                time: 60000
            }).then((collected) => {
                let $배경선택 = collected.first().content;
                collected.delete();
                if ($배경선택 === "취소"){
                    return $메시지.channel.send(`<:no:511056028364832779> 취소됨`);
                } 
                else{
                    if ($배경선택 === "침실") {
                        $배경 = "bedroom";
                    } 
                    else if ($배경선택 === "교실") {
                        $배경 = "class";
                    } 
                    else if ($배경선택 === "책장") {
                        $배경 = "closet";
                    } 
                    else if ($배경선택 === "동아리실") {
                        $배경 = "club";
                    }
                    else if ($배경선택 === "복도") {
                        $배경 = "corridor";
                    } 
                    else if ($배경선택 === "집") {
                        $배경 = "house";
                    } 
                    else if ($배경선택 === "집앞") {
                        $배경 = "residential";
                    } 
                    else if ($배경선택 === "사유리 침실") {
                        $배경 = "sayori_bedroom";
                    } 
                    else{
                        $메시지.channel.send(`${$배경선택}가 뭐야? 먹는거야?`);
                        return;
                    }    
                }


                const filter = (m) => m.author.id === $메시지.author.id;
                $메시지.channel.send(`이게 마지막이야! ${$캐릭터선택}가 할 말을 적어줘.`).then((q) => q.delete(60000));
                $메시지.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000
                }).then((collected) => {
                    let $문구선택 = collected.first().content;
                    collected.delete();
                    $문구 = $문구선택;

                    $메시지.channel.send(`로딩중...`);
                    $이미지가져오기.get(`https://nekobot.xyz/api/imagegen?type=ddlc&character=${$캐릭터}&body=${$자세}&face=${$캐릭터}&background=${$배경}&text=${$문구}`).then((res) => {
                        let $도키 = new $디스코드.RichEmbed()
                            .setTitle(`도키도키!`)
                            .setImage(res.body.message)
                            .setColor($아무색깔())
                            .setFooter("https://nekobot.xyz 에서 가져옴!");
                        $메시지.channel.send($도키);
                    }).catch(($오류) => { 
                        if ($오류) {
                            $메시지.channel.send(`<:warn:511059374073053184> 오류가 발생했습니다! 혹시 문구를 영어가 아닌 다른 문자로 작성했는지 확인해주세요. 이 외일 경우 관리자에게 문의해주세요.`);
                            console.log($오류);
                        }
                    });
                });
            });
        });
    });
};


module.exports.help = {
    name: "DDLC",
    description: "도키도키"
};