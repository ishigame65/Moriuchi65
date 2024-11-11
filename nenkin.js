/* @author moriuchi 2024/10
 * © 2024 moriuchi65.
 * ES6
 */

let app;

window.onload = () => {
	app = new App();
	try {
		app.init();
		app.updateParams();
	}
	catch(e){
		console.log(e);
		alert("エラー:"+e);
	}
};

class App {

	constructor(){
		this.contentsText = null;
		this.nenkinParams = null;
		this.valuesMap = null;
		this.spanKisoMangaku = null;
		this.spanOTsuika = this.spanOKisoZobun = this.spanONofuGessu = null;
		this.spanTTsuika = this.spanTKisoZobun = this.spanTNofuGessu = null;
		this.spanHokenryoGetsugaku = null;
		this.spanOFukaHokenryo = this.spanOFukaGessu = this.spanOFukaZobun = null;
		this.spanTFukaHokenryo = this.spanTFukaGessu = this.spanTFukaZobun = null;
		this.spanOKisoNenkingaku = this.spanTKisoNenkingaku = null;
		this.spanKoseiNenkingaku = this.spanKoseiHoshu = null;
		this.spanKoseiKakyu = this.spanKoseiKakyuTokubetsu = this.spanKoseiKakyuTsuma = null;
		this.spanIzokuNenkingaku = this.spanIzokuKafu = null;
		this.spanIzokuKisoNenkingaku = this.spanIzokuKisoKo = this.spanIzokuKisoKo2nin = null;
		this.spanFukaKasan = this.spanFukaGetsugaku = this.spanFukaNenKasan = this.spanFukaNengaku = null;
		this.spanJa1 = this.spanJa2 = this.spanJa3 = null;
		this.spanJa4 = this.spanJb3 = this.spanJc1 = this.spanJc2 = null;
		this.spanGetsugaku = null;
		this.spanNengaku = this.spanNengaku2nin = this.spanNengaku1kodomo = null;
		this.spanNenp25 = this.spanNenp30 = this.spanNenp31 = null;	// 国民年金保険
		this.spanNenp32 = this.spanNenp37 = this.spanNenp38 = this.spanNenp49 = null;
		this.result = null;
	}

