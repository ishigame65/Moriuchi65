/* @author moriuchi 2024/10
 * © 2024 moriuchi65.
 */
/* 覚書き
 * ES2022からクラスフィールド宣言ができる。static, #(private)も付けれる
 */

let app;

window.onload = () => {
	app = new App();
	try {
		app.run();
	}
	catch(e){
		console.log(e);
		alert("エラー:"+e);
	}
};

// 税金データ値画面部品
class CalcValuesWidget {
	spANen25o = null;	// AONEN25

	constructor(){
		this.spANen25o = Array.from(document.getElementsByClassName("AONEN25"));
	}
	update(value){	// 更新
		this.spANen25o.forEach(v => { v.innerText = value.aNen25o.toLocaleString(); });
	}
}

class App {
	contentsText = null;
	zeiTable = null;
	zeiValMap = null;	// 税金データ値
	contentsText2 = null;
	zeiTable2 = null;
	zei2ValMap = null;	// 税金データ値
	zeiCalcTable = null;
	zeiCalcValMap = null;
	livingTable = null;
	livingValMap = null;	// 生活費
	inputYokin = null;
	inputJumyo = null;
	inputZandaka = null;

	constructor(){
		this.contentsText = document.querySelector("#CONTENTS_TEXT");
		this.contentsText2 = document.querySelector("#CONTENTS_TEXT2");
		this.contentsText3 = document.querySelector("#CONTENTS_TEXT3");
		this.zeiTable = document.querySelector("#ZEIKIN_TABLE");
		this.zeiTable2 = document.querySelector("#ZEIKIN_TABLE2");
		this.zeiCalcTable = document.querySelector("#ZCALC_TABLE");
		this.livingTable = document.querySelector("#LIVING_TABLE");		
		FileUtil.initDnDReadText(this.contentsText, null, text => this.setText(text));
		FileUtil.initDnDReadText(this.contentsText2, null, text => this.setText2(text));
		FileUtil.initDnDReadText(this.contentsText3, null, text => this.setText3(text));
		this.zeiCalcValMap = new Map();
		this.zeiValMap = new Map();
		this.zei2ValMap = new Map();
		this.livingValMap = new Map();
		this.inputYokin = document.querySelector("#YOKIN");
		this.inputJumyo = document.querySelector("#JUMYO");
		this.inputZandaka = document.querySelector("#ZANDAKA");
	}

	// 実行（GUIロード時に呼ばれる）
	run(){
		this.scanZeikinValues();	// 税金値をテキストから読み取って辞書作成
		this.viewZeikinValues();	// 税金値表示
		this.scanZeikin2Values();	// 税金値をテキストから読み取って辞書作成
		this.viewZeikin2Values();	// 税金値表示
		this.scanLivingValues();	// 生活費をテキストから読み取って辞書作成
		this.viewLivingValues();	// 生活費表示
	}

	// 税金値更新（GUIボタン押しで呼ばれる）
	updateZeikinValues(){
		this.scanZeikinValues();	// 税金値をテキストから読み取って辞書作成
		this.viewZeikinValues();	// 税金値表示
	}
	updateZeikin2Values(){
		this.scanZeikin2Values();	// 税金値をテキストから読み取って辞書作成
		this.viewZeikin2Values();	// 税金値表示
	}
	updateLivingCost(){
		this.scanLivingValues();	// 生活費をテキストから読み取って辞書作成
		this.viewLivingValues();	// 生活費表示
	}

	// 税金値をテキストから読み取って辞書作成
	scanZeikinValues(){
		const zmap = this.zeiValMap;
		try{
			zmap.clear();
			for (let line of this.contentsText.value.split('\n')){	// 1行ずつ
				if (line.startsWith("年")) continue;
				let words = line.split(",");
				if (words == '') continue;
				if (words.length <= 1) continue;
				const top = words.shift();
				zmap.set(top, words);
			}
		}
		catch(e){
			console.error(e);
			this.zeiTable.innerHTML = e.stack;
		}
	}
	scanZeikin2Values(){
		const zmap = this.zei2ValMap;
		try{
			zmap.clear();
			for (let line of this.contentsText2.value.split('\n')){	// 1行ずつ
				if (line.startsWith("年")) continue;
				let words = line.split(",");
				if (words == '') continue;
				if (words.length <= 1) continue;
				const top = words.shift();
				zmap.set(top, words);
			}
		}
		catch(e){
			console.error(e);
			this.zeiTable2.innerHTML = e.stack;
		}
	}
	scanLivingValues(){	// 生活費をテキストから読み取って辞書作成
		const lmap = this.livingValMap;
		try{
			lmap.clear();
			for (let line of this.contentsText3.value.split('\n')){	// 1行ずつ
				if (line.startsWith("年")) continue;
				let words = line.split(",");
				if (words == '') continue;
				if (words.length <= 1) continue;
				const top = words.shift();
				lmap.set(top, words);
			}
		}
		catch(e){
			console.error(e);
			this.livingTable.innerHTML = e.stack;
		}
	}
	
