const $디스코드 = require("discord.js");
const $아무색깔 = require("random-hex-color");
const $학교정보 = require('school-kr');
const $학교 = new $학교정보();

exports.run = async($감자봇, $메시지, $쪼개) => {
    let $지역;
    let $종류;
    const filter = (m) => m.author.id === $메시지.author.id;
    $메시지.channel.send(`지역을 선택해 주세요. [서울/경기/인천/부산/광주/대구/대전/세종/울산/강원/충북/충남/경북/경남/전북/전남/제주] \n취소를 원하실 경우에는 "취소"라고 입력하세요.`);
    $메시지.channel.awaitMessages(filter, {
		max: 1,
		time: 60000
    }).then((collected) => {
        let $지역선택 = collected.first().content;
        collected.delete();
        if ($지역선택 === "취소") { 
            return $메시지.channel.send(`<:no:511056028364832779> 취소됨`);
        } 
        else {
            if ($지역선택 === "서울") {
                $지역 = "SEOUL";
            } 
            else if($지역선택 === "경기")
            {
                $지역 = "GYEONGGI";
            }
            else if($지역선택 === "인천")
            {
                $지역 = "INCHEON";
            }
            else if($지역선택 === "부산")
            {
                $지역 = "BUSAN";
            }
            else if($지역선택 === "광주")
            {
                $지역 = "GWANGJU";
            }
            else if($지역선택 === "대전")
            {
                $지역 = "DAEJEON";
            }
            else if($지역선택 === "대구")
            {
                $지역 = "DEAGU";
            }
            else if($지역선택 === "세종")
            {
                $지역 = "SEJONG";
            }
            else if($지역선택 === "울산")
            {
                $지역 = "ULSAN";
            }
            else if($지역선택 === "강원")
            {
                $지역 = "KANGWON";
            }
            else if($지역선택 === "충북")
            {
                $지역 = "CHUNGBUK";
            }
            else if($지역선택 === "충남")
            {
                $지역 = "CHUNGNAM";
            }
            else if($지역선택 === "경북")
            {
                $지역 = "GYEONGBUK";
            }
            else if($지역선택 === "경남")
            {
                $지역 = "GYEONGNAM";
            }
            else if($지역선택 === "전북")
            {
                $지역 = "JEONBUK";
            }
            else if($지역선택 === "전남")
            {
                $지역 = "JEONNAM";
            }
            else if($지역선택 === "제주")
            {
                $지역 = "JEJU";
            }
            else {
                $메시지.channel.send(`${$지역}가 뭐야? 먹는거야?`);
                return;
            }
        }
        const filter = (m) => m.author.id === $메시지.author.id;
        $메시지.channel.send(`이제 학교 종류를 선택해 주세요. [유치원/초등학교/중학교/고등학교](유치원은 병설유치원만 조회 가능합니다.)`);
        $메시지.channel.awaitMessages(filter, {
            max: 1,
            time: 60000
        }).then((collected) => {
            let $학교종류 = collected.first().content;
            collected.delete();
            if ($학교종류 === "취소"){
                return $메시지.channel.send(`<:no:511056028364832779> 취소됨`);
            }
            else {
                if ($학교종류 === "유치원") {
                    $종류 = "KINDERGARTEN";
                } 
                else if ($학교종류 === "초등학교") {
                    $종류 = "ELEMENTARY";
                } 
                else if ($학교종류 === "중학교") {
                    $종류 = "MIDDLE";
                } 
                else if ($학교종류 === "고등학교") {
                    $종류 = "HIGH";
                } 
                else{
                    $메시지.channel.send(`${$학교종류}가 뭐야? 먹는거야?`);
                    return;
                }
            }   
            
            const filter = (m) => m.author.id === $메시지.author.id;
            $메시지.channel.send(`학교나 유치원의 이름을 적어주세요`);
            $메시지.channel.awaitMessages(filter, {
                max: 1,
                time: 60000
            }).then((collected) => {
                let $학교이름검색 = collected.first().content;
                collected.delete();
                
                const example = async function() {
                    if($지역 === "SEOUL") {
                        const $검색 = await $학교.search($학교정보.Region.SEOUL, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.SEOUL, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.SEOUL, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.SEOUL, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.SEOUL, $검색[0].schoolCode);
                    }
                    else if($지역 === "GYEONGGI") {
                        const $검색 = await $학교.search($학교정보.Region.GYEONGGI, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.GYEONGGI, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.GYEONGGI, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.GYEONGGI, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.GYEONGGI, $검색[0].schoolCode);
                    }
                    else if($지역 === "INCHEON") {
                        const $검색 = await $학교.search($학교정보.Region.INCHEON, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.INCHEON, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.INCHEON, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.INCHEON, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.INCHEON, $검색[0].schoolCode);
                    }
                    else if($지역 === "BUSAN") {
                        const $검색 = await $학교.search($학교정보.Region.BUSAN, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.BUSAN, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.BUSAN, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.BUSAN, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.BUSAN, $검색[0].schoolCode);
                    }
                    else if($지역 === "GWANGJU") {
                        const $검색 = await $학교.search($학교정보.Region.GWANGJU, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.GWANGJU, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.GWANGJU, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.GWANGJU, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.GWANGJU, $검색[0].schoolCode);
                    }
                    else if($지역 === "DAEJEON") {
                        const $검색 = await $학교.search($학교정보.Region.DAEJEON, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.DAEJEON, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.DAEJEON, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.DAEJEON, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.DAEJEON, $검색[0].schoolCode);
                    }
                    else if($지역 === "DEAGU") {
                        const $검색 = await $학교.search($학교정보.Region.DEAGU, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.DEAGU, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.DEAGU, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.DEAGU, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.DEAGU, $검색[0].schoolCode);
                    }
                    else if($지역 === "ULSAN") {
                        const $검색 = await $학교.search($학교정보.Region.SEJONG, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.ULSAN, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.ULSAN, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.ULSAN, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.ULSAN, $검색[0].schoolCode);
                    }
                    else if($지역 === "KANGWON") {
                        const $검색 = await $학교.search($학교정보.Region.KANGWON, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.KANGWON, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.KANGWON, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.KANGWON, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.KANGWON, $검색[0].schoolCode);
                    }
                    else if($지역 === "CHUNGBUK") {
                        const $검색 = await $학교.search($학교정보.Region.CHUNGBUK, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.CHUNGBUK, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.CHUNGBUK, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.CHUNGBUK, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.CHUNGBUK, $검색[0].schoolCode);
                    }
                    else if($지역 === "CHUNGNAM") {
                        const $검색 = await $학교.search($학교정보.Region.CHUNGNAM, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.CHUNGNAM, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.CHUNGNAM, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.CHUNGNAM, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.CHUNGNAM, $검색[0].schoolCode);
                    }
                    else if($지역 === "GYEONGBUK") {
                        const $검색 = await $학교.search($학교정보.Region.GYEONGBUK, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.GYEONGBUK, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.GYEONGBUK, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.GYEONGBUK, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.GYEONGBUK, $검색[0].schoolCode);
                    }
                    else if($지역 === "GYEONGNAM") {
                        const $검색 = await $학교.search($학교정보.Region.GYEONGNAM, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.GYEONGNAM, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.GYEONGNAM, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.GYEONGNAM, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.GYEONGNAM, $검색[0].schoolCode);
                    }
                    else if($지역 === "JEONBUK") {
                        const $검색 = await $학교.search($학교정보.Region.JEONBUK, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.JEONBUK, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.JEONBUK, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.JEONBUK, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.JEONBUK, $검색[0].schoolCode);
                    }
                    else if($지역 === "JEONNAM") {
                        const $검색 = await $학교.search($학교정보.Region.JEONNAM, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.JEONNAM, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.JEONNAM, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.JEONNAM, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.JEONNAM, $검색[0].schoolCode);
                    }
                    else if($지역 === "JEJU") {
                        const $검색 = await $학교.search($학교정보.Region.JEJU, $학교이름검색);
                        if($종류 === "KINDERGARTEN") $학교.init($학교정보.Type.KINDERGARTEN, $학교정보.Region.JEJU, $검색[0].schoolCode);
                        else if($종류 === "ELEMENTARY") $학교.init($학교정보.Type.ELEMENTARY, $학교정보.Region.JEJU, $검색[0].schoolCode);
                        else if($종류 === "MIDDLE") $학교.init($학교정보.Type.MIDDLE, $학교정보.Region.JEJU, $검색[0].schoolCode);
                        else if($종류 === "HIGH") $학교.init($학교정보.Type.HIGH, $학교정보.Region.JEJU, $검색[0].schoolCode);
                    }
                    
                    const meal = await $학교.getMeal();
                    const calendar = await $학교.getCalendar();
                    const $시간 = new Date();
                    const $오늘의날짜 = $시간.getDate();
                    console.log(calendar.today);

                    try{
                        let $학교정보보내기 = new $디스코드.RichEmbed()
                            .setTitle(`${$학교이름검색} 급식/학사일정`)
                            .setColor($아무색깔())
                            .addBlankField()
                            .addField(`오늘 날짜`, `${meal.month}월 ${meal.day}일`)
                            .addField(`오늘의 급식`, meal.today)
                        $메시지.channel.send($학교정보보내기);
                    }
                    catch(err){
                        try{
                            $메시지.channel.send(`<:ohmy:634669578336862208> 저런! 학교 급식 일정이 없거나 불러오는데 실패했네요`);
                        }
                        catch(err){
                            $메시지.channel.send(`오류가 발생했습니다.`, err);
                        }                    
                    }
                }
                example();
                return;
            });
        });        
    });
}

exports.help = {
    name: "학교",
    description: "학교 급식 및 학사일정을 보여줍니다. 사용법: 감자야 학교"
};