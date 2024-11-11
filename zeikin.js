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
		app.drawFigures();
	}
	catch(e){
		console.log(e);
		alert("エラー:"+e);
	}
};

class App {

	constructor(){
		this.contentsText = null;
		this.zeikinParams = null;
		this.nenkinValues = null;
		this.zeikinParamsMap = null;
		this.nenkinValuesMap = null;

		// 税金算出規定値
		this.spKhKiso = null;
		this.spKky1 = this.spKky2 = null;
		this.spKko1 = this.spKko2 = null;
		this.spKhis = this.spKhik = this.spKhig = null;
		this.spKhss = this.spKhsk = this.spKhsg = null;
		this.spKhks = this.spKhkk = this.spKhkg = null;
		this.spKaig5 = this.spKaig6 = this.spKaig7 = null;
		this.spKokik = this.spKokis = null;
		this.spSzRitu = this.spSzHaigu = this.spSzKiso = null;	// 所得税

		this.spTaiGetsu = null;

		// 公的年金データ値
		this.spN1o = this.spN2o = this.spN3o = null;
		this.spN0t = null;
		//this.spanNenPf = this.spanNenP = null;	// 国民年金保険料（年間納付額）★おそらく不要になる★
		this.spanNenp25 = this.spanNenp30 = this.spanNenp31 = null;	// 国民年金保険
		this.spanNenp32 = this.spanNenp37 = this.spanNenp38 = this.spanNenp49 = null;

		// 算出値
		this.spTai25 = null;
		this.spTai = null;
		this.spTai30 = null;
		this.spShot25 = this.spShot26 = null;
		this.spN30o = this.spKN30o = this.spN33o = this.spN50o = null;
		this.spShot1o = this.spShot2o = this.spShot3o = null;
		this.spShot0t = null;
		this.spShot30o = this.spShot33o = null;
		this.spShot50o = this.spShot50t = this.spShot50tx = null;
		this.spKs25o = this.spKs26o = null;
		this.spKs1o = this.spKs2o = null;
		this.spKs3o = this.spKs0t = this.spKs3ot = null;
		this.spKs30o = this.spKs33o = null;
		this.spKs50o = this.spKs50t = this.spKs50ot = this.spKs50tx = null;
		this.spKh26 = this.spKhI26 = this.spKhS26 = this.spKhK26 = null;	// 国保26
		this.spKh30 = this.spKhI30 = this.spKhS30 = this.spKhK30 = null;	// 国保30
		this.spKh1 = this.spKhI1 = this.spKhS1 = this.spKhK1 = null;		// 国保1
		this.spKh33 = this.spKhI33 = this.spKhS33 = this.spKhK33 = null;	// 国保33
		this.spKh2k2 = this.spKhI2k2 = this.spKhS2k2 = this.spKhK2k2 = null;	// 国保2K2
		this.spKh2k1 = this.spKhI2k1 = this.spKhS2k1 = this.spKhK2k1 = null;	// 国保2K1
		this.spKh2k0 = this.spKhI2k0 = this.spKhS2k0 = this.spKhK2k0 = null;	// 国保2K0
		this.spKh4 = this.spKhI4 = this.spKhS4 = this.spKhK4 = null;		// 国保4
		this.spKh50 = this.spKhI50 = this.spKhS50 = this.spKhK50 = null;	// 国保30
		this.spKh3 = this.spKhI3 = this.spKhS3 = null;		// 国保3
		this.spKh5 = this.spKhI5 = this.spKhS5 = null;		// 国保5
		this.spKaigl1 = this.spKaig21 = this.spKaig31 = this.spKaig41 = null;	// 介護保険
		this.spKaig301 = this.spKaig331 = this.spKaig501 = null;
		this.spKaiglo = this.spKaig2o = this.spKaig3o = this.spKaig4t = null;
		this.spKaig30o = this.spKaig33o = this.spKaig50o = null;
		this.spKkKiso = this.spKoki2o = this.spKoki3o = null;	// 後期高齢者保険
		this.spKoki4t = this.spKoki50o = null;
	}

