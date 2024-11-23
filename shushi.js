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
				if (line.startsWith("年")) continue;		// 先頭行は飛ばす
				let words = line.split(",");
				if (words == '') continue;
				if (words.length <= 1) continue;
				const top = words.shift();
				lmap.set(top, words);	// 年と費用のマップ
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
			result += '<tr><th rowspan=2>年</th><th colspan=2><span class="color1">収入</span></th>';
			result += '<th colspan=7>生活費その他支出</th><th rowspan=2><span class="color1">特別</span></th><th rowspan=2>補足</th></tr>';
			result += '<tr><th>生存保険</th><th>補助金</th><th>住居</th><th>車</th><th>夫婦</th><th>長女</th><th>次女</th>';
			result += '<th>教育1</th><th>教育2</th></tr>';
			this.livingValMap.forEach((values, key) => {	// 年、費用
				result += '<tr><td>' + key + '</td>';
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
			const isZeikinShosai = document.querySelector("#ISZEIKINSHOSAI").checked;
			const isSekatuShosai = document.querySelector("#ISSEKATUSHOSAI").checked;
			let zeikinHeader = '';
			let zeikinHeader2 = '';
			if (isZeikinShosai){
				zeikinHeader += '<th colspan=2>年金保険料</th><th>健康保険料</th><th colspan=2>介護保険料</th>';
				zeikinHeader += '<th colspan=2>後期高齢者保険料</th><th colspan=2>所得税</th><th colspan=2>住民税</th>';
				zeikinHeader2 += '<th>夫</th><th>妻</th><th>夫⇒妻</th><th>夫</th><th>妻</th>';
				zeikinHeader2 += '<th>夫</th><th>妻</th><th>夫</th><th>妻</th><th>夫</th><th>妻</th>';
			}else{
				zeikinHeader += '<th rowspan=2>保険料<br>税金支払い</th>';
			}
			let seikatuHeader = '';
			let seikatuHeader2 = '';
			if (isSekatuShosai){
				seikatuHeader += '<th colspan=7>生活費その他支出</th>';
				seikatuHeader2 += '<th>住居</th><th>車</th>';
				seikatuHeader2 += '<th>夫婦</th><th>長女</th><th>次女</th>';
				seikatuHeader2 += '<th>教育1</th><th>教育2</th></tr>';
			}else{
				seikatuHeader += '<th rowspan=2>生活費<br>その他支出</th>';
			}
			let header = '<tr><th rowspan=2>年</th><th colspan=2><span class="color1">受給年金</span></th>';
			header += zeikinHeader;
			header += '<th colspan=2><span class="color1">収入</span></th>';
			header += seikatuHeader;
			header += '<th rowspan=2><span class="color1">特別</span></th><th rowspan=2><span class="color2">残高</span></th></tr>';
			header += '<tr><th>夫</th><th>妻</th>';
			header += zeikinHeader2;
			header += '<th>生存保険</th><th>補助金</th>';
			header += seikatuHeader2;

			this.zeiCalcTable.innerHTML = "";
			let result = '<table class="VALUES">' + header;
			const cmap = this.zeiCalcValMap;
			const lmap = this.livingValMap;
			for (let year = 26; year < 72; year++){
				const values = cmap.get(String(year));
				const n0s = Number(values[0]).toLocaleString();
				const n1s = Number(values[1]).toLocaleString();
				result += '<tr><td>20' + String(year) + '</td><td>';
				if (year >= 30 && year < 40) result += '<span class="color3">';
				else if (year >= 40 && year < 50) result += '<span class="color4">';
				result += n0s;
				if (year >= 30 && year < 50) result += '</span>';
				result += '</td><td>';
				if (year >= 50 && year < 60) result += '<span class="color3">';
				else if (year >= 60 && year < 70) result += '<span class="color4">';
				result += n1s;
				if (year >= 50 && year < 70) result += '</span>';
				result += '</td>';
				if (isZeikinShosai){
					for (let i = 2; i < values.length; i++){
						result += '<td>' + Number(values[i]).toLocaleString() + '</td>';
					}
				} else{
					let zeiTotal = 0;
					for (let i = 2; i < values.length; i++){						
						zeiTotal += Number(values[i]);
					}
					result += '<td>' + zeiTotal.toLocaleString() + '</td>';
				}
				const living = lmap.get(String(year+2000));
				if (isSekatuShosai){
					for (let i = 0; i < (living.length - 1); i++){
						result += '<td>' + Number(living[i]).toLocaleString() + '</td>';
					}
				} else{
					for (let i = 0; i < 2; i++){
						result += '<td>' + Number(living[i]).toLocaleString() + '</td>';
					}
					let sekatuTotal = 0;
					for (let i = 2; i < (living.length - 2); i++){
						sekatuTotal += Number(living[i]);
					}
					result += '<td>' + sekatuTotal.toLocaleString() + '</td>';
					result += '<td>' + Number(living[living.length - 2]).toLocaleString() + '</td>';
				}
				const zandaka = zmap.get(year);
				result += '<td><span class="color2">' + zandaka.toLocaleString() + '</span></td>';
				result += '</tr>';				
			}
			result += '</table>';
			result += '※ <span class="color3">■</span>は65～74歳。<span class="color4">■</span>は75～84歳。';
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
		const cmap = new Map();//this.zeiCalcValMap;
		//cmap.clear();
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
		return cmap;
	}
	
	// 収支を計算する（GUIから呼ばれる）
	calcShushi(){
		const yokin = Number(this.inputYokin.value);
		let jumyo = Number(this.inputJumyo.value);
		if (jumyo < 69) jumyo = 69;
		if (jumyo > 96) jumyo = 96;
		this.inputJumyo.value = String(jumyo);

		this.zeiCalcValMap = this.calcZeikinValueMap(jumyo);	// 計算用税金マップ作成

		// 収支計画年表を表示
		const zmap = new Map();
		const cmap = this.zeiCalcValMap;
		const lmap = this.livingValMap;
		//const lastYear = jumyo - 35
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
			const living = lmap.get(String(year + 2000));
			const iSeizon = Number(living[0]);	// 生存保険
			const iHojokin = Number(living[1]);	// 補助金
			const iLiving = iSeizon + iHojokin;
			const pJukyo = Number(living[2]);	// 住居
			const pKuruma = Number(living[3]);	// 車
			const pFufu = Number(living[4]);	// 夫婦
			const pChojo = Number(living[5]);	// 長女
			const pJijo = Number(living[6]);	// 次女
			const pKyoiku1 = Number(living[7]);	// 教育1
			const pKyoiku2 = Number(living[8]);	// 教育2
			const pLiving = pJukyo + pKuruma + pFufu + pChojo + pJijo + pKyoiku1 + pKyoiku2;
			const ioSpecial = Number(living[9]);	// 特別
			const income = iNenO + iNenT + iLiving + ioSpecial;
			const payment = pNenO + pNenT + pKenOT + pKaiO + pKaiT + pKokO + pKokT + pShzO + pShzT + pJuzO + pJuzT + pLiving;
			zandaka += (income - payment);
			zmap.set(year, zandaka);
		}
		this.inputZandaka.value = zandaka.toLocaleString();

		this.viewMoneyPlanTable(zmap);	// 収支計画表表示
	}
	
	// 寿命ごとの2071年残高を計算する（GUIから呼ばれる）
	doSim1(){
		const yokin = Number(this.inputYokin.value);
		const jmMap = new Map();		
		for (let jumyo = 69; jumyo <= 96; jumyo++) {
			const cmap = this.calcZeikinValueMap(jumyo);	// 計算用税金マップ作成
			const lmap = this.livingValMap;
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
				const living = lmap.get(String(year + 2000));
				const iSeizon = Number(living[0]);	// 生存保険
				const iHojokin = Number(living[1]);	// 補助金
				const iLiving = iSeizon + iHojokin;
				const pJukyo = Number(living[2]);	// 住居
				const pKuruma = Number(living[3]);	// 車
				const pFufu = Number(living[4]);	// 夫婦
				const pChojo = Number(living[5]);	// 長女
				const pJijo = Number(living[6]);	// 次女
				const pKyoiku1 = Number(living[7]);	// 教育1
				const pKyoiku2 = Number(living[8]);	// 教育2
				const pLiving = pJukyo + pKuruma + pFufu + pChojo + pJijo + pKyoiku1 + pKyoiku2;
				const ioSpecial = Number(living[9]);	// 特別
				const income = iNenO + iNenT + iLiving + ioSpecial;
				const payment = pNenO + pNenT + pKenOT + pKaiO + pKaiT + pKokO + pKokT + pShzO + pShzT + pJuzO + pJuzT + pLiving;
				zandaka += (income - payment);
			}
			jmMap.set(jumyo, zandaka);
		}
		
		let dataAry = [];
		let labelAry = [];
		for (let jumyo = 69; jumyo <= 96; jumyo++) {
			const man = Math.floor(jmMap.get(jumyo) / 10000);
			dataAry.push(man);
			labelAry.push(jumyo);
		}
		const data = {
		  "datasets": [
			{ "label": "name", "data": dataAry, "backgroundColor": "#66f" } ],
		  "labels": labelAry
		};
		const options = {
		  "title": { "display": true, "text": "夫寿命と2071年残高", "fontSize": 18 },
		  "legend": { "display": false },
		  "layout": { "padding": { "left": 10, "right": 20, "top": 10, "bottom": 10 } },
		  "scales": {
			"yAxes": [ {
				"scaleLabel": { "display": true, "labelString": "残高（万円）", "fontSize": 15 },
				"ticks": { "fontSize": 12, "min": 0, "max": 2500, "stepSize": 500 },
				"gridLines": { "display": true },
				"stacked": false } ],
			"xAxes": [ {
				"scaleLabel": { "display": true, "labelString": "寿命（歳）", "fontSize": 15 },
				"ticks": { "fontSize": 12 },
				"gridLines": { "display": false },
				"stacked": false } ] },
		  "maintainAspectRatio": true
		};		
		Chart.plugins.register({
			beforeDraw: function(c){
				const ctx = c.chart.ctx;
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, c.chart.width, c.chart.height);
			}
		});
		const canvas = document.getElementById("CHART");
		const chartObj = new Chart(canvas, { type: "bar", data: data, options: options });
		
		//const man = Math.floor(jmMap.get(jumyo) / 10000);

		/* 表作成
		let result = '<table class="VALUES"><tr><th>寿命</th><th>残高</th></tr>';
		for (let jumyo = 69; jumyo <= 96; jumyo++) {
			result += `<tr><td>${jumyo}</td><td>${jmMap.get(jumyo)}</td></tr>`;		
		}
		result += '</table>';
		*/

		//const sim1result = document.querySelector("#SIM1RESULT");
		//sim1result.innerHTML = result;
	}

	// 結果をダウンロード（未使用）
	downloadResult(filename){
		FileUtil.downloadText(this.result, filename);
	}
}