	// 初期化処理
	init(){
		this.contentsText = document.querySelector("#CONTENTS_TEXT");
		this.nenkinParams = document.querySelector("#NENKIN_PARAMS");
		FileUtil.initDnDReadText(this.contentsText, null, text => this.setText(text));
		this.valuesMap = new Map();
		this.spanKisoMangaku = Array.from(document.getElementsByClassName("KISOMANGAKU"));
		this.spanHokenryoGetsugakuSet = Array.from(document.getElementsByClassName("HOKENRYOGETSUGAKU"));
		this.spanOTsuika = document.querySelector("#O_TSUIKA");
		this.spanOKisoZobun = document.querySelector("#O_KISOZOBUN");
		this.spanTTsuika = document.querySelector("#T_TSUIKA");
		this.spanTKisoZobun = document.querySelector("#T_KISOZOBUN");
		this.spanONofuGessu = Array.from(document.getElementsByClassName("O_NOFUGESSU"));
		this.spanTNofuGessu = Array.from(document.getElementsByClassName("T_NOFUGESSU"));
		this.spanOFukaHokenryo = document.querySelector("#O_FUKAHOKENRYO");
		this.spanOFukaGessu = Array.from(document.getElementsByClassName("O_FUKAGESSU"));
		this.spanOFukaZobun = Array.from(document.getElementsByClassName("O_FUKAZOBUN"));
		this.spanTFukaHokenryo = document.querySelector("#T_FUKAHOKENRYO");
		this.spanTFukaGessu = Array.from(document.getElementsByClassName("T_FUKAGESSU"));
		this.spanTFukaZobun = Array.from(document.getElementsByClassName("T_FUKAZOBUN"));
		this.spanOKisoNenkingaku = Array.from(document.getElementsByClassName("O_KISONENKINGAKU"));
		this.spanTKisoNenkingaku = Array.from(document.getElementsByClassName("T_KISONENKINGAKU"));
		this.spanKoseiNenkingaku = Array.from(document.getElementsByClassName("KOSEINENKINGAKU"));
		this.spanKoseiHoshu = Array.from(document.getElementsByClassName("KOSEIHOSHU"));
		this.spanKoseiKakyu = Array.from(document.getElementsByClassName("KOSEIKAKYU"));
		this.spanKoseiKakyuTokubetsu = document.querySelector("#KOSEIKAKYUTOKUBETSU");
		this.spanKoseiKakyuTsuma = Array.from(document.getElementsByClassName("KOSEIKAKYUTSUMA"));
		this.spanIzokuNenkingaku = Array.from(document.getElementsByClassName("IZOKUNENKINGAKU"));
		this.spanIzokuKafu = Array.from(document.getElementsByClassName("IZOKUKAFU"));		
		this.spanIzokuKisoNenkingaku = Array.from(document.getElementsByClassName("IZOKUKISONENKINGAKU"));
		this.spanIzokuKisoKo = Array.from(document.getElementsByClassName("IZOKUKISOKO"));
		this.spanIzokuKisoKo2nin = document.querySelector("#IZOKUKISOKO2NIN");
		this.spanFukaKasan = Array.from(document.getElementsByClassName("FUKAKASAN"));
		this.spanFukaGetsugaku = Array.from(document.getElementsByClassName("FUKAGETSUGAKU"));
		this.spanFukaNenKasan = document.querySelector("#FUKANENKASAN");
		this.spanFukaNengaku = document.querySelector("#FUKANENGAKU");
		this.spanJa1 = Array.from(document.getElementsByClassName("JA1"));
		this.spanJa2 = Array.from(document.getElementsByClassName("JA2"));
		this.spanJa3 = document.querySelector("#JA3");
		this.spanJa4 = Array.from(document.getElementsByClassName("JA4"));
		this.spanJb3 = Array.from(document.getElementsByClassName("JB3"));
		this.spanJc1 = document.querySelector("#JC1");
		this.spanJc2 = document.querySelector("#JC2");
		this.spanGetsugaku = Array.from(document.getElementsByClassName("GETSUGAKU"));
		this.spanNengaku = Array.from(document.getElementsByClassName("NENGAKU"));
		this.spanNengaku2nin = Array.from(document.getElementsByClassName("NENGAKU2NIN"));
		this.spanNengaku1kodomo = Array.from(document.getElementsByClassName("NENGAK1KODOMO"));
		this.spanNenp25 = Array.from(document.getElementsByClassName("NENP25"));
		this.spanNenp30 = Array.from(document.getElementsByClassName("NENP30"));
		this.spanNenp31 = Array.from(document.getElementsByClassName("NENP31"));
		this.spanNenp32 = Array.from(document.getElementsByClassName("NENP32"));
		this.spanNenp37 = Array.from(document.getElementsByClassName("NENP37"));
		this.spanNenp38 = Array.from(document.getElementsByClassName("NENP38"));
		this.spanNenp49 = Array.from(document.getElementsByClassName("NENP49"));
	}
	
