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
		// 規定値
		this.spTaiGetsu = null;
		this.spanKisoMangaku = null;
		this.spanFukaKasan = null;
		this.spanONofuGessu = this.spanOFukaGessu = null;
		this.spanKoseiNenkingaku = this.spanKoseiHoshu = null;
		this.spanKoseiKakyu = this.spanKoseiKakyuTokubetsu = null;
		this.spanTNofuGessu = this.spanTFukaGessu = null;
		this.spanIzokuKafu = this.spanIzokuKisoNenkingaku = this.spanIzokuKisoKo = null
		this.spanHokenryoGetsugaku = this.spanFukaGetsugaku = null;
		// 算出値
		this.spTai25 = this.spTai = this.spTai30 = null;
		this.spOFukaZobun = this.spTFukaZobun = null;
		this.spOKisoNenkingaku = this.spTKisoNenkingaku = null;
		this.spKisoO30 = this.spKisoT50 = null;
		this.spKoseiKakyuTsuma = null;
		this.spKosei30 = this.spKosei31 = this.spKosei33 = this.spKosei34 = this.spKosei50 = null;
		this.spIzokuNenkingaku = null;
		this.spIzoku49 = this.spIzoku50 = this.spIzoku33 = this.spIzokuKiso29 = null;
		this.spIzokuKiso30 = this.spIzokuKiso31 = this.spIzokuKiso33 = null;
		this.spONenA30 = this.spONenA30 = this.spONenA31 = this.spONenA33 = null;
		this.spONenA34 = this.spONenA50 = this.spONenA51 = this.spTNenA99 = null;
		this.spTNenB50 = null;
		this.spTNenD29 = this.spTNenD30 = this.spTNenD31 = this.spTNenD33 = null;
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
		// 規定値
		this.spTaiGetsu = Array.from(document.getElementsByClassName("TAIGETSU"));
		this.spanKisoMangaku = Array.from(document.getElementsByClassName("KISOMANGAKU"));
		this.spanFukaKasan = Array.from(document.getElementsByClassName("FUKAKASAN"));
		this.spanONofuGessu = Array.from(document.getElementsByClassName("O_NOFUGESSU"));
		this.spanOFukaGessu = Array.from(document.getElementsByClassName("O_FUKAGESSU"));
		this.spanKoseiNenkingaku = Array.from(document.getElementsByClassName("KOSEINENKINGAKU"));
		this.spanKoseiHoshu = Array.from(document.getElementsByClassName("KOSEIHOSHU"));
		this.spanKoseiKakyu = Array.from(document.getElementsByClassName("KOSEIKAKYU"));
		this.spanKoseiKakyuTokubetsu = document.querySelector("#KOSEIKAKYUTOKUBETSU");
		this.spanTNofuGessu = Array.from(document.getElementsByClassName("T_NOFUGESSU"));
		this.spanTFukaGessu = Array.from(document.getElementsByClassName("T_FUKAGESSU"));
		this.spanIzokuKafu = Array.from(document.getElementsByClassName("IZOKUKAFU"));		
		this.spanIzokuKisoNenkingaku = Array.from(document.getElementsByClassName("IZOKUKISONENKINGAKU"));
		this.spanIzokuKisoKo = Array.from(document.getElementsByClassName("IZOKUKISOKO"));
		this.spanHokenryoGetsugaku = Array.from(document.getElementsByClassName("HOKENRYOGETSUGAKU"));
		this.spanFukaGetsugaku = Array.from(document.getElementsByClassName("FUKAGETSUGAKU"));
		// 算出値
		this.spanOTsuika = document.querySelector("#O_TSUIKA");
		this.spanOKisoZobun = document.querySelector("#O_KISOZOBUN");
		this.spanTTsuika = document.querySelector("#T_TSUIKA");
		this.spanTKisoZobun = document.querySelector("#T_KISOZOBUN");
		this.spanFukaNengaku = document.querySelector("#FUKANENGAKU");
		this.spanFukaNenKasan = document.querySelector("#FUKANENKASAN");
		this.spanOFukaHokenryo = document.querySelector("#O_FUKAHOKENRYO");
		this.spanTFukaHokenryo = document.querySelector("#T_FUKAHOKENRYO");
		this.spTai25 = Array.from(document.getElementsByClassName("TAI25"));
		this.spTai = Array.from(document.getElementsByClassName("TAI"));
		this.spTai30 = Array.from(document.getElementsByClassName("TAI30"));
		this.spOKisoNenkingaku = Array.from(document.getElementsByClassName("O_KISONENKINGAKU"));
		this.spTKisoNenkingaku = Array.from(document.getElementsByClassName("T_KISONENKINGAKU"));		
		this.spOFukaZobun = Array.from(document.getElementsByClassName("O_FUKAZOBUN"));
		this.spTFukaZobun = Array.from(document.getElementsByClassName("T_FUKAZOBUN"));
		this.spKisoO30 = Array.from(document.getElementsByClassName("O_KISO30"));
		this.spKisoT50 = Array.from(document.getElementsByClassName("T_KISO50"));
		this.spKoseiKakyuTsuma = Array.from(document.getElementsByClassName("KOSEIKAKYUTSUMA"));
		this.spKosei30 = Array.from(document.getElementsByClassName("KOSEI30"));
		this.spKosei31 = Array.from(document.getElementsByClassName("KOSEI31"));
		this.spKosei33 = Array.from(document.getElementsByClassName("KOSEI33"));
		this.spKosei34 = Array.from(document.getElementsByClassName("KOSEI34"));
		this.spKosei50 = Array.from(document.getElementsByClassName("KOSEI50"));
		this.spIzokuNenkingaku = Array.from(document.getElementsByClassName("IZOKUNENKINGAKU"));
		this.spIzoku49 = Array.from(document.getElementsByClassName("IZOKU49"));
		this.spIzoku50 = Array.from(document.getElementsByClassName("IZOKU50"));
		this.spIzoku33 = Array.from(document.getElementsByClassName("IZOKU33"));
		this.spIzokuKiso29 = Array.from(document.getElementsByClassName("IZOKUKISO29"));
		this.spIzokuKiso30 = Array.from(document.getElementsByClassName("IZOKUKISO30"));
		this.spIzokuKiso31 = Array.from(document.getElementsByClassName("IZOKUKISO31"));
		this.spIzokuKiso33 = Array.from(document.getElementsByClassName("IZOKUKISO33"));
		this.spONenA30 = Array.from(document.getElementsByClassName("O_NA30"));
		this.spONenA31 = Array.from(document.getElementsByClassName("O_NA31"));
		this.spONenA33 = Array.from(document.getElementsByClassName("O_NA33"));
		this.spONenA34 = Array.from(document.getElementsByClassName("O_NA34")); 
		this.spONenA50 = Array.from(document.getElementsByClassName("O_NA50"));
		this.spONenA51 = Array.from(document.getElementsByClassName("O_NA51"));
		this.spTNenA99 = Array.from(document.getElementsByClassName("T_NA99"));
		this.spTNenB50 = Array.from(document.getElementsByClassName("T_NB50"));
		this.spTNenD29 = Array.from(document.getElementsByClassName("T_ND29"));
		this.spTNenD30 = Array.from(document.getElementsByClassName("T_ND30"));
		this.spTNenD31 = Array.from(document.getElementsByClassName("T_ND31"));
		this.spTNenD33 = Array.from(document.getElementsByClassName("T_ND33"));
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
		// 規定値
		const taigetsu = Number(vmap.get('退職年金月額'));	// 退職年金値
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
		// 算出
		const tai25 = taigetsu * 9;
		const tai = taigetsu * 12;
		const tai30 = taigetsu * 3;
		const oFukaNenkingaku = fukaKasan * oFukaGessu;
		const tFukaNenkingaku = fukaKasan * tFukaGessu;
		const oKisoNenkingaku = kisoMangaku * oNofuGessu / 480 + oFukaNenkingaku;
		const tKisoNenkingaku = kisoMangaku * tNofuGessu / 480 + tFukaNenkingaku;
		const oKiso30 = Math.floor(oKisoNenkingaku * 9/12);
		const tKiso50 = Math.floor(tKisoNenkingaku / 12);
		const koseiKakyuTsuma = koseiKakyu + koseiKakyuTokubetsu;
		const kosei30 = Math.floor((koseiNenkingaku + koseiKakyuTsuma + koseiKakyu) * 9/12);
		const kosei31 = koseiNenkingaku + koseiKakyuTsuma + koseiKakyu;
		const kosei33 = Math.floor(koseiNenkingaku + koseiKakyuTsuma + koseiKakyu * 3/12);
		const kosei34 = koseiNenkingaku + koseiKakyuTsuma;
		const kosei50 = Math.floor(koseiNenkingaku + koseiKakyuTsuma * 11/12);
		const izokuNenkingaku = Math.floor(koseiHoshu * 3 / 4);
		const izoku49 = izokuNenkingaku + izokuKafu;
		const izoku50 = Math.floor(izokuNenkingaku + izokuKafu * 11/12);
		const izoku33 = Math.floor(izokuNenkingaku + izokuKafu * 9/12);
		const izokuKiso29 = izokuKisoNenkingaku + izokuKisoKo * 2;
		const izokuKiso30 = Math.floor(izokuKisoNenkingaku + izokuKisoKo * 15/12);
		const izokuKiso31 = izokuKisoNenkingaku + izokuKisoKo;
		const izokuKiso33 = Math.floor((izokuKisoNenkingaku + izokuKisoKo) * 3/12);
		const oNenA30 = tai30 + oKiso30 + kosei30;
		const oNenA31 = oKisoNenkingaku + kosei31;
		const oNenA33 = oKisoNenkingaku + kosei33;
		const oNenA34 = oKisoNenkingaku + kosei34;
		const oNenA50 = oKisoNenkingaku + kosei50;
		const oNenA51 = oKisoNenkingaku + koseiNenkingaku;
		const tNenA99 = izokuNenkingaku + tKisoNenkingaku;
		const tNenB50 = izoku50 + tKiso50;
		const tNenD29 = izokuNenkingaku + izokuKiso29;
		const tNenD30 = izokuNenkingaku + izokuKiso30;
		const tNenD31 = izokuNenkingaku + izokuKiso31;
		const tNenD33 = izoku33 + izokuKiso33;

		// 規定値
		this.spTaiGetsu.forEach(v => { v.innerText = taigetsu.toLocaleString(); });
		this.spanKisoMangaku.forEach(v => { v.innerText = kisoMangaku.toLocaleString(); });
		this.spanFukaKasan.forEach(v => { v.innerText = fukaKasan.toLocaleString(); });
		this.spanONofuGessu.forEach(v => { v.innerText = oNofuGessu.toLocaleString(); });
		this.spanOFukaGessu.forEach(v => { v.innerText = oFukaGessu.toLocaleString(); });
		this.spanKoseiNenkingaku.forEach(v => { v.innerText = koseiNenkingaku.toLocaleString(); });
		this.spanKoseiHoshu.forEach(v => { v.innerText = koseiHoshu.toLocaleString(); });
		this.spanKoseiKakyu.forEach(v => { v.innerText = koseiKakyu.toLocaleString(); });
		this.spanKoseiKakyuTokubetsu.innerText = koseiKakyuTokubetsu.toLocaleString();
		this.spanTNofuGessu.forEach(v => { v.innerText = tNofuGessu.toLocaleString(); });
		this.spanTFukaGessu.forEach(v => { v.innerText = tFukaGessu.toLocaleString(); });
		this.spanIzokuKafu.forEach(v => { v.innerText = izokuKafu.toLocaleString(); });
		this.spanIzokuKisoNenkingaku.forEach(v => { v.innerText = izokuKisoNenkingaku.toLocaleString(); });
		this.spanIzokuKisoKo.forEach(v => { v.innerText = izokuKisoKo.toLocaleString(); });
		this.spanHokenryoGetsugaku.forEach(v => { v.innerText = hokenryoGetsugaku.toLocaleString(); });
		this.spanFukaGetsugaku.forEach(v => { v.innerText = fukaGetsugaku.toLocaleString(); });
		// 算出値
		this.spTai25.forEach(v => { v.innerText = tai25.toLocaleString(); });
		this.spTai.forEach(v => { v.innerText = tai.toLocaleString(); });
		this.spTai30.forEach(v => { v.innerText = tai30.toLocaleString(); });
		this.spOKisoNenkingaku.forEach(v => { v.innerText = oKisoNenkingaku.toLocaleString(); });
		this.spTKisoNenkingaku.forEach(v => { v.innerText = tKisoNenkingaku.toLocaleString(); });
		this.spOFukaZobun.forEach(v => { v.innerText = oFukaNenkingaku.toLocaleString(); });
		this.spTFukaZobun.forEach(v => { v.innerText = tFukaNenkingaku.toLocaleString(); });
		this.spKisoO30.forEach(v => { v.innerText = oKiso30.toLocaleString(); });
		this.spKisoT50.forEach(v => { v.innerText = tKiso50.toLocaleString(); });
		this.spKoseiKakyuTsuma.forEach(v => { v.innerText = koseiKakyuTsuma.toLocaleString(); });
		this.spKosei30.forEach(v => { v.innerText = kosei30.toLocaleString(); });
		this.spKosei31.forEach(v => { v.innerText = kosei31.toLocaleString(); });
		this.spKosei33.forEach(v => { v.innerText = kosei33.toLocaleString(); });
		this.spKosei34.forEach(v => { v.innerText = kosei34.toLocaleString(); });
		this.spKosei50.forEach(v => { v.innerText = kosei50.toLocaleString(); });
		this.spIzokuNenkingaku.forEach(v => { v.innerText = izokuNenkingaku.toLocaleString(); });
		this.spIzoku49.forEach(v => { v.innerText = izoku49.toLocaleString(); });
		this.spIzoku50.forEach(v => { v.innerText = izoku50.toLocaleString(); });
		this.spIzoku33.forEach(v => { v.innerText = izoku33.toLocaleString(); });
		this.spIzokuKiso29.forEach(v => { v.innerText = izokuKiso29.toLocaleString(); });
		this.spIzokuKiso30.forEach(v => { v.innerText = izokuKiso30.toLocaleString(); });
		this.spIzokuKiso31.forEach(v => { v.innerText = izokuKiso31.toLocaleString(); });
		this.spIzokuKiso33.forEach(v => { v.innerText = izokuKiso33.toLocaleString(); });
		this.spONenA30.forEach(v => { v.innerText = oNenA30.toLocaleString(); });
		this.spONenA31.forEach(v => { v.innerText = oNenA31.toLocaleString(); });
		this.spONenA33.forEach(v => { v.innerText = oNenA33.toLocaleString(); });
		this.spONenA34.forEach(v => { v.innerText = oNenA34.toLocaleString(); });
		this.spONenA50.forEach(v => { v.innerText = oNenA50.toLocaleString(); });
		this.spONenA51.forEach(v => { v.innerText = oNenA51.toLocaleString(); });
		this.spTNenA99.forEach(v => { v.innerText = tNenA99.toLocaleString(); });
		this.spTNenB50.forEach(v => { v.innerText = tNenB50.toLocaleString(); });
		this.spTNenD29.forEach(v => { v.innerText = tNenD29.toLocaleString(); });
		this.spTNenD30.forEach(v => { v.innerText = tNenD30.toLocaleString(); });
		this.spTNenD31.forEach(v => { v.innerText = tNenD31.toLocaleString(); });
		this.spTNenD33.forEach(v => { v.innerText = tNenD33.toLocaleString(); });
		this.spanOTsuika.innerText = (hokenryoGetsugaku * 60).toLocaleString();
		this.spanOKisoZobun.innerText = (kisoMangaku * 60 / 480).toLocaleString();
		this.spanTTsuika.innerText = (hokenryoGetsugaku * 40).toLocaleString();
		this.spanTKisoZobun.innerText = (kisoMangaku * 40 / 480).toLocaleString();
		this.spanFukaNengaku.innerText = (fukaGetsugaku * 12).toLocaleString();
		this.spanFukaNenKasan.innerText = (fukaKasan * 12).toLocaleString();
		this.spanOFukaHokenryo.innerText = (400 * oFukaGessu).toLocaleString();
		this.spanTFukaHokenryo.innerText = (400 * tFukaGessu).toLocaleString();
		const getsugaku = hokenryoGetsugaku + fukaGetsugaku;
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
		// 年金値データ for Download
		let text = "";
		text += `長寿_夫受給年金額25：${tai25}\n`;
		text += `長寿_夫受給年金額26_29：${tai}\n`;
		text += `長寿_夫受給年金額30：${oNenA30}\n`;
		text += `長寿_夫受給年金額31_32：${oNenA31}\n`;
		text += `長寿_夫受給年金額33：${oNenA33}\n`;
		text += `長寿_夫受給年金額34_49：${oNenA34}\n`;
		text += `長寿_夫受給年金額50：${oNenA50}\n`;
		text += `長寿_妻受給年金額50：${tKiso50}\n`;
		text += `長寿_夫受給年金額51_X：${oNenA51}\n`;
		text += `長寿_妻受給年金額51_X：${tKisoNenkingaku}\n`;
		text += `長寿_妻受給年金額X：${tNenA99}\n`;
		text += `長寿_妻課税年金額X：${tKisoNenkingaku}\n`;
		text += `標準_夫受給年金額25：${tai25}\n`;
		text += `標準_夫受給年金額26_29：${tai}\n`;
		text += `標準_夫受給年金額30：${oNenA30}\n`;
		text += `標準_夫受給年金額31_32：${oNenA31}\n`;
		text += `標準_夫受給年金額33：${oNenA33}\n`;
		text += `標準_夫受給年金額34_X：${oNenA34}\n`;
		text += `標準_妻受給年金額X_49：${izoku49}\n`;
		text += `標準_妻受給年金額50：${tNenB50}\n`;
		text += `標準_妻受給年金額51_x：${tNenA99}\n`;
		text += `標準_妻課税年金額X_49：${0}\n`;
		text += `標準_妻課税年金額50：${tKiso50}\n`;
		text += `標準_妻課税年金額51_x：${tKisoNenkingaku}\n`;
		text += `短命_夫受給年金額25：${tai25}\n`;
		text += `短命_夫受給年金額26_X：${tai}\n`;
		text += `短命_妻受給年金額X_29：${tNenD29}\n`;
		text += `短命_妻受給年金額30：${tNenD30}\n`;
		text += `短命_妻受給年金額31_32：${tNenD31}\n`;
		text += `短命_妻受給年金額33：${tNenD33}\n`;
		text += `短命_妻受給年金額34_49：${izoku49}\n`;
		text += `短命_妻受給年金額50：${tNenB50}\n`;
		text += `短命_妻受給年金額51_x：${tNenA99}\n`;
		text += `短命_妻課税年金額X_49：${0}\n`;
		text += `短命_妻課税年金額50：${tKiso50}\n`;
		text += `短命_妻課税年金額51_x：${tKisoNenkingaku}\n`;
		text += `長寿_夫年金納付額25_29：${nenp25}\n`;
		text += `長寿_夫年金納付額30：${nenp30}\n`;
		text += `長寿_夫年金納付額31：${nenp31}\n`;
		text += `長寿_夫年金納付額32_36：${nenp32}\n`;
		text += `長寿_夫年金納付額37：${nenp37}\n`;
		text += `長寿_夫年金納付額38_48：${nenp38}\n`;
		text += `長寿_夫年金納付額49：${nenp49}\n`;
		text += `標準_夫年金納付額25_29：${nenp25}\n`;
		text += `標準_夫年金納付額30：${nenp30}\n`;
		text += `標準_夫年金納付額31：${nenp31}\n`;
		text += `標準_夫年金納付額32_36：${nenp32}\n`;
		text += `標準_夫年金納付額37：${nenp37}\n`;
		text += `標準_夫年金納付額38_X：${nenp38}\n`;
		text += `標準_妻年金納付額X_48：${nenp38}\n`;
		text += `標準_妻年金納付額49：${nenp49}\n`;
		text += `短命_夫年金納付額25_X：${nenp25}\n`;
		text += `短命_妻年金納付額X_30：${nenp38}\n`;
		text += `短命_妻年金納付額31：${nenp31}\n`;
		text += `短命_妻年金納付額32_36：${nenp32}\n`;
		text += `短命_妻年金納付額37：${nenp37}\n`;
		text += `短命_妻年金納付額38_48：${nenp38}\n`;
		text += `短命_妻年金納付額49：${nenp49}\n`;
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
			"退職年金月額",
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