	// 初期化処理
	init(){
		this.contentsText = document.querySelector("#CONTENTS_TEXT");
		this.zeikinParams = document.querySelector("#ZEIKIN_PARAMS");
		FileUtil.initDnDReadText(this.contentsText, null, text => this.setText(text));
		this.contentsText2 = document.querySelector("#CONTENTS_TEXT2");
		this.nenkinValues = document.querySelector("#NENKIN_VALUES");
		FileUtil.initDnDReadText(this.contentsText2, null, text => this.setText2(text));

		// 税金算出規定値
		this.zeikinParamsMap = new Map();
		this.spKky1 = Array.from(document.getElementsByClassName("KKY1"));
		this.spKky2 = Array.from(document.getElementsByClassName("KKY2"));
		this.spKko1 = Array.from(document.getElementsByClassName("KKO1"));
		this.spKko2 = Array.from(document.getElementsByClassName("KKO2"));
		this.spKhKiso = Array.from(document.getElementsByClassName("KOKKHISWO"));
		this.spKhis = Array.from(document.getElementsByClassName("KHIS"));
		this.spKhik = Array.from(document.getElementsByClassName("KHIK"));
		this.spKhig = Array.from(document.getElementsByClassName("KHIG"));
		this.spKhss = Array.from(document.getElementsByClassName("KHSS"));
		this.spKhsk = Array.from(document.getElementsByClassName("KHSK"));
		this.spKhsg = Array.from(document.getElementsByClassName("KHSG"));
		this.spKhks = Array.from(document.getElementsByClassName("KKHSB"));
		this.spKhkk = Array.from(document.getElementsByClassName("KKHKB"));
		this.spKhkg = Array.from(document.getElementsByClassName("KHKG"));
		this.spKaig5 = Array.from(document.getElementsByClassName("KAIG5"));
		this.spKaig6 = Array.from(document.getElementsByClassName("KAIG6"));
		this.spKaig7 = Array.from(document.getElementsByClassName("KAIG7"));
		this.spKkKiso = Array.from(document.getElementsByClassName("KOKIKISO"));
		this.spKokik = Array.from(document.getElementsByClassName("KOKIK"));
		this.spKokis = Array.from(document.getElementsByClassName("KOKIS"));
		this.spSzRitu = Array.from(document.getElementsByClassName("SZRITU"));	// 所得税
		this.spSzHaigu = Array.from(document.getElementsByClassName("SZHAIGU"));
		this.spSzKiso = Array.from(document.getElementsByClassName("SZKISO"));
		this.spTaiGetsu = Array.from(document.getElementsByClassName("TAIGETSU"));
		//this.spN1o = Array.from(document.getElementsByClassName("N1O"));
		//this.spN2o = Array.from(document.getElementsByClassName("N2O"));
		//this.spN3o = Array.from(document.getElementsByClassName("N3O"));
		//this.spN0t = Array.from(document.getElementsByClassName("N0T"));

		// 公的年金データ値
		this.nenkinValuesMap = new Map();
		this.spN1o = Array.from(document.getElementsByClassName("N1O"));
		this.spN2o = Array.from(document.getElementsByClassName("N2O"));
		this.spN3o = Array.from(document.getElementsByClassName("N3O"));
		this.spN0t = Array.from(document.getElementsByClassName("N0T"));
		//this.spanNenp25 = Array.from(document.getElementsByClassName("NENP25"));	// 国民年金保険
		this.spanNenp30 = Array.from(document.getElementsByClassName("NENP30"));	// 国民年金保険
		this.spanNenp31 = Array.from(document.getElementsByClassName("NENP31"));
		this.spanNenp32 = Array.from(document.getElementsByClassName("NENP32"));
		this.spanNenp37 = Array.from(document.getElementsByClassName("NENP37"));
		this.spanNenp38 = Array.from(document.getElementsByClassName("NENP38"));
		this.spanNenp49 = Array.from(document.getElementsByClassName("NENP49"));

		// 算出値
		this.spTai25 = Array.from(document.getElementsByClassName("TAI25"));
		this.spTai = Array.from(document.getElementsByClassName("TAI"));
		this.spTai30 = Array.from(document.getElementsByClassName("TAI30"));
		this.spShot25 = Array.from(document.getElementsByClassName("SHOT25"));
		this.spShot26 = Array.from(document.getElementsByClassName("SHOT26"));
		this.spN30o = Array.from(document.getElementsByClassName("N30O"));
		this.spKN30o = Array.from(document.getElementsByClassName("KN30O"));
		this.spN33o = Array.from(document.getElementsByClassName("N33O"));
		this.spN50o = Array.from(document.getElementsByClassName("N50O"));
		this.spShot1o = Array.from(document.getElementsByClassName("SHOT1O"));
		this.spShot2o = Array.from(document.getElementsByClassName("SHOT2O"));
		this.spShot3o = Array.from(document.getElementsByClassName("SHOT3O"));
		this.spShot0t = Array.from(document.getElementsByClassName("SHOT0T"));
		this.spShot30o = Array.from(document.getElementsByClassName("SHOT30O"));
		this.spShot33o = Array.from(document.getElementsByClassName("SHOT33O"));
		this.spShot50o = Array.from(document.getElementsByClassName("SHOT50O"));
		this.spShot50t = Array.from(document.getElementsByClassName("SHOT50T"));
		this.spKs25o = Array.from(document.getElementsByClassName("KS25O"));
		this.spKs26o = Array.from(document.getElementsByClassName("KS26O"));
		this.spKs1o = Array.from(document.getElementsByClassName("KS1O"));
		this.spKs2o = Array.from(document.getElementsByClassName("KS2O"));
		this.spKs3o = Array.from(document.getElementsByClassName("KS3O"));
		this.spKs0t = Array.from(document.getElementsByClassName("KS0T"));
		this.spKs3ot = Array.from(document.getElementsByClassName("KS3OT"));
		this.spKs30o = Array.from(document.getElementsByClassName("KS30O"));
		this.spKs33o = Array.from(document.getElementsByClassName("KS33O"));
		this.spKs50o = Array.from(document.getElementsByClassName("KS50O"));
		this.spKs50ot = Array.from(document.getElementsByClassName("KS50OT"));

		this.spKhI26 = this.getSpan3parts("KHISW26", "KHIKW26", "KHIB26");	// 国保26
		this.spKhS26 = this.getSpan3parts("KHSSW26", "KHSKW26", "KHSB26");
		this.spKhK26 = this.getSpan3parts("KKHSBW26", "KKHKBW26", "KHKB26");
		this.spKh26 = Array.from(document.getElementsByClassName("HK26"));
		this.spKhI30 = this.getSpan3parts("KHISW30", "KHIKW30", "KHIB30");	// 国保30
		this.spKhS30 = this.getSpan3parts("KHSSW30", "KHSKW30", "KHSB30");
		this.spKhK30 = this.getSpan3parts("KKHSBW30", "KKHKBW30", "KHKB30");
		this.spKh30 = Array.from(document.getElementsByClassName("HK30"));
		this.spKhI1 = this.getSpan3parts("KHISW1", "KHIKW1", "KHIB1");		// 国保1
		this.spKhS1 = this.getSpan3parts("KHSSW1", "KHSKW1", "KHSB1");
		this.spKhK1 = this.getSpan3parts("KKHSBW1", "KKHKBW1", "KHKB1");
		this.spKh1 = Array.from(document.getElementsByClassName("HK1"));
		this.spKhI33 = this.getSpan3parts("KHISW33", "KHIKW33", "KHIB33");	// 国保33
		this.spKhS33 = this.getSpan3parts("KHSSW33", "KHSKW33", "KHSB33");
		this.spKhK33 = this.getSpan3parts("KKHSBW33", "KKHKBW33", "KHKB33");
		this.spKh33 = Array.from(document.getElementsByClassName("HK33"));
		this.spKhI2k2 = this.getSpan3parts("KHISW2K2", "KHIKW2K2", "KHIB2K2");	// 国保2K2
		this.spKhS2k2 = this.getSpan3parts("KHSSW2K2", "KHSKW2K2", "KHSB2K2");
		this.spKhK2k2 = this.getSpan3parts("KKHSBW2K2", "KKHKBW2K2", "KHKB2K2");
		this.spKh2k2 = Array.from(document.getElementsByClassName("HK2K2"));
		this.spKhI2k1 = this.getSpan3parts("KHISW2K1", "KHIKW2K1", "KHIB2K1");	// 国保2K1
		this.spKhS2k1 = this.getSpan3parts("KHSSW2K1", "KHSKW2K1", "KHSB2K1");
		this.spKhK2k1 = this.getSpan3parts("KKHSBW2K1", "KKHKBW2K1", "KHKB2K1");
		this.spKh2k1 = Array.from(document.getElementsByClassName("HK2K1"));
		this.spKhI2k0 = this.getSpan3parts("KHISW2K0", "KHIKW2K0", "KHIB2K0");	// 国保2K2
		this.spKhS2k0 = this.getSpan3parts("KHSSW2K0", "KHSKW2K0", "KHSB2K0");
		this.spKhK2k0 = this.getSpan3parts("KKHSBW2K0", "KKHKBW2K0", "KHKB2K0");
		this.spKh2k0 = Array.from(document.getElementsByClassName("HK2K0"));
		this.spKhI4 = this.getSpan3parts("KHISW4", "KHIKW4", "KHIB4");		// 国保4
		this.spKhS4 = this.getSpan3parts("KHSSW4", "KHSKW4", "KHSB4");
		this.spKhK4 = this.getSpan3parts("KKHSBW4", "KKHKBW4", "KHKB4");
		this.spKh4 = Array.from(document.getElementsByClassName("HK4"));
		this.spKhI50 = this.getSpan3parts("KHISW50", "KHIKW50", "KHIB50");	// 国保50
		this.spKhS50 = this.getSpan3parts("KHSSW50", "KHSKW50", "KHSB50");
		this.spKhK50 = this.getSpan3parts("KKHSBW50", "KKHKBW50", "KHKB50");
		this.spKh50 = Array.from(document.getElementsByClassName("HK50"));
		this.spKh50x = Array.from(document.getElementsByClassName("HK50X"));
		this.spKhI3 = this.getSpan3parts("KHISW3", "KHIKW3", "KHIB3");		// 国保3
		this.spKhS3 = this.getSpan3parts("KHSSW3", "KHSKW3", "KHSB3");
		this.spKh3 = Array.from(document.getElementsByClassName("HK3"));
		this.spKhI5 = this.getSpan3parts("KHISW5", "KHIKW5", "KHIB5");		// 国保5
		this.spKhS5 = this.getSpan3parts("KHSSW5", "KHSKW5", "KHSB5");
		this.spKh5 = Array.from(document.getElementsByClassName("HK5"));

		this.spKaig301 = Array.from(document.getElementsByClassName("KAIG30L"));	// 介護保険
		this.spKaigl1 = Array.from(document.getElementsByClassName("KAIG1L"));
		this.spKaig331 = Array.from(document.getElementsByClassName("KAIG33L"));
		this.spKaig21 = Array.from(document.getElementsByClassName("KAIG2L"));
		this.spKaig501 = Array.from(document.getElementsByClassName("KAIG50L"));
		this.spKaig31 = Array.from(document.getElementsByClassName("KAIG3L"));
		this.spKaig41 = Array.from(document.getElementsByClassName("KAIG4L"));
		this.spKaig30o = Array.from(document.getElementsByClassName("KAIG30O"));
		this.spKaiglo = Array.from(document.getElementsByClassName("KAIG1O"));
		this.spKaig33o = Array.from(document.getElementsByClassName("KAIG33O"));
		this.spKaig2o = Array.from(document.getElementsByClassName("KAIG2O"));
		this.spKaig50o = Array.from(document.getElementsByClassName("KAIG50O"));
		this.spKaig3o = Array.from(document.getElementsByClassName("KAIG3O"));
		this.spKaig4t = Array.from(document.getElementsByClassName("KAIG4T"));
		this.spKoki30o = Array.from(document.getElementsByClassName("KOKI30O"));	// 後期高齢者保険
		//this.spKoki1o = Array.from(document.getElementsByClassName("KOKI1O"));
		//this.spKoki33o = Array.from(document.getElementsByClassName("KOKI33O"));
		this.spKoki2o = Array.from(document.getElementsByClassName("KOKI2O"));
		this.spKoki50o = Array.from(document.getElementsByClassName("KOKI50O"));
		this.spKoki3o = Array.from(document.getElementsByClassName("KOKI3O"));
		this.spKoki4t = Array.from(document.getElementsByClassName("KOKI4T"));


	}
	
