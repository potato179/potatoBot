/**
 * 감자봇 discord edition의 core.js 파일입니다.
 * 이 파일에서는 기본 설정 및 명령어 로드를 주 목적으로 합니다.
 * @requires discord.js
 * @requires superagent
 * @requires random-hex-color
 * @requires school-kr 
 * @requires ping 
 * @author 홍은표 <hackg179@gmail.com>
 * @version 20.5.28
 * @copyright 2018~2020 감자봇 All Rights Reserved by 홍은표. MIT lisenced
 */
console.log(`[봇 프로세스 시작됨]`);
console.log(`이 봇은 ${process.env.computername}에서 돌아가고 있습니다.`);
console.log(`\n--------------------------------------------------\n`);

/**
 * @param $명령어 fs 다들 아시죠...?
 */
const $명령어 = require("fs");
console.log(`[준비완료] FS 준비완료!`);

/**
 * @param $감자봇토큰파일 token.json 파일을 불러옵니다.
 * 봇토큰, 봇접사, 봇쿨다운의 값은 token.json 파일을 수정하시면 됩니다.
 * 헤로쿠 호스팅을 사용하실 경우에는 설정에서 값 설정을 하시면 됩니다.
 * @param $봇토큰 봇을 로그인할 토큰입니다.
 * @param $감자야 봇의 접사를 정해줍니다.
 * @param $봇쿨다운 봇의 쿨다운 시간을 정해줍니다.
 * @param $로그 봇의 로그를 기록할 채널 아이디입니다.
 */
let $감자봇토큰파일 = require("./token.json");
let $감자야 = process.env.$봇접사 || $감자봇토큰파일.$봇접사;
console.log(`[준비완료] 이봇의 접사는 "${$감자야}" 입니다.`);
let $쿨다운 = new Set();
let $쿨다운시간 = process.env.$봇쿨다운 || $감자봇토큰파일.$봇쿨다운;
console.log(`[준비완료] 이 봇의 쿨다운 시간은 ${$쿨다운시간} 입니다.`);
let $로그 = process.env.$로그 || $감자봇토큰파일.$로그;
console.log(`[준비완료] 이 봇의 로그를 기록할 채널은 ${$로그}입니다.`);

/**
 * @param $디스코드 discord.js를 불러옵니다. 최신 버젼을 적극 권장합니다.
 */
const $디스코드 = require("discord.js");
console.log(`[준비완료] Discord.js 준비완료!`);

// const AI = require("request");

/**
 * @param $감자봇 클라이언트를 만들어줍니다.
 */
const $감자봇 = new $디스코드.Client();

/**
 * @param $토큰 token.json에 있는 토큰값을 불러오고 그 값으로 로그인합니다. 또는 호스팅 서버에 지정되어있는 토큰값으로 로그인합니다.
 */
let $토큰 = $감자봇토큰파일.$봇토큰;
$감자봇.login(process.env.token || $토큰);
console.log(`[준비완료] "${$토큰}"으로 로그인했습니다.`);

/**
 * commands 폴더 안에 있는 명령어들을 불러옵니다.
 * commands 폴더 안에 있는 파일은 명령어.js의 형식이어야합니다.
 * @param $명령어파일 .js로 끝나는 모든 파일을 불러옵니다. 만약 commands폴더 안에 .js로 끝나는 파일이 없으면 리턴합니다.
 * @param $명령어이름 파일 이름에 근거하여 봇의 명령어이름을 정해줍니다.
 * @param $명령어셋 최종적으로 명령어를 정해줍니다.
 */
$감자봇.commands = new $디스코드.Collection();
$명령어.readdir("./commands/", (err, files) => {
	let $명령어파일 = files.filter((f) => f.split(".").pop() === "js");
	if($명령어파일.length <= 0){
		console.log(`[오류] 명령어 파일을 찾을 수 없습니다.`);
		return;
	}
	$명령어파일.forEach(($파일읽어, i) => {
		let $기능 = require(`./commands/${$파일읽어}`);
		let $명령어이름 = $파일읽어.split(".");
		let $명령어셋 = $명령어이름[0];
		$감자봇.commands.set($명령어셋, $기능);
		$감자봇.commands.set($기능.help.name, $기능);
		$감자봇.commands.set($기능.help.description, $기능);
		$감자봇.commands.set($기능.help.use, $기능);
		console.log(`[준비완료] 명령어: ${$명령어셋} | 이름: ${$기능.help.name} | 설명: ${$기능.help.description} | 사용법: ${$기능.help.use}`);
	});
});