	// 計算式更新
	calcNenkin(){
		const vmap = this.valuesMap;
		const kisoMangaku = Number(vmap.get('老齢基礎年金満額'));
		const fukaKasan = Number(vmap.get('付加年金加算額'));
		const oNofuGessu = Number(vmap.get('夫年金保険料納付月数'));
		const oFukaGessu = Number(vmap.get('夫付加保険料納付月数'));
		const koseiNenkingaku = Number(vmap.get('夫老齢厚生年金'));
		const koseiHoshu = Number(vmap.get('夫老齢厚生年金報酬比例部分'));
		const koseiKakyu = Number(vmap.get('厚生年金加給年金'));
		const koseiKakyuTokubetsu = Number(vmap.get('厚生年金加給年金配偶者特別加算'));
		const tNofuGessu = Number(vmap.get('妻年金保険料納付月数'));
		const tFukaGessu = Number(vmap.get('妻付加保険料納付月数'));
		const izokuKafu = Number(vmap.get('遺族厚生年金中高齢寡婦加算'));
		const izokuKisoNenkingaku = Number(vmap.get('遺族基礎年金額'));
		const izokuKisoKo = Number(vmap.get('遺族基礎年金子加算額'));
		const hokenryoGetsugaku = Number(vmap.get('国民年金保険料月額'));
		const fukaGetsugaku = Number(vmap.get('国民年金付加保険料'));
		const oFukaNenkingaku = 200 * oFukaGessu;
		const tFukaNenkingaku = 200 * tFukaGessu;
		const izokuNenkingaku = Math.round(koseiHoshu * 3 / 4);
		const getsugaku = hokenryoGetsugaku + fukaGetsugaku;
		const oKisoNenkingaku = kisoMangaku * oNofuGessu / 480 + oFukaNenkingaku;
		const tKisoNenkingaku = kisoMangaku * tNofuGessu / 480 + tFukaNenkingaku;
		this.spanKisoMangaku.forEach(v => { v.innerText = kisoMangaku.toLocaleString(); });
		this.spanFukaKasan.forEach(v => { v.innerText = fukaKasan.toLocaleString(); });
		this.spanOTsuika.innerText = (hokenryoGetsugaku * 60).toLocaleString();
		this.spanOKisoZobun.innerText = (kisoMangaku * 60 / 480).toLocaleString();
		this.spanTTsuika.innerText = (hokenryoGetsugaku * 40).toLocaleString();
		this.spanTKisoZobun.innerText = (kisoMangaku * 40 / 480).toLocaleString();
		this.spanONofuGessu.forEach(v => { v.innerText = oNofuGessu.toLocaleString(); });
		this.spanTNofuGessu.forEach(v => { v.innerText = tNofuGessu.toLocaleString(); });
		this.spanHokenryoGetsugakuSet.forEach(v => { v.innerText = hokenryoGetsugaku.toLocaleString(); });
		this.spanOFukaHokenryo.innerText = (400 * oFukaGessu).toLocaleString();
		this.spanTFukaHokenryo.innerText = (400 * tFukaGessu).toLocaleString();
		this.spanOFukaGessu.forEach(v => { v.innerText = oFukaGessu.toLocaleString(); });
		this.spanTFukaGessu.forEach(v => { v.innerText = tFukaGessu.toLocaleString(); });
		this.spanOFukaZobun.forEach(v => { v.innerText = oFukaNenkingaku.toLocaleString(); });
		this.spanTFukaZobun.forEach(v => { v.innerText = tFukaNenkingaku.toLocaleString(); });
		this.spanOKisoNenkingaku.forEach(v => { v.innerText = oKisoNenkingaku.toLocaleString(); });
		this.spanTKisoNenkingaku.forEach(v => { v.innerText = tKisoNenkingaku.toLocaleString(); });
		this.spanKoseiNenkingaku.forEach(v => { v.innerText = koseiNenkingaku.toLocaleString(); });
		this.spanKoseiHoshu.forEach(v => { v.innerText = koseiHoshu.toLocaleString(); });
		this.spanKoseiKakyu.forEach(v => { v.innerText = koseiKakyu.toLocaleString(); });
		this.spanKoseiKakyuTokubetsu.innerText = koseiKakyuTokubetsu.toLocaleString();
		this.spanKoseiKakyuTsuma.forEach(v => { v.innerText = (koseiKakyu + koseiKakyuTokubetsu).toLocaleString(); });
		this.spanIzokuNenkingaku.forEach(v => { v.innerText = izokuNenkingaku.toLocaleString(); });
		this.spanIzokuKafu.forEach(v => { v.innerText = izokuKafu.toLocaleString(); });
		this.spanIzokuKisoNenkingaku.forEach(v => { v.innerText = izokuKisoNenkingaku.toLocaleString(); });
		this.spanIzokuKisoKo.forEach(v => { v.innerText = izokuKisoKo.toLocaleString(); });
		this.spanIzokuKisoKo2nin.innerText = (izokuKisoNenkingaku + izokuKisoKo).toLocaleString();
		this.spanFukaGetsugaku.forEach(v => { v.innerText = fukaGetsugaku.toLocaleString(); });
		this.spanFukaNenKasan.innerText = (fukaKasan * 12).toLocaleString();
		this.spanFukaNengaku.innerText = (fukaGetsugaku * 12).toLocaleString();

		const ja1 = oKisoNenkingaku + koseiNenkingaku + koseiKakyu + koseiKakyuTokubetsu + koseiKakyu;
		const ja2 = oKisoNenkingaku + koseiNenkingaku + koseiKakyu + koseiKakyuTokubetsu;
		const ja3 = oKisoNenkingaku + koseiNenkingaku;
		const ja4 = izokuNenkingaku + tKisoNenkingaku;
		const jb3 = izokuNenkingaku + izokuKafu;
		const jc1 = izokuNenkingaku + izokuKisoNenkingaku + izokuKisoKo + izokuKisoKo;
		const jc2 = izokuNenkingaku + izokuKisoNenkingaku + izokuKisoKo;
		this.spanJa1.forEach(v => { v.innerText = ja1.toLocaleString(); });
		this.spanJa2.forEach(v => { v.innerText = ja2.toLocaleString(); });
		this.spanJa3.innerText = ja3.toLocaleString();
		this.spanJa4.forEach(v => { v.innerText = ja4.toLocaleString(); });
		this.spanJb3.forEach(v => { v.innerText = jb3.toLocaleString(); });
		this.spanJc1.innerText = jc1.toLocaleString();
		this.spanJc2.innerText = jc2.toLocaleString();
		
		this.spanGetsugaku.forEach(v => { v.innerText = getsugaku.toLocaleString(); });
		this.spanNengaku.forEach(v => { v.innerText = (getsugaku * 12).toLocaleString(); });
		this.spanNengaku2nin.forEach(v => { v.innerText = (getsugaku * 24).toLocaleString(); });
		this.spanNengaku1kodomo.forEach(v => { v.innerText = (hokenryoGetsugaku * 12).toLocaleString(); });
		const nenp25 = getsugaku * 24;
		const nenp30 = getsugaku * 14;
		const nenp31 = getsugaku * 12 + hokenryoGetsugaku * 2;
		const nenp32 = getsugaku * 12 + hokenryoGetsugaku * 12;
		const nenp37 = getsugaku * 12 + hokenryoGetsugaku * 3;
		const nenp38 = getsugaku * 12;
		const nenp49 = getsugaku * 2;
		this.spanNenp25.forEach(v => { v.innerText = nenp25.toLocaleString(); });
		this.spanNenp30.forEach(v => { v.innerText = nenp30.toLocaleString(); });
		this.spanNenp31.forEach(v => { v.innerText = nenp31.toLocaleString(); });
		this.spanNenp32.forEach(v => { v.innerText = nenp32.toLocaleString(); });
		this.spanNenp37.forEach(v => { v.innerText = nenp37.toLocaleString(); });
		this.spanNenp38.forEach(v => { v.innerText = nenp38.toLocaleString(); });
		this.spanNenp49.forEach(v => { v.innerText = nenp49.toLocaleString(); });

		let text = "";
		text += `夫年金受給で65歳未満妻と子の夫課税年金額：${ja1}\n`;
		text += `夫年金受給で65歳未満妻の夫課税年金額：${ja2}\n`;
		text += `夫妻年金受給の夫課税年金額：${ja3}\n`;
		text += `妻年金受給の妻課税年金額：${tKisoNenkingaku}\n`;
		text += `夫亡き妻65歳未満で子が2人の妻年金額：${jc1}\n`;
		text += `夫亡き妻65歳未満で子が1人の妻年金額：${jc2}\n`;
		text += `夫亡き妻65歳未満の妻年金額：${jb3}\n`;
		text += `夫亡き妻年金受給の妻年金額：${ja4}\n`;
		text += `国民年金納付額2025～2029年：${nenp25}\n`;
		text += `国民年金納付額2030年：${nenp30}\n`;
		text += `国民年金納付額2031年：${nenp31}\n`;
		text += `国民年金納付額2032～2036年：${nenp32}\n`;
		text += `国民年金納付額2037年：${nenp37}\n`;
		text += `国民年金納付額2038～2048年：${nenp38}\n`;
		text += `国民年金納付額2049年：${nenp49}\n`;
		this.result = text;
	}

