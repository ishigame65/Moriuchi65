/* @author moriuchi 2024/10
 * © 2024 moriuchi65.
 * ES6
 */

let app;

window.onload = () => {
	app = new App();
	try {
		app.init();
		app.updateValues();
	}
	catch(e){
		console.log(e);
		alert("エラー:"+e);
	}
};

class App {

	constructor(){
		this.titleText = null;
		this.instructionText = null;
		this.contentsText = null;
		this.nenkinValues = null;
		this.qaTitle = null;
		this.qaInstruction = null;
		this.valuesMap = null;
		this.spanKisoMangakuSet = null;
		this.spanOTsuika = null;
		this.spanOKisoZobun = null;
		this.spanTTsuika = null;
		this.spanTKisoZobun = null;
		this.spanONofuGessuSet = null;
		this.spanTNofuGessuSet = null;
		this.spanHokenryoGetsugaku = null;
		this.spanOFukaHokenryo = null;
		this.spanOFukaGessuSet = null;
		this.spanOFukaZobunSet = null;
		this.spanTFukaHokenryo = null;
		this.spanTFukaGessuSet = null;
		this.spanTFukaZobunSet = null;
		this.spanOKisoNenkingakuSet = null;
		this.spanTKisoNenkingakuSet = null;
		this.spanKoseiNenkingakuSet = null;
		this.spanKoseiHoshuSet = null;
		this.spanKoseiKakyuSet = null;
		this.spanKoseiKakyuTokubetsu = null;
		this.spanKoseiKakyuTsumaSet = null;
		this.spanIzokuNenkingakuSet = null;
		this.spanIzokuKafuSet = null;
		this.spanIzokuKisoNenkingakuSet = null;
		this.spanIzokuKisoKoSet = null;
		this.spanIzokuKisoKo2nin = null;
		this.spanFukaKasanSet = null;
		this.spanFukaGetsugakuSet = null;
		this.spanFukaNenKasan = null;
		this.spanFukaNengaku = null;
		this.spanGetsugaku = null;
		this.spanNengaku = null;
		this.spanNengaku2nin = null;
		this.spanJa1Set = null;
		this.spanJa2Set = null;
		this.spanJa3 = null;
		this.spanJa4Set = null;
		this.spanJb3Set = null;
		this.spanJc1 = null;
		this.spanJc2 = null;
	}