$감자봇.on("ready", async() => {
	/**
	 * 감자봇의 상태를 콘솔에 기록합니다.
	 */
	console.log(`\n--------------------------------------------------\n`);
	console.log(`[봇 실행 시작됨!]\n`);
	console.log(`\n--------------------------------------------------\n`);
	console.log(`${$감자봇.commands.size}명령어\n`)
	console.log(`${$감자봇.guilds.size}서버 | ${$감자봇.channels.size}채널 | ${$감자봇.users.size}사용자\n`)
	console.log(`\n--------------------------------------------------\n`);
	console.log(`< 메시지 기록 >\n`);

	/**
	 * 감자봇의 상태를 정해줍니다.
	 * @description setActivity에는 상태 이름을 적으면 됩니다.
	 * @param type 봇의 활동 종류를 정해줍니다.
	 * @description setStatus에는 봇의 상태를 적어줍니다. online, idle, dnd가 있습니다.
	 */
	$감자봇.user.setActivity(`"감자야 도움" 입력으로 도움말!`, {type: 2});
	$감자봇.user.setStatus("dnd");

	/**
	 * @description 따라 치는 기능입니다. 
	 */
	$감자봇.on("typingStart", async(typingChannel) => {
		typingChannel.startTyping();
		setTimeout(() => {
			typingChannel.stopTyping();
		},  500);
	});

	$감자봇.on("typingStop", async(typingChannel) => {
		typingChannel.stopTyping();
	});
});

$감자봇.on("message", ($메시지) => {
	/**
	 * 본 봇이 보낸 메세지에 대해서는 응답하지 않습니다.
	 */
	if(`${$메시지.author.id}` === `${$감자봇.user.id}`) return;

	/**
	 * DM에 대해서도 응답하지 않습니다.
	 */
	if(!$메시지.guild) return $메시지.reply(`<:no:511056028364832779> DM은 안받습니다. 안녕히계세요.`);

	/**
	 * 메세지에 "ㅋ"이나 "ㅎ"이 들어가면 같이 웃어줍니다.
	 */
	if($메시지.content.includes("ㅋ")){
		if($메시지.content.includes("ㅎ")){
			let $뭘쪼개 = Math.floor(Math.random()*10)+1;
			let $쪼개라 = "ㅋㅎ";
			let $작작쪼개 = $쪼개라.repeat($뭘쪼개);
			$메시지.channel.send($작작쪼개);
		}
		else{
			let $뭘쪼개 = Math.floor(Math.random()*10)+1;
			let $쪼개라 = "ㅋ";
			let $작작쪼개 = $쪼개라.repeat($뭘쪼개);
			$메시지.channel.send($작작쪼개);
		}
	}

	/**
	 * 봇 접사로 시작하지 않는 메시지는 리턴합니다.
	 */
	if(!$메시지.content.startsWith($감자야)) return;

	/**
	 * 봇 접사로 시작하지 않는 메시지는 리턴합니다.
	 */
	console.log(`${$메시지.author.username.toString()}(${$메시지.author.id.toString()}): ${$메시지.content.toString()}`);

	/**
	 * 콘솔과 로그 체널에 메시지 기록을 남깁니다.
	 */
	$감자봇.channels.get($로그).send(`${$메시지.author.username.toString()}(${$메시지.author.id.toString()}): ${$메시지.content.toString()}`);

	/**
	 * 쿨다운을 보냅니다.
	 */
	if($쿨다운.has($메시지.author.id)){
		$메시지.delete();
		$메시지.channel.send(`<:warn:511059374073053184> 원활한 이용을 위해 쿨다운제를 적용중입니다. ${$쿨다운시간}초 후에 다시 매세지를 보내보세요!`).then((thismsg) => thismsg.delete(2000));
		console.log(`${$메시지.author.username.toString()}(${$메시지.author.id.toString()}) 쿨다운`)
		return;
	}
	$쿨다운.add($메시지.author.id);

	/**
	 * @param $감자부른후할말 봇 명령어를 가져옵니다.
	 * @param $명령어가져와 명령어를 불러옵니다.
	 * @param $명령어파일실행 명령어를 실행합니다.
	 */
	let $감자부른후할말 = $메시지.content.split(" ");
	let $감자를귀찮게할정도 = $메시지.content.slice($감자야.length);
	let i = $감자부른후할말[0];
	let $쪼개 = $감자부른후할말.slice(2);
	let $명령어가져와 = $감자부른후할말[1]
	
	let $명령어파일실행 = $감자봇.commands.get($명령어가져와);
	if ('감자야' === $메시지.content) {
		$메시지.channel.send(`왜`);
	} 
	else {
		if($명령어파일실행) $명령어파일실행.run($감자봇, $메시지, $쪼개);
		else{
			//자동 질문답변
		}
	}

	setTimeout(() => {
		$쿨다운.delete($메시지.author.id);
	}, $쿨다운시간 * 1000);
});