	// パラメータ値更新
	updateParams(){
		const vmap = this.valuesMap;
		try{
			// 規定値マップ作成
			const text = this.contentsText.value;
			vmap.clear();
			for (let line of text.split('\n')){	// 1行ずつ
				let word = line.split(/:|：/);
				if (word == ''){
					continue;
				}
				if (word.length > 1){
					vmap.set(word[0], word[1]);
				}
			}
			this.viewNenkinParams();	// 年金規定値表示
			this.calcNenkin();	// 計算式更新
		}
		catch(e){
			console.error(e);
			this.nenkinParams.innerHTML = e.stack;
		}
	}
	
	// 年金規定値表示
	viewNenkinParams(){
		const varkeys = [
			"老齢基礎年金満額","夫老齢厚生年金","夫老齢厚生年金報酬比例部分","厚生年金加給年金",
			"厚生年金加給年金配偶者特別加算","遺族厚生年金中高齢寡婦加算","遺族基礎年金額","遺族基礎年金子加算額",
			"国民年金保険料月額"];
		try{
			this.nenkinParams.innerHTML = "";
			let result = '<table class="VALUES">';
			result += '<tr><th>項目</th><th>値</th></tr>';
			this.valuesMap.forEach((value, key) => {
				result += '<tr><td>';
				result += key;
				result += '</td><td>';
				if (varkeys.includes(key)){
					result += '<b>';
					result += Number(value).toLocaleString();	// コンマ区切り
					result += '</b>';
				} else {
					result += Number(value).toLocaleString();	// コンマ区切り
				}
				result += '</td></tr>';				
			});
			result += '</table>';
			//console.log(result);
			this.nenkinParams.innerHTML = result;
		}
		catch(e){
			console.error(e);
			this.nenkinParams.innerHTML = e.stack;
		}
	}