	// 計算式更新
	calcZeikin(){
		// 税金算出規定値
		const zmap = this.zeikinParamsMap;
		const knKy1 = Number(zmap.get('公的年金等控除65歳未満130万円以下控除額'));
		const knKy2 = Number(zmap.get('公的年金等控除65歳未満410万円以下控除額定額分'));
		const knKo1 = Number(zmap.get('公的年金等控除65歳以上330万円以下控除額'));
		const knKo2 = Number(zmap.get('公的年金等控除65歳以上410万円以下控除額定額分'));
		const khKiso = Number(zmap.get('国民健康保険基礎控除'));
		const khIS = parseFloat(zmap.get('国民健康保険医療分所得割'));
		const khIK = Number(zmap.get('国民健康保険医療分均等割'));
		const khIG = Number(zmap.get('国民健康保険医療分限度額'));
		const khSS = parseFloat(zmap.get('国民健康保険支援分所得割'));
		const khSK = Number(zmap.get('国民健康保険支援分均等割'));
		const khSG = Number(zmap.get('国民健康保険支援分限度額'));
		const khKS = parseFloat(zmap.get('国民健康保険介護分所得割'));
		const khKK = Number(zmap.get('国民健康保険介護分均等割'));
		const khKG = Number(zmap.get('国民健康保険介護分限度額'));
		const kaig5 = Number(zmap.get('介護保険料第5段階年額'));
		const kaig6 = Number(zmap.get('介護保険料第6段階年額'));
		const kaig7 = Number(zmap.get('介護保険料第7段階年額'));
		const kkKiso = Number(zmap.get('後期高齢者保険基礎控除'));
		const kokik = Number(zmap.get('後期高齢者保険均等割'));
		const kokis = parseFloat(zmap.get('後期高齢者保険所得割'));		
		const szRitu = parseFloat(zmap.get('年金所得税率（復興特別税含む）'));
		const szKiso = Number(zmap.get('所得税基礎控除'));
		const szHaigu = Number(zmap.get('所得税配偶者控除'));

		const taigetsu = Number(zmap.get('退職年金月額'));	// 退職年金値
		//const n1o = Number(zmap.get('夫年金受給で65歳未満妻と子の夫課税年金額'));
		//const n2o = Number(zmap.get('夫年金受給で65歳未満妻の夫課税年金額'));
		//const n3o = Number(zmap.get('夫妻年金受給の夫課税年金額'));
		//const n0t = Number(zmap.get('妻年金受給の妻課税年金額'));

		// 公的年金データ値
		const nmap = this.nenkinValuesMap;
		const n1o = Number(nmap.get('夫年金受給で65歳未満妻と子の夫課税年金額'));
		const n2o = Number(nmap.get('夫年金受給で65歳未満妻の夫課税年金額'));
		const n3o = Number(nmap.get('夫妻年金受給の夫課税年金額'));
		const n0t = Number(nmap.get('妻年金受給の妻課税年金額'));
		//const nXt = Number(nmap.get('夫亡き妻65歳未満で子が2人の妻年金額'));
		//const nXt = Number(nmap.get('夫亡き妻65歳未満で子が1人の妻年金額'));
		//const nXt = Number(nmap.get('夫亡き妻65歳未満の妻年金額'));
		//const nXt = Number(nmap.get('夫亡き妻年金受給の妻年金額'));
		const nenpay25 = Number(nmap.get('国民年金納付額2025～2029年'));
		const nenpay30 = Number(nmap.get('国民年金納付額2030年'));
		const nenpay31 = Number(nmap.get('国民年金納付額2031年'));
		const nenpay32 = Number(nmap.get('国民年金納付額2032～2036年'));
		const nenpay37 = Number(nmap.get('国民年金納付額2037年'));
		const nenpay38 = Number(nmap.get('国民年金納付額2038～2048年'));
		const nenpay49 = Number(nmap.get('国民年金納付額2049年'));

		// 算出
		const tai25 = taigetsu * 9;
		const tai = taigetsu * 12;
		const tai30 = taigetsu * 3;
		const n30o = Math.round(n1o * 9 / 12);
		const kn30o = tai30 + n30o;
		const n33o = Math.round(n1o * 3 / 12 + n2o * 9 / 12);
		const n50o = Math.round(n2o * 11 / 12 + n3o / 12);
		const shot25 = (tai25 > knKy1) ? tai25 - knKy1 : 0;
		const shot26 = (tai > knKy1) ? tai - knKy1 : 0;
		const shot1o = (n1o > knKo1) ? n1o - knKo1 : 0;
		const shot2o = (n2o > knKo1) ? n2o - knKo1 : 0;
		const shot3o = (n3o > knKo1) ? n3o - knKo1 : 0;
		const shot0t = (n0t > knKo1) ? n0t - knKo1 : 0;
		const shot30o = kn30o - knKo1;
		const shot33o = n33o - knKo1;
		const shot50o = n50o - knKo1;

		const khKs26o = (shot26 > khKiso) ? shot26 - khKiso : 0;	// 国保
		const khKs1o = (shot1o > khKiso) ? shot1o - khKiso : 0;
		const khKs2o = (shot2o > khKiso) ? shot2o - khKiso : 0;
		const khKs3o = (shot3o > khKiso) ? shot3o - khKiso : 0;
		const khKs0t = (shot0t > khKiso) ? shot0t - khKiso : 0;
		const khKs3ot = khKs3o + khKs0t;
		const khKs30o = (shot30o > khKiso) ? shot30o - khKiso : 0;
		const khKs33o = (shot33o > khKiso) ? shot33o - khKiso : 0;
		const khKs50o = (shot50o > khKiso) ? shot50o - khKiso : 0;
		const khKs50ot = khKs50o + khKs0t;
		const hki26 = this.calcKokuhoPart(khIS, khIK, khIG, khKs26o, 4);	// 国保26
		const hks26 = this.calcKokuhoPart(khSS, khSK, khSG, khKs26o, 4);
		const hkk26 = this.calcKokuhoPart(khKS, khKK, khKG, khKs26o, 2);
		const hk26 = hki26[2] + hks26[2] + hkk26[2];
		const hki30 = this.calcKokuhoPart(khIS, khIK, khIG, khKs30o, 4);	// 国保30
		const hks30 = this.calcKokuhoPart(khSS, khSK, khSG, khKs30o, 4);
		const hkk30 = this.calcKokuhoPart(khKS, khKK, khKG, khKs30o, 2);
		const hk30 = hki30[2] + hks30[2] + hkk30[2];
		const hki1 = this.calcKokuhoPart(khIS, khIK, khIG, khKs1o, 4);	// 国保1
		const hks1 = this.calcKokuhoPart(khSS, khSK, khSG, khKs1o, 4);
		const hkk1 = this.calcKokuhoPart(khKS, khKK, khKG, 0, 1);
		const hk1 = hki1[2] + hks1[2] + hkk1[2];
		const hki33 = this.calcKokuhoPart(khIS, khIK, khIG, khKs33o, 4);	// 国保33
		const hks33 = this.calcKokuhoPart(khSS, khSK, khSG, khKs33o, 4);
		const hkk33 = this.calcKokuhoPart(khKS, khKK, khKG, 0, 1);
		const hk33 = hki33[2] + hks33[2] + hkk33[2];
		const hki2k2 = this.calcKokuhoPart(khIS, khIK, khIG, khKs2o, 4);	// 国保2K2
		const hks2k2 = this.calcKokuhoPart(khSS, khSK, khSG, khKs2o, 4);
		const hkk2k2 = this.calcKokuhoPart(khKS, khKK, khKG, 0, 1);
		const hk2k2 = hki2k2[2] + hks2k2[2] + hkk2k2[2];
		const hki2k1 = this.calcKokuhoPart(khIS, khIK, khIG, khKs2o, 3);	// 国保2K1
		const hks2k1 = this.calcKokuhoPart(khSS, khSK, khSG, khKs2o, 3);
		const hkk2k1 = this.calcKokuhoPart(khKS, khKK, khKG, 0, 1);
		const hk2k1 = hki2k1[2] + hks2k1[2] + hkk2k1[2];
		const hki2k0 = this.calcKokuhoPart(khIS, khIK, khIG, khKs2o, 2);	// 国保2K0
		const hks2k0 = this.calcKokuhoPart(khSS, khSK, khSG, khKs2o, 2);
		const hkk2k0 = this.calcKokuhoPart(khKS, khKK, khKG, 0, 1);
		const hk2k0 = hki2k0[2] + hks2k0[2] + hkk2k0[2];
		const hki4 = this.calcKokuhoPart(khIS, khIK, khIG, khKs0t, 1);	// 国保4
		const hks4 = this.calcKokuhoPart(khSS, khSK, khSG, khKs0t, 1);
		const hkk4 = this.calcKokuhoPart(khKS, khKK, khKG, khKs0t, 1);
		const hk4 = hki4[2] + hks4[2] + hkk4[2];
		const hki50 = this.calcKokuhoPart(khIS, khIK, khIG, khKs50ot, 2);		// 国保50
		const hks50 = this.calcKokuhoPart(khSS, khSK, khSG, khKs50ot, 2);
		const hkk50 = this.calcKokuhoPart(khKS, khKK, khKG, khKs0t, 1);
		const hk50 = hki50[2] + hks50[2] + hkk50[2];
		const hki3 = this.calcKokuhoPart(khIS, khIK, khIG, khKs3ot, 2);	// 国保3
		const hks3 = this.calcKokuhoPart(khSS, khSK, khSG, khKs3ot, 2);
		const hk3 = hki3[2] + hks3[2];
		const hki5 = this.calcKokuhoPart(khIS, khIK, khIG, khKs0t, 1);	// 国保5
		const hks5 = this.calcKokuhoPart(khSS, khSK, khSG, khKs0t, 1);
		const hk5 = hki5[2] + hks5[2];

		const kaig30l = this.calcKaigoLevel(shot30o, -1);	// 介護保険料段階
		const kaig1l = this.calcKaigoLevel(shot1o, -1);
		const kaig33l = this.calcKaigoLevel(shot33o, -1);
		const kaig2l = this.calcKaigoLevel(shot2o, -1);
		const kaig50l = this.calcKaigoLevel(shot50o, -1);
		const kaig3l = this.calcKaigoLevel(shot3o, -1);
		console.log(`dbg> shot0t: ${shot0t}`);
		console.log(`dbg> n0t: ${n0t}`);
		const kaig4l = this.calcKaigoLevel(shot0t, n0t);
		const kaigov = [-1,-1,-1,-1,-1,kaig5,kaig6,kaig7,-1];
		const kaig30o = kaigov[kaig30l];
		const kaig1o = kaigov[kaig1l];
		const kaig33o = kaigov[kaig33l];
		const kaig2o = kaigov[kaig2l];
		const kaig50o = kaigov[kaig50l];
		const kaig3o = kaigov[kaig3l];
		console.log(`dbg> kaig4l: ${kaig4l}`);
		const kaig4t = kaigov[kaig4l];

		const kkSw2o = (shot2o > kkKiso) ? shot2o - kkKiso : 0;			// 後期高齢者保険
		const kkSw50o = (shot50o > kkKiso) ? shot50o - kkKiso : 0;
		const kkSw3o = (shot3o > kkKiso) ? shot3o - kkKiso : 0;
		const kkSw0t = (shot0t > kkKiso) ? shot0t - kkKiso : 0;
		const koki2o = Math.round(kokik + kkSw2o * kokis / 100.0);
		const koki50o = Math.round(kokik + kkSw50o * kokis / 100.0);
		const koki3o = Math.round(kokik + kkSw3o * kokis / 100.0);
		const koki4t = Math.round(kokik + kkSw0t * kokis / 100.0);

		// 規定値設定
		this.spKhKiso.forEach(v => { v.innerText = khKiso.toLocaleString(); });
		this.spKky1.forEach(v => { v.innerText = knKy1.toLocaleString(); });
		this.spKky2.forEach(v => { v.innerText = knKy2.toLocaleString(); });
		this.spKko1.forEach(v => { v.innerText = knKo1.toLocaleString(); });
		this.spKko2.forEach(v => { v.innerText = knKo2.toLocaleString(); });

		this.spKhis.forEach(v => { v.innerText = khIS.toFixed(2); });
		this.spKhik.forEach(v => { v.innerText = khIK.toLocaleString(); });
		this.spKhig.forEach(v => { v.innerText = khIG.toLocaleString(); });
		this.spKhss.forEach(v => { v.innerText = khSS.toFixed(2); });
		this.spKhsk.forEach(v => { v.innerText = khSK.toLocaleString(); });
		this.spKhsg.forEach(v => { v.innerText = khSG.toLocaleString(); });
		this.spKhks.forEach(v => { v.innerText = khKS.toFixed(2); });
		this.spKhkk.forEach(v => { v.innerText = khKK.toLocaleString(); });
		this.spKhkg.forEach(v => { v.innerText = khKG.toLocaleString(); });
		this.spKaig5.forEach(v => { v.innerText = kaig5.toLocaleString(); });
		this.spKaig6.forEach(v => { v.innerText = kaig6.toLocaleString(); });
		this.spKaig7.forEach(v => { v.innerText = kaig7.toLocaleString(); });
		this.spKkKiso.forEach(v => { v.innerText = kkKiso.toLocaleString(); });
		this.spKokik.forEach(v => { v.innerText = kokik.toLocaleString(); });
		this.spKokis.forEach(v => { v.innerText = kokis.toFixed(2); });
		this.spSzRitu.forEach(v => { v.innerText = szRitu.toFixed(3); });	// 所得税
		this.spSzHaigu.forEach(v => { v.innerText = szHaigu.toLocaleString(); });
		this.spSzKiso.forEach(v => { v.innerText = szKiso.toLocaleString(); });
		
		this.spTaiGetsu.forEach(v => { v.innerText = taigetsu.toLocaleString(); });
		this.spN1o.forEach(v => { v.innerText = n1o.toLocaleString(); });
		this.spN2o.forEach(v => { v.innerText = n2o.toLocaleString(); });
		this.spN3o.forEach(v => { v.innerText = n3o.toLocaleString(); });
		this.spN0t.forEach(v => { v.innerText = n0t.toLocaleString(); });

		// 算出値設定
		this.spTai25.forEach(v => { v.innerText = tai25.toLocaleString(); });
		this.spTai.forEach(v => { v.innerText = tai.toLocaleString(); });
		this.spTai30.forEach(v => { v.innerText = tai30.toLocaleString(); });
		this.spShot25.forEach(v => { v.innerText = shot25.toLocaleString(); });
		this.spShot26.forEach(v => { v.innerText = shot26.toLocaleString(); });
		this.spN30o.forEach(v => { v.innerText = n30o.toLocaleString(); });
		this.spKN30o.forEach(v => { v.innerText = kn30o.toLocaleString(); });
		this.spN33o.forEach(v => { v.innerText = n33o.toLocaleString(); });
		this.spN50o.forEach(v => { v.innerText = n50o.toLocaleString(); });
		this.spShot1o.forEach(v => { v.innerText = shot1o.toLocaleString(); });
		this.spShot2o.forEach(v => { v.innerText = shot2o.toLocaleString(); });
		this.spShot3o.forEach(v => { v.innerText = shot3o.toLocaleString(); });
		this.spShot0t.forEach(v => { v.innerText = shot0t.toLocaleString(); });
		this.spShot30o.forEach(v => { v.innerText = shot30o.toLocaleString(); });
		this.spShot33o.forEach(v => { v.innerText = shot33o.toLocaleString(); });
		this.spShot50o.forEach(v => { v.innerText = shot50o.toLocaleString(); });
		this.spKs26o.forEach(v => { v.innerText = khKs26o.toLocaleString(); });
		this.spKs1o.forEach(v => { v.innerText = khKs1o.toLocaleString(); });
		this.spKs2o.forEach(v => { v.innerText = khKs2o.toLocaleString(); });
		this.spKs3o.forEach(v => { v.innerText = khKs3o.toLocaleString(); });
		this.spKs0t.forEach(v => { v.innerText = khKs0t.toLocaleString(); });
		this.spKs3ot.forEach(v => { v.innerText = khKs3ot.toLocaleString(); });
		this.spKs30o.forEach(v => { v.innerText = khKs30o.toLocaleString(); });
		this.spKs33o.forEach(v => { v.innerText = khKs33o.toLocaleString(); });
		this.spKs50o.forEach(v => { v.innerText = khKs50o.toLocaleString(); });
		this.spKs50ot.forEach(v => { v.innerText = khKs50ot.toLocaleString(); });

		this.setSpan3parts(this.spKhI26, hki26);		// 国保26
		this.setSpan3parts(this.spKhS26, hks26);
		this.setSpan3parts(this.spKhK26, hkk26);
		this.spKh26.forEach(v => { v.innerText = hk26.toLocaleString(); });
		this.setSpan3parts(this.spKhI30, hki30);		// 国保30
		this.setSpan3parts(this.spKhS30, hks30);
		this.setSpan3parts(this.spKhK30, hkk30);
		this.spKh30.forEach(v => { v.innerText = hk30.toLocaleString(); });
		this.setSpan3parts(this.spKhI1, hki1);		// 国保1
		this.setSpan3parts(this.spKhS1, hks1);
		this.setSpan3parts(this.spKhK1, hkk1);
		this.spKh1.forEach(v => { v.innerText = hk1.toLocaleString(); });
		this.setSpan3parts(this.spKhI33, hki33);		// 国保33
		this.setSpan3parts(this.spKhS33, hks33);
		this.setSpan3parts(this.spKhK33, hkk33);
		this.spKh33.forEach(v => { v.innerText = hk33.toLocaleString(); });
		this.setSpan3parts(this.spKhI2k2, hki2k2);	// 国保2K2
		this.setSpan3parts(this.spKhS2k2, hks2k2);
		this.setSpan3parts(this.spKhK2k2, hkk2k2);
		this.spKh2k2.forEach(v => { v.innerText = hk2k2.toLocaleString(); });
		this.setSpan3parts(this.spKhI2k1, hki2k1);	// 国保2K1
		this.setSpan3parts(this.spKhS2k1, hks2k1);
		this.setSpan3parts(this.spKhK2k1, hkk2k1);
		this.spKh2k1.forEach(v => { v.innerText = hk2k1.toLocaleString(); });
		this.setSpan3parts(this.spKhI2k0, hki2k0);	// 国保2K0
		this.setSpan3parts(this.spKhS2k0, hks2k0);
		this.setSpan3parts(this.spKhK2k0, hkk2k0);
		this.spKh2k0.forEach(v => { v.innerText = hk2k0.toLocaleString(); });
		this.setSpan3parts(this.spKhI4, hki4);		// 国保4
		this.setSpan3parts(this.spKhS4, hks4);
		this.setSpan3parts(this.spKhK4, hkk4);
		this.spKh4.forEach(v => { v.innerText = hk4.toLocaleString(); });
		this.setSpan3parts(this.spKhI50, hki50);		// 国保50
		this.setSpan3parts(this.spKhS50, hks50);
		this.setSpan3parts(this.spKhK50, hkk50);
		this.spKh50.forEach(v => { v.innerText = hk50.toLocaleString(); });
		this.setSpan3parts(this.spKhI3, hki3);		// 国保3
		this.setSpan3parts(this.spKhS3, hks3);
		this.spKh3.forEach(v => { v.innerText = hk3.toLocaleString(); });
		this.setSpan3parts(this.spKhI5, hki5);		// 国保5
		this.setSpan3parts(this.spKhS5, hks5);
		this.spKh5.forEach(v => { v.innerText = hk5.toLocaleString(); });

		this.spKaig301.forEach(v => { v.innerText = kaig30l.toLocaleString(); });	// 介護保険
		this.spKaigl1.forEach(v => { v.innerText = kaig1l.toLocaleString(); });
		this.spKaig331.forEach(v => { v.innerText = kaig33l.toLocaleString(); });
		this.spKaig21.forEach(v => { v.innerText = kaig2l.toLocaleString(); });
		this.spKaig501.forEach(v => { v.innerText = kaig50l.toLocaleString(); });
		this.spKaig31.forEach(v => { v.innerText = kaig3l.toLocaleString(); });
		this.spKaig41.forEach(v => { v.innerText = kaig4l.toLocaleString(); });
		this.spKaig30o.forEach(v => { v.innerText = kaig30o.toLocaleString(); });
		this.spKaiglo.forEach(v => { v.innerText = kaig1o.toLocaleString(); });
		this.spKaig33o.forEach(v => { v.innerText = kaig33o.toLocaleString(); });
		this.spKaig2o.forEach(v => { v.innerText = kaig2o.toLocaleString(); });
		this.spKaig50o.forEach(v => { v.innerText = kaig50o.toLocaleString(); });
		this.spKaig3o.forEach(v => { v.innerText = kaig3o.toLocaleString(); });
		console.log(`dbg> kaig4t: ${kaig4t}`);
		this.spKaig4t.forEach(v => { v.innerText = kaig4t.toLocaleString(); });
		this.spKoki2o.forEach(v => { v.innerText = koki2o.toLocaleString(); });	// 後期高齢者保険
		this.spKoki50o.forEach(v => { v.innerText = koki50o.toLocaleString(); });
		this.spKoki3o.forEach(v => { v.innerText = koki3o.toLocaleString(); });
		this.spKoki4t.forEach(v => { v.innerText = koki4t.toLocaleString(); });

		//this.spanNenp25.forEach(v => { v.innerText = nenpay25.toLocaleString(); });	// 国民年金保険
		this.spanNenp30.forEach(v => { v.innerText = nenpay30.toLocaleString(); });
		this.spanNenp31.forEach(v => { v.innerText = nenpay31.toLocaleString(); });
		this.spanNenp32.forEach(v => { v.innerText = nenpay32.toLocaleString(); });
		this.spanNenp37.forEach(v => { v.innerText = nenpay37.toLocaleString(); });
		this.spanNenp38.forEach(v => { v.innerText = nenpay38.toLocaleString(); });
		this.spanNenp49.forEach(v => { v.innerText = nenpay49.toLocaleString(); });
		
	}