	zeikinTableHeader(){
		let header = '<tr><th rowspan=2>年</th><th colspan=2>受給年金</th><th colspan=2>年金保険料</th>';
		header += '<th>健康保険料</th><th colspan=2>介護保険料</th><th colspan=2>後期高齢者保険料</th>';
		header += '<th colspan=2>所得税</th><th colspan=2>住民税</th></tr>';
		header += '<tr><th>夫</th><th>妻</th><th>夫</th><th>妻</th><th>夫⇒妻</th><th>夫</th><th>妻</th>';
		header += '<th>夫</th><th>妻</th><th>夫</th><th>妻</th><th>夫</th><th>妻</th></tr>';
		return header;
	}

	// 税金値表示
	viewZeikinValues(){
		try{
			this.zeiTable.innerHTML = "";
			let result = '<table class="VALUES">' + this.zeikinTableHeader();
			this.zeiValMap.forEach((values, key) => {
				result += '<tr><td>20' + key + '</td>';
				for (let i = 0; i < values.length; i++) {
					result += '<td>' + Number(values[i]).toLocaleString() + '</td>';
				}
				result += '</tr>';				
			});
			result += '</table>';
			this.zeiTable.innerHTML = result;
		}
		catch(e){
			console.error(e);
			this.zeiTable.innerHTML = e.stack;
		}
	}
	viewZeikin2Values(){
		try{
			this.zeiTable2.innerHTML = "";
			let result = '<table class="VALUES">' + this.zeikinTableHeader();
			this.zei2ValMap.forEach((values, key) => {
				result += '<tr><td>20' + key + '</td>';
				for (let i = 0; i < values.length; i++) {
					result += '<td>' + Number(values[i]).toLocaleString() + '</td>';
				}
				result += '</tr>';				
			});
			result += '</table>';
			this.zeiTable2.innerHTML = result;
		}
		catch(e){
			console.error(e);
			this.zeiTable2.innerHTML = e.stack;
		}
	}
	viewLivingValues(){
		try{
			this.livingTable.innerHTML = "";
			let result = '<table class="VALUES3">';
			result += '<tr><th>年</th><th>収入</th><th>支出</th><th>補足</th></tr>';
			this.livingValMap.forEach((values, key) => {
				result += '<tr><td>20' + key + '</td>';
				for (let i = 0; i < (values.length - 1); i++) {
					result += '<td>' + Number(values[i]).toLocaleString() + '</td>';
				}
				result += '<td>';
				result += values[values.length - 1];
				result += '</td>';
				result += '</tr>';				
			});
			result += '</table>';
			this.livingTable.innerHTML = result;
		}
		catch(e){
			console.error(e);
			this.livingTable.innerHTML = e.stack;
		}
	}