	// 規定値テキストを設定
	setText(text){
		// innerText、innerHTMLだと改行がらみでNG
		this.contentsText.value = text;
	}

	// 規定値テキストをファイルから読み込む
	async readFile(file){
		const text = await FileUtil.readTextSync(file);
		if (text){
			// innerText、innerHTMLだと改行がらみでNG
			this.contentsText.value = text;
		}
		else {
			alert(`ファイルがありません`);
		}
	}
	
	// 規定値テキストをダウンロード
	downloadText(filename){
		const text = this.contentsText.value;
		FileUtil.downloadText(text, filename);
	}
	
	// 規定値テキストをクリア
	clearText(){
		//console.log(this.contentsText.value);	// for debug
		//this.contentsText.innerText = '';
		this.contentsText.value = '';
	}

	// 結果をダウンロード
	downloadResult(filename){
		FileUtil.downloadText(this.result, filename);
	}

	/*
	-------------------------
	（税金用）
	夫年金受給で65歳未満妻と子の夫課税年金額	ja1
	夫年金受給で65歳未満妻の夫課税年金額	ja2
	夫妻年金受給の夫課税年金額	ja3
	妻年金受給の妻課税年金額		tKisoNenkingaku
	夫亡き妻65歳未満で子が2人の妻年金額	(jc1)
	夫亡き妻65歳未満で子が1人の妻年金額	(jc2)
	夫亡き妻65歳未満の妻年金額	(jb3)
	夫亡き妻年金受給の妻年金額	(ja4)
	国民年金納付額2025～2029年	nenp25
	国民年金納付額2030年	nenp30
	国民年金納付額2031年	nenp31
	国民年金納付額2032～2036年	nenp32
	国民年金納付額2037年	nenp37
	国民年金納付額2038～2048年	nenp38
	国民年金納付額2049年	nenp49
	-------------------------
	（受給額）
	夫年金受給で65歳未満の妻の夫年金額	ja1
	夫年金受給で65歳未満の妻の夫年金額	ja2
	夫妻年金受給の夫年金額	ja3, tKisoNenkingaku
	夫亡き妻65歳未満で子が2人の夫年金額	JC1
	夫亡き妻65歳未満で子が1人の夫年金額	JC2
	夫亡き妻65歳未満の夫年金額	JB3
	夫亡き妻年金受給の夫年金額	JA4
	-------------------------
	*/

}

// Python's zip
function* zip(...args){
    const length = args[0].length;    
    for (let arr of args){
        if (arr.length !== length){
            throw "Lengths of arrays are not eqaul.";
        }
    }
    for (let index = 0; index < length; index++){
        let elms = [];
        for (arr of args){
            elms.push(arr[index]);
        }
        yield elms;
    }
}