	calcKaigoLevel(shotoku, nenkin){
		let level = -1;
		if (nenkin < 0) {	// 住民税課税の場合で計算
			if (shotoku >= 2100000) level = -1;
			else if (shotoku >= 1200000) level = 7;
			else level = 6;
		} else {			// 住民税非課税の場合で計算
			if (shotoku < 450000 && (nenkin + shotoku) > 800000) level = 5;
		}
		
		return level;
	}

	getSpan3parts(name1, name2, name3){
		return [
			Array.from(document.getElementsByClassName(name1)),
			Array.from(document.getElementsByClassName(name2)),
			Array.from(document.getElementsByClassName(name3)) ];
	}
	
	calcKokuhoPart(shotokuwari, kintowari, gendo, shotoku, nin){
		const s = Math.round(shotoku * shotokuwari / 100.0);
		const k = nin * kintowari;
		let ans = s + k;
		ans = Math.floor(ans / 100) * 100;
		if (ans > gendo) ans = gendo;
		return [s, k, ans];
	}
	
	setSpan3parts(parts, values){
		parts[0].forEach(v => { v.innerText = values[0].toLocaleString(); });
		parts[1].forEach(v => { v.innerText = values[1].toLocaleString(); });
		parts[2].forEach(v => { v.innerText = values[2].toLocaleString(); });
	}