	// 初期化処理
	init(){
		this.titleText = document.querySelector("#TITLE_TEXT");
		this.instructionText = document.querySelector("#INSTRUCTION_TEXT");
		this.contentsText = document.querySelector("#CONTENTS_TEXT");
		this.nenkinValues = document.querySelector("#QACONTENTS");
		this.qaTitle = document.querySelector("#QATITLE");
		this.qaInstruction = document.querySelector("#QAINSTRUCTION");
		FileUtil.initDnDReadText(this.contentsText, null, text => this.setText(text));
		this.valuesMap = new Map();
		this.spanKisoMangakuSet = Array.from(document.getElementsByClassName("KISOMANGAKU"));
		this.spanHokenryoGetsugakuSet = Array.from(document.getElementsByClassName("HOKENRYOGETSUGAKU"));
		this.spanOTsuika = document.querySelector("#O_TSUIKA");
		this.spanOKisoZobun = document.querySelector("#O_KISOZOBUN");
		this.spanTTsuika = document.querySelector("#T_TSUIKA");
		this.spanTKisoZobun = document.querySelector("#T_KISOZOBUN");
		this.spanONofuGessuSet = Array.from(document.getElementsByClassName("O_NOFUGESSU"));
		this.spanTNofuGessuSet = Array.from(document.getElementsByClassName("T_NOFUGESSU"));
		this.spanOFukaHokenryo = document.querySelector("#O_FUKAHOKENRYO");
		this.spanOFukaGessuSet = Array.from(document.getElementsByClassName("O_FUKAGESSU"));
		this.spanOFukaZobunSet = Array.from(document.getElementsByClassName("O_FUKAZOBUN"));
		this.spanTFukaHokenryo = document.querySelector("#T_FUKAHOKENRYO");
		this.spanTFukaGessuSet = Array.from(document.getElementsByClassName("T_FUKAGESSU"));
		this.spanTFukaZobunSet = Array.from(document.getElementsByClassName("T_FUKAZOBUN"));
		this.spanOKisoNenkingakuSet = Array.from(document.getElementsByClassName("O_KISONENKINGAKU"));
		this.spanTKisoNenkingakuSet = Array.from(document.getElementsByClassName("T_KISONENKINGAKU"));
		this.spanKoseiNenkingakuSet = Array.from(document.getElementsByClassName("KOSEINENKINGAKU"));
		this.spanKoseiHoshuSet = Array.from(document.getElementsByClassName("KOSEIHOSHU"));
		this.spanKoseiKakyuSet = Array.from(document.getElementsByClassName("KOSEIKAKYU"));
		this.spanKoseiKakyuTokubetsu = document.querySelector("#KOSEIKAKYUTOKUBETSU");
		this.spanKoseiKakyuTsumaSet = Array.from(document.getElementsByClassName("KOSEIKAKYUTSUMA"));
		this.spanIzokuNenkingakuSet = Array.from(document.getElementsByClassName("IZOKUNENKINGAKU"));
		this.spanIzokuKafuSet = Array.from(document.getElementsByClassName("IZOKUKAFU"));		
		this.spanIzokuKisoNenkingakuSet = Array.from(document.getElementsByClassName("IZOKUKISONENKINGAKU"));
		this.spanIzokuKisoKoSet = Array.from(document.getElementsByClassName("IZOKUKISOKO"));
		this.spanIzokuKisoKo2nin = document.querySelector("#IZOKUKISOKO2NIN");
		this.spanFukaKasanSet = Array.from(document.getElementsByClassName("FUKAKASAN"));
		this.spanFukaGetsugakuSet = Array.from(document.getElementsByClassName("FUKAGETSUGAKU"));
		this.spanFukaNenKasan = document.querySelector("#FUKANENKASAN");
		this.spanFukaNengaku = document.querySelector("#FUKANENGAKU");
		this.spanGetsugaku = document.querySelector("#GETSUGAKU");
		this.spanNengaku = document.querySelector("#NENGAKU");
		this.spanNengaku2nin = document.querySelector("#NENGAKU2NIN");
		this.spanJa1Set = Array.from(document.getElementsByClassName("JA1"));
		this.spanJa2Set = Array.from(document.getElementsByClassName("JA2"));
		this.spanJa3 = document.querySelector("#JA3");
		this.spanJa4Set = Array.from(document.getElementsByClassName("JA4"));
		this.spanJb3Set = Array.from(document.getElementsByClassName("JB3"));
		this.spanJc1 = document.querySelector("#JC1");
		this.spanJc2 = document.querySelector("#JC2");
	}
	// IZOKUNENKINGAKU, IZOKUKAFU
	