	viewMoneyPlanTable(zmap){
		try{
			let header = '<tr><th rowspan=2>年</th><th colspan=2><span class="color1">受給年金</span></th>';
			header += '<th colspan=2>年金保険料</th><th>健康保険料</th><th colspan=2>介護保険料</th>';
			header += '<th colspan=2>後期高齢者保険料</th><th colspan=2>所得税</th><th colspan=2>住民税</th>';
			header += '<th colspan=2>生活費その他</th><th rowspan=2><span class="color2">残高</span></th></tr>';
			header += '<tr><th>夫</th><th>妻</th><th>夫</th><th>妻</th><th>夫⇒妻</th><th>夫</th><th>妻</th>';
			header += '<th>夫</th><th>妻</th><th>夫</th><th>妻</th><th>夫</th><th>妻</th>';
			header += '<th><span class="color1">収入</span></th><th>支出</th></tr>';

			this.zeiCalcTable.innerHTML = "";
			let result = '<table class="VALUES">' + header;
			const cmap = this.zeiCalcValMap;
			const lmap = this.livingValMap;
			for (let year = 26; year < 72; year++){
				const values = cmap.get(String(year));
				result += '<tr><td>20' + String(year) + '</td>';
				for (let i = 0; i < values.length; i++) {
					result += '<td>' + Number(values[i]).toLocaleString() + '</td>';
				}
				const living = lmap.get(String(year));
				result += '<td>' + Number(living[0]).toLocaleString() + '</td>';
				result += '<td>' + Number(living[1]).toLocaleString() + '</td>';
				const zandaka = zmap.get(year);
				result += '<td><span class="color2">' + zandaka.toLocaleString() + '</span></td>';
				result += '</tr>';				
			}
			result += '</table>';
			this.zeiCalcTable.innerHTML = result;
		}
		catch(e){
			console.error(e);
			this.zeiCalcTable.innerHTML = e;
		}
	}

	// 税金値テキストを設定
	setText(text){
		// innerText、innerHTMLだと改行がらみでNG
		this.contentsText.value = text;
	}
	setText2(text){
		this.contentsText2.value = text;
	}
	setText3(text){
		this.contentsText3.value = text;
	}

	// 税金値テキストをファイルから読み込む
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
	async readFile2(file){
		const text = await FileUtil.readTextSync(file);
		if (text){
			this.contentsText2.value = text;
		}
		else {
			alert(`ファイルがありません`);
		}
	}
	async readFile3(file){
		const text = await FileUtil.readTextSync(file);
		if (text){
			this.contentsText3.value = text;
		}
		else {
			alert(`ファイルがありません`);
		}
	}

	// 税金値テキストをダウンロード
	downloadText(filename){
		const text = this.contentsText.value;
		FileUtil.downloadText(text, filename);
	}
	
	// 税金値テキストをクリア
	clearText(){
		this.contentsText.value = '';
	}
	