	// パラメータ値更新
	updateParams(){
		const zmap = this.zeikinParamsMap;
		const nmap = this.nenkinValuesMap;
		try{
			// 規定値マップ作成
			//const text = this.contentsText.value;
			zmap.clear();
			for (let line of this.contentsText.value.split('\n')){	// 1行ずつ
				let word = line.split(/:|：/);
				if (word == ''){
					continue;
				}
				if (word.length > 1){
					zmap.set(word[0], word[1]);
				}
			}
			this.viewZeikinParams();	// 税金規定値表示
			//const text = this.contentsText2.value;
			nmap.clear();
			for (let line of this.contentsText2.value.split('\n')){	// 1行ずつ
				let word = line.split(/:|：/);
				if (word == ''){
					continue;
				}
				if (word.length > 1){
					nmap.set(word[0], word[1]);
				}
			}
			this.viewNenkinValues();	// 年金値表示
			this.calcZeikin();	// 計算式更新
		}
		catch(e){
			console.error(e);
			this.zeikinParams.innerHTML = e.stack;
		}
	}

	// 税金算出規定値表示
	viewZeikinParams(){
		const varkeys = [
			"公的年金等控除65歳未満130万円以下控除額","公的年金等控除65歳未満410万円以下控除額定額分",
			"公的年金等控除65歳以上330万円以下控除額","公的年金等控除65歳以上410万円以下控除額定額分",
			"国民健康保険基礎控除",
			"国民健康保険医療分所得割","国民健康保険医療分均等割","国民健康保険医療分限度額",
			"国民健康保険支援分所得割","国民健康保険支援分均等割","国民健康保険支援分限度額",
			"国民健康保険介護分所得割","国民健康保険介護分均等割","国民健康保険介護分限度額",
			"介護保険料第5段階年額","介護保険料第6段階年額","介護保険料第7段階年額",
			"後期高齢者保険基礎控除", "後期高齢者保険均等割","後期高齢者保険所得割",
			"年金所得税率（復興特別税含む）", "所得税基礎控除", "所得税配偶者控除",
			"退職年金月額",
			"夫年金受給で65歳未満妻と子の夫課税年金額","夫年金受給で65歳未満妻の夫課税年金額",
			"夫妻年金受給の夫課税年金額","妻年金受給の妻課税年金額"
			];
		try{
			this.zeikinParams.innerHTML = "";
			let result = '<table class="VALUES">';
			result += '<tr><th>項目</th><th>値</th></tr>';
			this.zeikinParamsMap.forEach((value, key) => {
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
			this.zeikinParams.innerHTML = result;
		}
		catch(e){
			console.error(e);
			this.zeikinParams.innerHTML = e.stack;
		}
	}
	
	// 年金値表示
	viewNenkinValues(){
		const varkeys = [
			"夫年金受給で65歳未満妻と子の夫課税年金額","夫年金受給で65歳未満妻の夫課税年金額",
			"夫妻年金受給の夫課税年金額","妻年金受給の妻課税年金額",
			"夫亡き妻65歳未満で子が2人の妻年金額","夫亡き妻65歳未満で子が1人の妻年金額",
			"夫亡き妻65歳未満の妻年金額","夫亡き妻年金受給の妻年金額",
			"国民年金納付額2025～2029年","国民年金納付額2030年","国民年金納付額2031年",
			"国民年金納付額2032～2036年","国民年金納付額2037年","国民年金納付額2038～2048年","国民年金納付額2049年"
			];
		try{
			this.nenkinValues.innerHTML = "";
			let result = '<table class="VALUES">';
			result += '<tr><th>項目</th><th>値</th></tr>';
			this.nenkinValuesMap.forEach((value, key) => {
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
	setText2(text){
		this.contentsText2.value = text;
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
	async readFile2(file){
		const text = await FileUtil.readTextSync(file);
		if (text){
			this.contentsText2.value = text;
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

	// 図を表示する
	drawFigures() {
		const img11 = "imgpv/shotoku11.png";
		const img12 = "imgpv/shotoku12.png";
		const img1 = "imgpv/shotoku1.png";
		const img2 = "imgpv/shotoku2.png";
		const img3 = "imgpv/shotoku3.png";
		const img4 = "imgpv/shotoku4.png";
		const img5 = "imgpv/shotoku5.png";
		const can11 = document.getElementById("can11");
		const can12 = document.getElementById("can12");
		const can26 = document.getElementById("can26");
		const can30 = document.getElementById("can30");
		const can1 = document.getElementById("can1");
		const can33 = document.getElementById("can33");
		const can2k2 = document.getElementById("can2k2");
		const can2k1 = document.getElementById("can2k1");
		const can2k0 = document.getElementById("can2k0");
		const can50 = document.getElementById("can50");
		const can3 = document.getElementById("can3");
		const can5 = document.getElementById("can5");
		const can5b = document.getElementById("can5b");
		const can4 = document.getElementById("can4");
		const can6c1 = document.getElementById("can6c1");
		const can7c1 = document.getElementById("can7c1");
		const can6c2 = document.getElementById("can6c2");
		const can7c2 = document.getElementById("can7c2");
		const can7b = document.getElementById("can7b");
		const can7c = document.getElementById("can7c");
		const can7d = document.getElementById("can7d");
		const can7e = document.getElementById("can7e");
		const can11b = document.getElementById("can11b");
		const can12b = document.getElementById("can12b");
		const can11c = document.getElementById("can11c");
		const can12c = document.getElementById("can12c");
		const can11d = document.getElementById("can11d");
		const can12d = document.getElementById("can12d");
		const mag = 0.75;
		const ry = 0;
		const rh = 110;
		const col = "rgba(255, 180, 255, 0.55)";
		this.drawImage(can11, img11, mag);
		this.drawImage(can12, img12, mag);
		this.drawImageRect(can26, img1, mag, 41, ry, 35, rh, col);
		this.drawImageRect(can30, img1, mag, 76, ry, 8, rh, col);
		this.drawImageRect(can1, img1, mag, 84, ry, 14, rh, col);
		this.drawImageRect(can33, img1, mag, 98, ry, 8, rh, col);
		this.drawImageRect(can2k2, img1, mag, 106, ry, 38, rh, col);
		this.drawImageRect(can2k1, img1, mag, 144, ry, 22, rh, col);
		this.drawImageRect(can2k0, img1, mag, 166, ry, 54, rh, col);
		this.drawImageRect(can50, img1, mag, 218, ry, 8, rh, col);
		this.drawImageRect(can3, img1, mag, 225, ry, 11, rh, col);
		this.drawImageRect(can5, img1, mag, 237, ry, 19, rh, col);
		this.drawImageRect(can5b, img2, mag, 225, ry, 31, rh, col);
		this.drawImageRect(can4, img2, mag, 196, ry, 30, rh, col);
		this.drawImageRect(can6c1, img3, mag, 154, ry, 12, rh, col);
		this.drawImageRect(can7c1, img5, mag, 144, ry, 22, rh, col);
		this.drawImageRect(can6c2, img4, mag, 132, ry, 12, rh, col);
		this.drawImageRect(can7c2, img5, mag, 102, ry, 42, rh, col);
		this.drawImageRect(can7b, img5, mag, 61, ry, 19, rh, col);
		this.drawImageRect(can7c, img5, mag, 80, ry, 21, rh, col);
		this.drawImageRect(can7d, img5, mag, 101, ry, 43, rh, col);
		this.drawImageRect(can7e, img5, mag, 144, ry, 21, rh, col);
		this.drawImage(can11b, img11, mag);
		this.drawImage(can12b, img12, mag);
		this.drawImage(can11c, img11, mag);
		this.drawImage(can12c, img12, mag);
		this.drawImage(can11d, img11, mag);
		this.drawImage(can12d, img12, mag);
	}

	// 指定倍率で画像を表示する
    drawImage(canvas, imagePath, mag){
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.addEventListener("load",function (){
			const iw = image.naturalWidth * mag;
			const ih = image.naturalHeight * mag;
            canvas.width = iw;
            canvas.height = ih;
            ctx.drawImage(image, 0, 0, iw, ih);
        });
        image.src = imagePath;
    }
	
	// 指定倍率で画像と矩形を表示する
    drawImageRect(canvas, imagePath, mag, rx, ry, rw, rh, color){
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.addEventListener("load",function (){
			const iw = image.naturalWidth * mag;
			const ih = image.naturalHeight * mag;
            canvas.width = iw;
            canvas.height = ih;
            ctx.drawImage(image, 0, 0, iw, ih);
			ctx.fillStyle = color;
			ctx.fillRect (rx, ry, rw, rh);
        });
        image.src = imagePath;
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