	// 計算式更新
	updateCalc(){
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
		this.spanKisoMangakuSet.forEach(v => { v.innerText = kisoMangaku.toLocaleString(); });
		this.spanFukaKasanSet.forEach(v => { v.innerText = fukaKasan.toLocaleString(); });
		this.spanOTsuika.innerText = (hokenryoGetsugaku * 60).toLocaleString();
		this.spanOKisoZobun.innerText = (kisoMangaku * 60 / 480).toLocaleString();
		this.spanTTsuika.innerText = (hokenryoGetsugaku * 40).toLocaleString();
		this.spanTKisoZobun.innerText = (kisoMangaku * 40 / 480).toLocaleString();
		this.spanONofuGessuSet.forEach(v => { v.innerText = oNofuGessu.toLocaleString(); });
		this.spanTNofuGessuSet.forEach(v => { v.innerText = tNofuGessu.toLocaleString(); });
		this.spanHokenryoGetsugakuSet.forEach(v => { v.innerText = hokenryoGetsugaku.toLocaleString(); });
		this.spanOFukaHokenryo.innerText = (400 * oFukaGessu).toLocaleString();
		this.spanTFukaHokenryo.innerText = (400 * tFukaGessu).toLocaleString();
		this.spanOFukaGessuSet.forEach(v => { v.innerText = oFukaGessu.toLocaleString(); });
		this.spanTFukaGessuSet.forEach(v => { v.innerText = tFukaGessu.toLocaleString(); });
		this.spanOFukaZobunSet.forEach(v => { v.innerText = oFukaNenkingaku.toLocaleString(); });
		this.spanTFukaZobunSet.forEach(v => { v.innerText = tFukaNenkingaku.toLocaleString(); });
		this.spanOKisoNenkingakuSet.forEach(v => { v.innerText = oKisoNenkingaku.toLocaleString(); });
		this.spanTKisoNenkingakuSet.forEach(v => { v.innerText = tKisoNenkingaku.toLocaleString(); });
		this.spanKoseiNenkingakuSet.forEach(v => { v.innerText = koseiNenkingaku.toLocaleString(); });
		this.spanKoseiHoshuSet.forEach(v => { v.innerText = koseiHoshu.toLocaleString(); });
		this.spanKoseiKakyuSet.forEach(v => { v.innerText = koseiKakyu.toLocaleString(); });
		this.spanKoseiKakyuTokubetsu.innerText = koseiKakyuTokubetsu.toLocaleString();
		this.spanKoseiKakyuTsumaSet.forEach(v => { v.innerText = (koseiKakyu + koseiKakyuTokubetsu).toLocaleString(); });
		this.spanIzokuNenkingakuSet.forEach(v => { v.innerText = izokuNenkingaku.toLocaleString(); });
		this.spanIzokuKafuSet.forEach(v => { v.innerText = izokuKafu.toLocaleString(); });
		this.spanIzokuKisoNenkingakuSet.forEach(v => { v.innerText = izokuKisoNenkingaku.toLocaleString(); });
		this.spanIzokuKisoKoSet.forEach(v => { v.innerText = izokuKisoKo.toLocaleString(); });
		this.spanIzokuKisoKo2nin.innerText = (izokuKisoNenkingaku + izokuKisoKo).toLocaleString();
		this.spanFukaGetsugakuSet.forEach(v => { v.innerText = fukaGetsugaku.toLocaleString(); });
		this.spanFukaNenKasan.innerText = (fukaKasan * 12).toLocaleString();
		this.spanFukaNengaku.innerText = (fukaGetsugaku * 12).toLocaleString();
		this.spanGetsugaku.innerText = getsugaku.toLocaleString();
		this.spanNengaku.innerText = (getsugaku * 12).toLocaleString();
		this.spanNengaku2nin.innerText = (getsugaku * 24).toLocaleString();
		const ja1 = oKisoNenkingaku + koseiNenkingaku + koseiKakyu + koseiKakyuTokubetsu + koseiKakyu;
		const ja2 = oKisoNenkingaku + koseiNenkingaku + koseiKakyu + koseiKakyuTokubetsu;
		const ja3 = oKisoNenkingaku + koseiNenkingaku;
		const ja4 = izokuNenkingaku + tKisoNenkingaku;
		const jb3 = izokuNenkingaku + izokuKafu;
		const jc1 = izokuNenkingaku + izokuKisoNenkingaku + izokuKisoKo + izokuKisoKo;
		const jc2 = izokuNenkingaku + izokuKisoNenkingaku + izokuKisoKo;
		this.spanJa1Set.forEach(v => { v.innerText = ja1.toLocaleString(); });
		this.spanJa2Set.forEach(v => { v.innerText = ja2.toLocaleString(); });
		this.spanJa3.innerText = ja3.toLocaleString();
		this.spanJa4Set.forEach(v => { v.innerText = ja4.toLocaleString(); });
		this.spanJb3Set.forEach(v => { v.innerText = jb3.toLocaleString(); });
		this.spanJc1.innerText = jc1.toLocaleString();
		this.spanJc2.innerText = jc2.toLocaleString();
	}

	// 規定値更新
	updateValues(){
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
			this.updateTable();	// 規定値テーブル更新
			this.updateCalc();	// 計算式更新
		}
		catch(e){
			console.error(e);
			this.nenkinValues.innerHTML = e.stack;
		}
	}
	
	// 規定値テーブル更新
	updateTable(){
		const varkeys = [
			"老齢基礎年金満額","夫老齢厚生年金","夫老齢厚生年金報酬比例部分","厚生年金加給年金",
			"厚生年金加給年金配偶者特別加算","遺族厚生年金中高齢寡婦加算","遺族基礎年金額","遺族基礎年金子加算額",
			"国民年金保険料月額"];
		try{
			this.nenkinValues.innerHTML = "";
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
			this.nenkinValues.innerHTML = result;
		}
		catch(e){
			console.error(e);
			this.nenkinValues.innerHTML = e.stack;
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