	// 計算用税金マップ作成
	calcZeikinValueMap(jumyo){
		const zmap = (jumyo >= 85) ? this.zeiValMap : this.zei2ValMap;
		const cmap = this.zeiCalcValMap;
		cmap.clear();
		const lastYear = jumyo - 35
		let iNenTpre = 0;
		let iNenTcont = -1;
		let pNenTpre = 0;
		let pNenTcont = -1;
		let pKenOTpre = 0;
		let pKenOTcont = -1;
		let pKaiTpre = 0;
		let pKaiTcont = -1;
		for (let year = 26; year <= lastYear; year++){
			const data = zmap.get(String(year));
			const iNenO = Number(data[0]);	// 夫年金
			const iNenTtmp = Number(data[1]);	// 妻年金
			if (iNenTtmp == 99) iNenTcont = iNenTpre;
			const iNenT = (iNenTcont == -1) ? iNenTtmp : iNenTcont;
			const pNenO = Number(data[2]);	// 夫年金支払
			const pNenTtmp = Number(data[3]);	// 妻年金支払
			if (pNenTtmp == 99) pNenTcont = pNenTpre;
			const pNenT = (pNenTcont == -1) ? pNenTtmp : pNenTcont;			
			const pKenOTtmp = Number(data[4]);	// 健保支払
			if (pKenOTtmp == 99) pKenOTcont = pKenOTpre;
			const pKenOT = (pKenOTcont == -1) ? pKenOTtmp : pKenOTcont;
			const pKaiO = Number(data[5]);	// 夫介護支払
			const pKaiTtmp = Number(data[6]);	// 妻介護支払
			if (pKaiTtmp == 99) pKaiTcont = pKaiTpre;
			const pKaiT = (pKaiTcont == -1) ? pKaiTtmp : pKaiTcont;
			const pKokO = Number(data[7]);	// 夫後期支払
			const pKokT = Number(data[8]);	// 妻後期支払
			const pShzO = Number(data[9]);	// 夫所得支払
			const pShzT = Number(data[10]);	// 妻所得支払
			const pJuzO = Number(data[11]);	// 夫住民支払
			const pJuzT = Number(data[12]);	// 妻住民支払
			cmap.set(String(year), [iNenO, iNenT, pNenO, pNenT, pKenOT, pKaiO, pKaiT, pKokO, pKokT, pShzO, pShzT, pJuzO, pJuzT]);
			iNenTpre = iNenTtmp;
			pNenTpre = pNenTtmp;
			pKenOTpre = pKenOTtmp;
			pKaiTpre = pKaiTtmp;
		}
		if (lastYear >= 62) return; 
		iNenTpre = 0;
		iNenTcont = -1;
		pNenTpre = 0;
		pNenTcont = -1;
		pKenOTpre = 0;
		pKenOTcont = -1;
		pKaiTpre = 0;
		pKaiTcont = -1;
		for (let year = 62; year > lastYear; year--){
			const data = zmap.get(String(year));
			const iNenTtmp = Number(data[1]);
			if (iNenTtmp == 99) iNenTcont = iNenTpre;
			const iNenT = (iNenTcont == -1) ? iNenTtmp : iNenTcont;
			const pNenTtmp = Number(data[3]);
			if (pNenTtmp == 99) pNenTcont = pNenTpre;
			const pNenT = (pNenTcont == -1) ? pNenTtmp : pNenTcont;			
			const pKenOTtmp = Number(data[4]);
			if (pKenOTtmp == 99) pKenOTcont = pKenOTpre;
			const pKenOT = (pKenOTcont == -1) ? pKenOTtmp : pKenOTcont;
			const pKaiTtmp = Number(data[6]);
			if (pKaiTtmp == 99) pKaiTcont = pKaiTpre;
			const pKaiT = (pKaiTcont == -1) ? pKaiTtmp : pKaiTcont;
			cmap.set(String(year), [0, iNenT, 0, pNenT, pKenOT, 0, pKaiT, 0, Number(data[8]), 0, Number(data[10]), 0, Number(data[12])]);
			iNenTpre = iNenTtmp;
			pNenTpre = pNenTtmp;
			pKenOTpre = pKenOTtmp;
			pKaiTpre = pKaiTtmp;
		}
		const data = zmap.get("62");
		for (let year = 63; year < 72; year++){
			cmap.set(String(year), [0, Number(data[1]), 0, Number(data[3]), Number(data[4]), 0, Number(data[6]), 0, Number(data[8]), 0, Number(data[10]), 0, Number(data[12])]);
		}
	}
	
	// 計算
	calcShushi(){
		const yokin = Number(this.inputYokin.value);
		let jumyo = Number(this.inputJumyo.value);
		if (jumyo < 69) jumyo = 69;
		if (jumyo > 96) jumyo = 96;
		this.inputJumyo.value = String(jumyo);

		this.calcZeikinValueMap(jumyo);	// 計算用税金マップ作成

		// 収支計画年表を表示
		const zmap = new Map();
		const cmap = this.zeiCalcValMap;
		const lmap = this.livingValMap;
		const lastYear = jumyo - 35
		let zandaka = yokin;
		for (let year = 26; year < 72; year++){
			const data = cmap.get(String(year));
			const iNenO = Number(data[0]);
			const iNenT = Number(data[1]);
			const pNenO = Number(data[2]);
			const pNenT = Number(data[3]);
			const pKenOT = Number(data[4]);
			const pKaiO = Number(data[5]);
			const pKaiT = Number(data[6]);
			const pKokO = Number(data[7]);
			const pKokT = Number(data[8]);
			const pShzO = Number(data[9]);
			const pShzT = Number(data[10]);
			const pJuzO = Number(data[11]);
			const pJuzT = Number(data[12]);
			const living = lmap.get(String(year));
			const iLiving = Number(living[0]);
			const pLiving = Number(living[1]);
			const income = iNenO + iNenT + iLiving;
			const payment = pNenO + pNenT + pKenOT + pKaiO + pKaiT + pKokO + pKokT + pShzO + pShzT + pJuzO + pJuzT + pLiving;
			zandaka += (income - payment);
			zmap.set(year, zandaka);
		}
		this.inputZandaka.value = zandaka.toLocaleString();

		this.viewMoneyPlanTable(zmap);	// 収支計画表表示
	}

	// 結果をダウンロード
	downloadResult(filename){
		FileUtil.downloadText(this.result, filename);
	}
}
