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
		app.init();
		app.run();
	}
	catch(e){
		console.log(e);
		alert("エラー:"+e);
	}
};

// 税金算出規定値画面部品
class ZeikinParamWidget {
	spKky1 = null;	// KKY1
	spKky2 = null;	// KKY2
	spKko1 = null;	// KKO1
	spKko2 = null;	// KKO2
	spKhKiso = null;	// KOKKHISWO
	spKhis = null;	// KHIS
	spKhik = null;	// KHIK
	spKhig = null;	// KHIG
	spKhss = null;	// KHSS
	spKhsk = null;	// KHSK
	spKhsg = null;	// KHSG
	spKhks = null;	// KKHSB
	spKhkk = null;	// KKHKB
	spKhkg = null;	// KHKG
	spKaig1 = null;	// KAIG1
	spKaig2 = null;	// KAIG2
	spKaig3 = null;	// KAIG3
	spKaig4 = null;	// KAIG4
	spKaig5 = null;	// KAIG5
	spKaig6 = null;	// KAIG6
	spKaig7 = null;	// KAIG7
	spKkKiso = null;	// KOKIKISO
	spKokik = null;	// KOKIK
	spKokis = null;	// KOKIS
	spSzRitu = null;	// SZRITU = null;	// 所得税
	spSzKiso = null;	// SZKISO
	spSzHaigu = null;	// SZHAIGU
	spSzFuyo = null;	// SZFUYO
	spJzRitu = null;	// JZRITU
	spJzKinto = null;	// JZKINTO
	spJzKiso = null;	// JZKISO
	spJzHaigu = null;	// JZHAIGU
	spJzKafu = null;	// JZKAFU
	spJzFuyoA = null;	// JZFUYOA
	spJzFuyoB = null;	// JZFUYOB
	spJzFuyoC = null;	// JZFUYOC

	constructor(){
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
		this.spKaig1 = Array.from(document.getElementsByClassName("KAIG1"));
		this.spKaig2 = Array.from(document.getElementsByClassName("KAIG2"));
		this.spKaig3 = Array.from(document.getElementsByClassName("KAIG3"));
		this.spKaig4 = Array.from(document.getElementsByClassName("KAIG4"));
		this.spKaig5 = Array.from(document.getElementsByClassName("KAIG5"));
		this.spKaig6 = Array.from(document.getElementsByClassName("KAIG6"));
		this.spKaig7 = Array.from(document.getElementsByClassName("KAIG7"));
		this.spKkKiso = Array.from(document.getElementsByClassName("KOKIKISO"));
		this.spKokik = Array.from(document.getElementsByClassName("KOKIK"));
		this.spKokis = Array.from(document.getElementsByClassName("KOKIS"));
		this.spSzRitu = Array.from(document.getElementsByClassName("SZRITU"));	// 所得税
		this.spSzKiso = Array.from(document.getElementsByClassName("SZKISO"));
		this.spSzHaigu = Array.from(document.getElementsByClassName("SZHAIGU"));
		this.spSzFuyo = Array.from(document.getElementsByClassName("SZFUYO"));
		this.spJzRitu = Array.from(document.getElementsByClassName("JZRITU"));
		this.spJzKinto = Array.from(document.getElementsByClassName("JZKINTO"));
		this.spJzKiso = Array.from(document.getElementsByClassName("JZKISO"));
		this.spJzHaigu = Array.from(document.getElementsByClassName("JZHAIGU"));
		this.spJzKafu = Array.from(document.getElementsByClassName("JZKAFU"));
		this.spJzFuyoA = Array.from(document.getElementsByClassName("JZFUYOA"));
		this.spJzFuyoB = Array.from(document.getElementsByClassName("JZFUYOB"));
		this.spJzFuyoC = Array.from(document.getElementsByClassName("JZFUYOC"));
	}
	
	update(param){	// 更新
		this.spKhKiso.forEach(v => { v.innerText = param.khKiso.toLocaleString(); });
		this.spKky1.forEach(v => { v.innerText = param.knKy1.toLocaleString(); });
		this.spKky2.forEach(v => { v.innerText = param.knKy2.toLocaleString(); });
		this.spKko1.forEach(v => { v.innerText = param.knKo1.toLocaleString(); });
		this.spKko2.forEach(v => { v.innerText = param.knKo2.toLocaleString(); });
		this.spKhis.forEach(v => { v.innerText = param.khIS.toFixed(2); });
		this.spKhik.forEach(v => { v.innerText = param.khIK.toLocaleString(); });
		this.spKhig.forEach(v => { v.innerText = param.khIG.toLocaleString(); });
		this.spKhss.forEach(v => { v.innerText = param.khSS.toFixed(2); });
		this.spKhsk.forEach(v => { v.innerText = param.khSK.toLocaleString(); });
		this.spKhsg.forEach(v => { v.innerText = param.khSG.toLocaleString(); });
		this.spKhks.forEach(v => { v.innerText = param.khKS.toFixed(2); });
		this.spKhkk.forEach(v => { v.innerText = param.khKK.toLocaleString(); });
		this.spKhkg.forEach(v => { v.innerText = param.khKG.toLocaleString(); });
		this.spKaig1.forEach(v => { v.innerText = param.kaig1.toLocaleString(); });
		this.spKaig2.forEach(v => { v.innerText = param.kaig2.toLocaleString(); });
		this.spKaig3.forEach(v => { v.innerText = param.kaig3.toLocaleString(); });
		this.spKaig4.forEach(v => { v.innerText = param.kaig4.toLocaleString(); });
		this.spKaig5.forEach(v => { v.innerText = param.kaig5.toLocaleString(); });
		this.spKaig6.forEach(v => { v.innerText = param.kaig6.toLocaleString(); });
		this.spKaig7.forEach(v => { v.innerText = param.kaig7.toLocaleString(); });
		this.spKkKiso.forEach(v => { v.innerText = param.kkKiso.toLocaleString(); });
		this.spKokik.forEach(v => { v.innerText = param.kokik.toLocaleString(); });
		this.spKokis.forEach(v => { v.innerText = param.kokis.toFixed(2); });
		this.spSzRitu.forEach(v => { v.innerText = param.szRitu.toFixed(3); });		// 所得税
		this.spSzKiso.forEach(v => { v.innerText = param.szKiso.toLocaleString(); });
		this.spSzHaigu.forEach(v => { v.innerText = param.szHaigu.toLocaleString(); });
		this.spSzFuyo.forEach(v => { v.innerText = param.szFuyo.toLocaleString(); });
		this.spJzRitu.forEach(v => { v.innerText = param.jzRitu.toFixed(2); });		// 住民税
		this.spJzKinto.forEach(v => { v.innerText = param.jzKinto.toLocaleString(); });
		this.spJzKiso.forEach(v => { v.innerText = param.jzKiso.toLocaleString(); });
		this.spJzHaigu.forEach(v => { v.innerText = param.jzHaigu.toLocaleString(); });
		this.spJzKafu.forEach(v => { v.innerText = param.jzKafu.toLocaleString(); });
		this.spJzFuyoA.forEach(v => { v.innerText = param.jzFuyoA.toLocaleString(); });
		this.spJzFuyoB.forEach(v => { v.innerText = param.jzFuyoB.toLocaleString(); });
		this.spJzFuyoC.forEach(v => { v.innerText = param.jzFuyoC.toLocaleString(); });
	}
}

// 税金算出規定値
class ZeikinParam {
	knKy1 = 0;	// 年金等控除65歳未満130万円以下
	knKy2 = 0;	// 年金等控除65歳未満410万円以下定額分
	knKo1 = 0;	// 年金等控除65歳以上330万円以下
	knKo2 = 0;	// 年金等控除65歳以上410万円以下定額分
	khKiso = 0;	// 国民健康保険基礎控除
	khIS = 0;	// 国民健康保険医療分所得割
	khIK = 0;	// 国民健康保険医療分均等割
	khIG = 0;	// 国民健康保険医療分限度額
	khSS = 0;	// 国民健康保険支援分所得割
	khSK = 0;	// 国民健康保険支援分均等割
	khSG = 0;	// 国民健康保険支援分限度額
	khKS = 0;	// 国民健康保険介護分所得割
	khKK = 0;	// 国民健康保険介護分均等割
	khKG = 0;	// 国民健康保険介護分限度額
	kaig1 = 0;	// 介護保険料第1段階年額
	kaig2 = 0;	// 介護保険料第2段階年額
	kaig3 = 0;	// 介護保険料第3段階年額
	kaig4 = 0;	// 介護保険料第4段階年額
	kaig5 = 0;	// 介護保険料第5段階年額
	kaig6 = 0;	// 介護保険料第6段階年額
	kaig7 = 0;	// 介護保険料第7段階年額
	kkKiso = 0;	// 後期高齢者保険基礎控除
	kokik = 0;	// 後期高齢者保険均等割
	kokis = 0;	// 後期高齢者保険所得割
	szRitu = 0;	// 年金所得税率（復興特別税含む）
	szKiso = 0;	// 所得税基礎控除
	szHaigu = 0;	// 所得税配偶者控除
	szFuyo = 0;		// 所得税扶養控除
	jzRitu = 0;		// 住民税率
	jzKinto = 0;	// 住民税均等割
	jzKiso = 0;		// 住民税基礎控除
	jzHaigu = 0;	// 住民税配偶者控除
	jzKafu = 0;		// 住民税寡婦控除
	jzFuyoA = 0;	// 住民税扶養控除一般
	jzFuyoB = 0;	// 住民税扶養控除特定
	jzFuyoC = 0;	// 住民税扶養控除老人

	constructor(zmap){
		this.knKy1 = Number(zmap.get('年金等控除65歳未満130万円以下'));
		this.knKy2 = Number(zmap.get('年金等控除65歳未満410万円以下定額分'));
		this.knKo1 = Number(zmap.get('年金等控除65歳以上330万円以下'));
		this.knKo2 = Number(zmap.get('年金等控除65歳以上410万円以下定額分'));
		this.khKiso = Number(zmap.get('国民健康保険基礎控除'));
		this.khIS = parseFloat(zmap.get('国民健康保険医療分所得割'));
		this.khIK = Number(zmap.get('国民健康保険医療分均等割'));
		this.khIG = Number(zmap.get('国民健康保険医療分限度額'));
		this.khSS = parseFloat(zmap.get('国民健康保険支援分所得割'));
		this.khSK = Number(zmap.get('国民健康保険支援分均等割'));
		this.khSG = Number(zmap.get('国民健康保険支援分限度額'));
		this.khKS = parseFloat(zmap.get('国民健康保険介護分所得割'));
		this.khKK = Number(zmap.get('国民健康保険介護分均等割'));
		this.khKG = Number(zmap.get('国民健康保険介護分限度額'));
		this.kaig1 = Number(zmap.get('介護保険料第1段階年額'));
		this.kaig2 = Number(zmap.get('介護保険料第2段階年額'));
		this.kaig3 = Number(zmap.get('介護保険料第3段階年額'));
		this.kaig4 = Number(zmap.get('介護保険料第4段階年額'));
		this.kaig5 = Number(zmap.get('介護保険料第5段階年額'));
		this.kaig6 = Number(zmap.get('介護保険料第6段階年額'));
		this.kaig7 = Number(zmap.get('介護保険料第7段階年額'));
		this.kkKiso = Number(zmap.get('後期高齢者保険基礎控除'));
		this.kokik = Number(zmap.get('後期高齢者保険均等割'));
		this.kokis = parseFloat(zmap.get('後期高齢者保険所得割'));		
		this.szRitu = parseFloat(zmap.get('年金所得税率（復興特別税含む）'));
		this.szKiso = Number(zmap.get('所得税基礎控除'));
		this.szHaigu = Number(zmap.get('所得税配偶者控除'));
		this.szFuyo = Number(zmap.get('所得税扶養控除'));
		this.jzRitu = parseFloat(zmap.get('住民税率'));
		this.jzKinto = Number(zmap.get('住民税均等割'));
		this.jzKiso = Number(zmap.get('住民税基礎控除'));
		this.jzHaigu = Number(zmap.get('住民税配偶者控除'));
		this.jzKafu = Number(zmap.get('住民税寡婦控除'));
		this.jzFuyoA = Number(zmap.get('住民税扶養控除一般'));
		this.jzFuyoB = Number(zmap.get('住民税扶養控除特定'));
		this.jzFuyoC = Number(zmap.get('住民税扶養控除老人'));
	}
}

// 公的年金データ値画面部品
class NenkinValuesWidget {
	spANen25o = null;	// AONEN25
	spANen26o = null;	// AONEN26
	spANen30o = null;	// AONEN30
	spANen31o = null;	// AONEN31
	spANen33o = null;	// AONEN33
	spANen34o = null;	// AONEN34
	spANen50o = null;	// AONEN50
	spANen50t = null;	// ATNEN50
	spANen51o = null;	// AONEN51
	spANen51t = null;	// ATNEN51
	spANenXt = null;	// ATNENX
	spBNen25o = null;	// BONEN25
	spBNen26o = null;	// BONEN26
	spBNen30o = null;	// BONEN30
	spBNen31o = null;	// BONEN31
	spBNen33o = null;	// BONEN33
	spBNen34o = null;	// BONEN34
	spBNen49t = null;	// BTNEN49
	spBNen50t = null;	// BTNEN50
	spBNen51t = null;	// BTNEN51
	spCNen25o = null;	// CONEN25
	spCNen26o = null;	// CONEN26
	spCNen29t = null;	// CTNEN29
	spCNen30t = null;	// CTNEN30
	spCNen31t = null;	// CTNEN31
	spCNen33t = null;	// CTNEN33
	spCNen34t = null;	// CTNEN34
	spCNen50t = null;	// CTNEN50
	spCNen51t = null;	// CTNEN51
	spANenP25 = null;	// ANENP25
	spANenP30 = null;	// ANENP30
	spANenP31 = null;	// ANENP31
	spANenP32 = null;	// ANENP32
	spANenP37 = null;	// ANENP37
	spANenP38 = null;	// ANENP38
	spANenP49 = null;	// ANENP49

	constructor(){
		this.spANen25o = Array.from(document.getElementsByClassName("AONEN25"));
		this.spANen26o = Array.from(document.getElementsByClassName("AONEN26"));
		this.spANen30o = Array.from(document.getElementsByClassName("AONEN30"));
		this.spANen31o = Array.from(document.getElementsByClassName("AONEN31"));
		this.spANen33o = Array.from(document.getElementsByClassName("AONEN33"));
		this.spANen34o = Array.from(document.getElementsByClassName("AONEN34"));
		this.spANen50o = Array.from(document.getElementsByClassName("AONEN50"));
		this.spANen50t = Array.from(document.getElementsByClassName("ATNEN50"));
		this.spANen51o = Array.from(document.getElementsByClassName("AONEN51"));
		this.spANen51t = Array.from(document.getElementsByClassName("ATNEN51"));
		this.spANenXt = Array.from(document.getElementsByClassName("ATNENX"));
		this.spBNen25o = Array.from(document.getElementsByClassName("BONEN25"));
		this.spBNen26o = Array.from(document.getElementsByClassName("BONEN26"));
		this.spBNen30o = Array.from(document.getElementsByClassName("BONEN30"));
		this.spBNen31o = Array.from(document.getElementsByClassName("BONEN31"));
		this.spBNen33o = Array.from(document.getElementsByClassName("BONEN33"));
		this.spBNen34o = Array.from(document.getElementsByClassName("BONEN34"));
		this.spBNen49t = Array.from(document.getElementsByClassName("BTNEN49"));
		this.spBNen50t = Array.from(document.getElementsByClassName("BTNEN50"));
		this.spBNen51t = Array.from(document.getElementsByClassName("BTNEN51"));
		this.spCNen25o = Array.from(document.getElementsByClassName("CONEN25"));
		this.spCNen26o = Array.from(document.getElementsByClassName("CONEN26"));
		this.spCNen29t = Array.from(document.getElementsByClassName("CTNEN29"));
		this.spCNen30t = Array.from(document.getElementsByClassName("CTNEN30"));
		this.spCNen31t = Array.from(document.getElementsByClassName("CTNEN31"));
		this.spCNen33t = Array.from(document.getElementsByClassName("CTNEN33"));
		this.spCNen34t = Array.from(document.getElementsByClassName("CTNEN34"));
		this.spCNen50t = Array.from(document.getElementsByClassName("CTNEN50"));
		this.spCNen51t = Array.from(document.getElementsByClassName("CTNEN51"));
		this.spANenP25 = Array.from(document.getElementsByClassName("ANENP25"));
		this.spANenP30 = Array.from(document.getElementsByClassName("ANENP30"));
		this.spANenP31 = Array.from(document.getElementsByClassName("ANENP31"));
		this.spANenP32 = Array.from(document.getElementsByClassName("ANENP32"));
		this.spANenP37 = Array.from(document.getElementsByClassName("ANENP37"));
		this.spANenP38 = Array.from(document.getElementsByClassName("ANENP38"));
		this.spANenP49 = Array.from(document.getElementsByClassName("ANENP49"));
	}
	update(value){	// 更新
		this.spANen25o.forEach(v => { v.innerText = value.aNen25o.toLocaleString(); });
		this.spANen26o.forEach(v => { v.innerText = value.aNen26o.toLocaleString(); });
		this.spANen30o.forEach(v => { v.innerText = value.aNen30o.toLocaleString(); });
		this.spANen31o.forEach(v => { v.innerText = value.aNen31o.toLocaleString(); });
		this.spANen33o.forEach(v => { v.innerText = value.aNen33o.toLocaleString(); });
		this.spANen34o.forEach(v => { v.innerText = value.aNen34o.toLocaleString(); });
		this.spANen50o.forEach(v => { v.innerText = value.aNen50o.toLocaleString(); });
		this.spANen50t.forEach(v => { v.innerText = value.aNen50t.toLocaleString(); });
		this.spANen51o.forEach(v => { v.innerText = value.aNen51o.toLocaleString(); });
		this.spANen51t.forEach(v => { v.innerText = value.aNen51t.toLocaleString(); });
		this.spANenXt.forEach(v => { v.innerText = value.aNenXt.toLocaleString(); });
		this.spBNen25o.forEach(v => { v.innerText = value.bNen25o.toLocaleString(); });
		this.spBNen26o.forEach(v => { v.innerText = value.bNen26o.toLocaleString(); });
		this.spBNen30o.forEach(v => { v.innerText = value.bNen30o.toLocaleString(); });
		this.spBNen31o.forEach(v => { v.innerText = value.bNen31o.toLocaleString(); });
		this.spBNen33o.forEach(v => { v.innerText = value.bNen33o.toLocaleString(); });
		this.spBNen34o.forEach(v => { v.innerText = value.bNen34o.toLocaleString(); });
		this.spBNen49t.forEach(v => { v.innerText = value.bNen49t.toLocaleString(); });
		this.spBNen50t.forEach(v => { v.innerText = value.bNen50t.toLocaleString(); });
		this.spBNen51t.forEach(v => { v.innerText = value.bNen51t.toLocaleString(); });
		this.spCNen25o.forEach(v => { v.innerText = value.cNen25o.toLocaleString(); });
		this.spCNen26o.forEach(v => { v.innerText = value.cNen26o.toLocaleString(); });
		this.spCNen29t.forEach(v => { v.innerText = value.cNen29t.toLocaleString(); });
		this.spCNen30t.forEach(v => { v.innerText = value.cNen30t.toLocaleString(); });
		this.spCNen31t.forEach(v => { v.innerText = value.cNen31t.toLocaleString(); });
		this.spCNen33t.forEach(v => { v.innerText = value.cNen33t.toLocaleString(); });
		this.spCNen34t.forEach(v => { v.innerText = value.cNen34t.toLocaleString(); });
		this.spCNen50t.forEach(v => { v.innerText = value.cNen50t.toLocaleString(); });
		this.spCNen51t.forEach(v => { v.innerText = value.cNen51t.toLocaleString(); });
		this.spANenP25.forEach(v => { v.innerText = value.aNenPay25_29o.toLocaleString(); });
		this.spANenP30.forEach(v => { v.innerText = value.aNenPay30o.toLocaleString(); });
		this.spANenP31.forEach(v => { v.innerText = value.aNenPay31o.toLocaleString(); });
		this.spANenP32.forEach(v => { v.innerText = value.aNenPay32_36o.toLocaleString(); });
		this.spANenP37.forEach(v => { v.innerText = value.aNenPay37o.toLocaleString(); });
		this.spANenP38.forEach(v => { v.innerText = value.aNenPay38_48o.toLocaleString(); });
		this.spANenP49.forEach(v => { v.innerText = value.aNenPay49o.toLocaleString(); });
	}
}

// 公的年金データ値
class NenkinValues {
	aNen25o = 0;	// 長寿_夫受給年金額25
	aNen26o = 0;	// 長寿_夫受給年金額26_29
	aNen30o = 0;	// 長寿_夫受給年金額30
	aNen31o = 0;	// 長寿_夫受給年金額31_32
	aNen33o = 0;	// 長寿_夫受給年金額33
	aNen34o = 0;	// 長寿_夫受給年金額34_49
	aNen50o = 0;	// 長寿_夫受給年金額50
	aNen50t = 0;	// 長寿_妻受給年金額50
	aNen51o = 0;	// 長寿_夫受給年金額51_X
	aNen51t = 0;	// 長寿_妻受給年金額51_X
	aNenXtF = 0;	// 長寿_妻受給年金額X（非課税分含む）
	aNenXt = 0;		// 長寿_妻課税年金額X（課税）
	bNen25o = 0;	// 標準_夫受給年金額25
	bNen26o = 0;	// 標準_夫受給年金額26_29
	bNen30o = 0;	// 標準_夫受給年金額30
	bNen31o = 0;	// 標準_夫受給年金額31_32
	bNen33o = 0;	// 標準_夫受給年金額33
	bNen34o = 0;	// 標準_夫受給年金額34_X
	bNen49tF = 0;	// 標準_妻受給年金額X_49（非課税分含む）
	bNen50tF = 0;	// 標準_妻受給年金額50（非課税分含む）
	bNen51tF = 0;	// 標準_妻受給年金額51_x（非課税分含む）
	bNen49t = 0;	// 標準_妻課税年金額X_49（課税）
	bNen50t = 0;	// 標準_妻課税年金額50（課税）
	bNen51t = 0;	// 標準_妻課税年金額51_x（課税）
	cNen25o = 0;	// 短命_夫受給年金額25
	cNen26o = 0;	// 短命_夫受給年金額26_X
	cNen29t = 0;	// 短命_妻受給年金額X_29
	cNen30t = 0;	// 短命_妻受給年金額30
	cNen31t = 0;	// 短命_妻受給年金額31_32
	cNen33t = 0;	// 短命_妻受給年金額33
	cNen34tF = 0;	// 短命_妻受給年金額34_49（非課税分含む）
	cNen50tF = 0;	// 短命_妻受給年金額50（非課税分含む）
	cNen51tF = 0;	// 短命_妻受給年金額51_x（非課税分含む）
	cNen34t = 0;	// 短命_妻課税年金額X_49（課税）
	cNen50t = 0;	// 短命_妻課税年金額50（課税）
	cNen51t = 0;	// 短命_妻課税年金額51_x（課税）
	aNenPay25_29o = 0;	// 長寿_夫年金納付額25_29
	aNenPay30o = 0;		// 長寿_夫年金納付額30
	aNenPay31o = 0;		// 長寿_夫年金納付額31
	aNenPay32_36o = 0;	// 長寿_夫年金納付額32_36
	aNenPay37o = 0;		// 長寿_夫年金納付額37
	aNenPay38_48o = 0;	// 長寿_夫年金納付額38_48
	aNenPay49o = 0;		// 長寿_夫年金納付額49
	bNenPay25_29 = 0;	// 標準_夫年金納付額25_29
	bNenPay30o = 0;		// 標準_夫年金納付額30
	bNenPay31o = 0;		// 標準_夫年金納付額31
	bNenPay32_36o = 0;	// 標準_夫年金納付額32_36
	bNenPay37o = 0;		// 標準_夫年金納付額37
	bNenPay38_Xo = 0;	// 標準_夫年金納付額38_X
	bNenPayX_48t = 0;	// 標準_妻年金納付額X_48
	bNenPay49t = 0;		// 標準_妻年金納付額49
	cNenPay25_Xo = 0;	// 短命_夫年金納付額25_X
	cNenPayX_30t = 0;	// 短命_妻年金納付額X_30
	cNenPay31t = 0;		// 短命_妻年金納付額31
	cNenPay32_36t = 0;	// 短命_妻年金納付額32_36
	cNenPay37t = 0;		// 短命_妻年金納付額37
	cNenPay38_48t = 0;	// 短命_妻年金納付額38_48
	cNenPay49t = 0;		// 短命_妻年金納付額49

	constructor(nmap){
		this.aNen25o = Number(nmap.get('長寿_夫受給年金額25'));
		this.aNen26o = Number(nmap.get('長寿_夫受給年金額26_29'));
		this.aNen30o = Number(nmap.get('長寿_夫受給年金額30'));
		this.aNen31o = Number(nmap.get('長寿_夫受給年金額31_32'));
		this.aNen33o = Number(nmap.get('長寿_夫受給年金額33'));
		this.aNen34o = Number(nmap.get('長寿_夫受給年金額34_49'));
		this.aNen50o = Number(nmap.get('長寿_夫受給年金額50'));
		this.aNen50t = Number(nmap.get('長寿_妻受給年金額50'));
		this.aNen51o = Number(nmap.get('長寿_夫受給年金額51_X'));
		this.aNen51t = Number(nmap.get('長寿_妻受給年金額51_X'));
		this.aNenXtF = Number(nmap.get('長寿_妻受給年金額X'));	// 非課税分含む
		this.aNenXt = Number(nmap.get('長寿_妻課税年金額X'));		// 課税
		this.bNen25o = Number(nmap.get('標準_夫受給年金額25'));
		this.bNen26o = Number(nmap.get('標準_夫受給年金額26_29'));
		this.bNen30o = Number(nmap.get('標準_夫受給年金額30'));
		this.bNen31o = Number(nmap.get('標準_夫受給年金額31_32'));
		this.bNen33o = Number(nmap.get('標準_夫受給年金額33'));
		this.bNen34o = Number(nmap.get('標準_夫受給年金額34_X'));
		this.bNen49tF = Number(nmap.get('標準_妻受給年金額X_49'));	// 非課税分含む
		this.bNen50tF = Number(nmap.get('標準_妻受給年金額50'));		// 非課税分含む
		this.bNen51tF = Number(nmap.get('標準_妻受給年金額51_x'));	// 非課税分含む
		this.bNen49t = Number(nmap.get('標準_妻課税年金額X_49'));	// 課税
		this.bNen50t = Number(nmap.get('標準_妻課税年金額50'));	// 課税
		this.bNen51t = Number(nmap.get('標準_妻課税年金額51_x'));	// 課税
		this.cNen25o = Number(nmap.get('短命_夫受給年金額25'));
		this.cNen26o = Number(nmap.get('短命_夫受給年金額26_X'));
		this.cNen29t = Number(nmap.get('短命_妻受給年金額X_29'));
		this.cNen30t = Number(nmap.get('短命_妻受給年金額30'));
		this.cNen31t = Number(nmap.get('短命_妻受給年金額31_32'));
		this.cNen33t = Number(nmap.get('短命_妻受給年金額33'));
		this.cNen34tF = Number(nmap.get('短命_妻受給年金額34_49'));	// 非課税分含む
		this.cNen50tF = Number(nmap.get('短命_妻受給年金額50'));		// 非課税分含む
		this.cNen51tF = Number(nmap.get('短命_妻受給年金額51_x'));	// 非課税分含む
		this.cNen34t = Number(nmap.get('短命_妻課税年金額X_49'));	// 課税
		this.cNen50t = Number(nmap.get('短命_妻課税年金額50'));	// 課税
		this.cNen51t = Number(nmap.get('短命_妻課税年金額51_x'));	// 課税
		this.aNenPay25_29o = Number(nmap.get('長寿_夫年金納付額25_29'));
		this.aNenPay30o = Number(nmap.get('長寿_夫年金納付額30'));
		this.aNenPay31o = Number(nmap.get('長寿_夫年金納付額31'));
		this.aNenPay32_36o = Number(nmap.get('長寿_夫年金納付額32_36'));
		this.aNenPay37o = Number(nmap.get('長寿_夫年金納付額37'));
		this.aNenPay38_48o = Number(nmap.get('長寿_夫年金納付額38_48'));
		this.aNenPay49o = Number(nmap.get('長寿_夫年金納付額49'));
		this.bNenPay25_29 = Number(nmap.get('標準_夫年金納付額25_29'));
		this.bNenPay30o = Number(nmap.get('標準_夫年金納付額30'));
		this.bNenPay31o = Number(nmap.get('標準_夫年金納付額31'));
		this.bNenPay32_36o = Number(nmap.get('標準_夫年金納付額32_36'));
		this.bNenPay37o = Number(nmap.get('標準_夫年金納付額37'));
		this.bNenPay38_Xo = Number(nmap.get('標準_夫年金納付額38_X'));
		this.bNenPayX_48t = Number(nmap.get('標準_妻年金納付額X_48'));
		this.bNenPay49t = Number(nmap.get('標準_妻年金納付額49'));
		this.cNenPay25_Xo = Number(nmap.get('短命_夫年金納付額25_X'));
		this.cNenPayX_30t = Number(nmap.get('短命_妻年金納付額X_30'));
		this.cNenPay31t = Number(nmap.get('短命_妻年金納付額31'));
		this.cNenPay32_36t = Number(nmap.get('短命_妻年金納付額32_36'));
		this.cNenPay37t = Number(nmap.get('短命_妻年金納付額37'));
		this.cNenPay38_48t = Number(nmap.get('短命_妻年金納付額38_48'));
		this.cNenPay49t = Number(nmap.get('短命_妻年金納付額49'));
	}
}
	
class Zeikin {
	aShot25o = 0;
	aShot26o = 0;
	aShot30o = 0;
	aShot31o = 0;
	aShot33o = 0;
	aShot34o = 0;
	aShot50o = 0;
	aShot50t = 0;
	aShot51o = 0;
	aShot51t = 0;
	aShotXt = 0;
	bShot25o = 0;
	bShot26o = 0;
	bShot30o = 0;
	bShot31o = 0;
	bShot33o = 0;
	bShot34o = 0;
	bShot49t = 0;
	bShot50t = 0;
	bShot51t = 0;
	cShot25o = 0;
	cShot26o = 0;
	cShot29t = 0;
	cShot30t = 0;
	cShot31t = 0;
	cShot33t = 0;
	cShot34t = 0;
	cShot50t = 0;
	cShot51t = 0;
	aKshot25o = 0;
	aKhIb26 = 0;
	aKhSb26 = 0;
	aKhKb26 = 0;
	aKh26 = 0;
	aKshot26o = 0;
	aKhIb30 = 0;
	aKhSb30 = 0;
	aKhKb30 = 0;
	aKh30 = 0;
	aKshot30o = 0;
	aKhIb31 = 0;
	aKhSb31 = 0;
	aKhKb31 = 0;
	aKh31 = 0;
	aKshot31o = 0;
	aKhIb32 = 0;
	aKhSb32 = 0;
	aKhKb32 = 0;
	aKh32 = 0;
	aKshot33o = 0;
	aKhIb34 = 0;
	aKhSb34 = 0;
	aKhKb34 = 0;
	aKh34 = 0;
	aKshot34o = 0;
	aKhIb35 = 0;
	aKhSb35 = 0;
	aKhKb35 = 0;
	aKh35 = 0;
	aKhIb37 = 0;
	aKhSb37 = 0;
	aKhKb37 = 0;
	aKh37 = 0;
	aKhIb38 = 0;
	aKhSb38 = 0;
	aKhKb38 = 0;
	aKh38 = 0;
	aKhIb40 = 0;
	aKhSb40 = 0;
	aKhKb40 = 0;
	aKh40 = 0;
	aKhIb41 = 0;
	aKhSb41 = 0;
	aKhKb41 = 0;
	aKh41 = 0;
	bKshot49t = 0;
	bKhIb49 = 0;
	bKhSb49 = 0;
	bKhKb49 = 0;
	bKh49 = 0;
	bKhIb50 = 0;
	bKhSb50 = 0;
	bKhKb50 = 0;
	bKh50 = 0;
	aKshotXt = 0;
	aKhIbX = 0;
	aKhSbX = 0;
	aKhX = 0;
	aKh60 = 0;
	aKaig29Lo = 0;
	aKaig30Lo = 0;
	aKaig31Lo = 0;
	aKaig33Lo = 0;
	aKaig34Lo = 0;
	bKaig49Lt = 0;
	aKaigXLt = 0;
	aKaig30oY = 0;
	aKaig30o = 0;
	aKaig31o = 0;
	bKaig50t = 0;
	aKaigXt = 0;
	oKoki40y = 0;
	aKoki40o = 0;
	aKoki41o = 0;
	aKoki51o = 0;
	aKoki52o = 0;
	aKoki61t = 0;
	aKoki60t = 0;
	// 所得税
	aSzSh26o = 0;
	aSzSh27o = 0;
	aSzSh30o = 0;
	aSzSh31o = 0;
	aSzKj31o = 0;
	aShoZei31o = 0;
	aSzSh32o = 0;
	aSzKj32o = 0;
	aShoZei32o = 0;
	aSzSh33o = 0;
	aSzKj33o = 0;
	aShoZei33o = 0;
	aSzSh34o = 0;
	aSzKj34o = 0;
	aShoZei34o = 0;
	aSzSh35o = 0;
	aSzKj35o = 0;
	aShoZei35o = 0;
	aSzSh37o = 0;
	aSzKj37o = 0;
	aShoZei37o = 0;
	aSzSh38o = 0;
	aSzKj38o = 0;
	aShoZei38o = 0;
	aSzSh39o = 0;
	aSzKj39o = 0;
	aShoZei39o = 0;
	aSzSh40o = 0;
	aSzKj40o = 0;
	aShoZei40o = 0;
	aSzSh41o = 0;
	aSzKj41o = 0;
	aShoZei41o = 0;
	aSzShXt = 0;
	aSzSh60t = 0;
	aSzSh61t = 0;
	bSzSh48t = 0;
	bSzSh49t = 0;
	bSzSh50t = 0;
	bSzSh51t = 0;
	// 住民税
	aJzKj32o = 0;
	aJuZei32o = 0;
	aJzKj33o = 0;
	aJuZei33o = 0;
	aJzKj34o = 0;
	aJuZei34o = 0;
	aJzKj35o = 0;
	aJuZei35o = 0;
	aJzKj37o = 0;
	aJuZei37o = 0;
	aJzKj38o = 0;
	aJuZei38o = 0;
	aJzKj39o = 0;
	aJuZei39o = 0;
	aJzKj40o = 0;
	aJuZei40o = 0;
	aJzKj41o = 0;
	aJuZei41o = 0;

	constructor(zp, nv){
		this.calc(zp, nv);
	}

	calc(zp, nv){	// 計算
		this.aShot25o = this.minusKojo(nv.aNen25o, zp.knKy1);
		this.aShot26o = this.minusKojo(nv.aNen26o, zp.knKy1);
		this.aShot30o = this.minusKojo(nv.aNen30o, zp.knKo1);
		this.aShot31o = this.minusKojo(nv.aNen31o, zp.knKo1);
		this.aShot33o = this.minusKojo(nv.aNen33o, zp.knKo1);
		this.aShot34o = this.minusKojo(nv.aNen34o, zp.knKo1);
		this.aShot50o = this.minusKojo(nv.aNen50o, zp.knKo1);
		this.aShot50t = this.minusKojo(nv.aNen50t, zp.knKo1);
		this.aShot51o = this.minusKojo(nv.aNen51o, zp.knKo1);
		this.aShot51t = this.minusKojo(nv.aNen51t, zp.knKo1);
		this.aShotXt = this.minusKojo(nv.aNenXt, zp.knKo1);
		this.bShot25o = this.minusKojo(nv.bNen25o, zp.knKy1);
		this.bShot26o = this.minusKojo(nv.bNen26o, zp.knKy1);
		this.bShot30o = this.minusKojo(nv.bNen30o, zp.knKo1);
		this.bShot31o = this.minusKojo(nv.bNen31o, zp.knKo1);
		this.bShot33o = this.minusKojo(nv.bNen33o, zp.knKo1);
		this.bShot34o = this.minusKojo(nv.bNen34o, zp.knKo1);
		this.bShot49t = this.minusKojo(nv.bNen49t, zp.knKy1);
		this.bShot50t = this.minusKojo(nv.bNen50t, zp.knKo1);
		this.bShot51t = this.minusKojo(nv.bNen51t, zp.knKo1);
		this.cShot25o = this.minusKojo(nv.cNen25o, zp.knKy1);
		this.cShot26o = this.minusKojo(nv.cNen26o, zp.knKy1);
		this.cShot29t = this.minusKojo(nv.cNen29t, zp.knKy1);
		this.cShot30t = this.minusKojo(nv.cNen30t, zp.knKy1);
		this.cShot31t = this.minusKojo(nv.cNen31t, zp.knKy1);
		this.cShot33t = this.minusKojo(nv.cNen33t, zp.knKy1);
		this.cShot34t = this.minusKojo(nv.cNen34t, zp.knKy1);
		this.cShot50t = this.minusKojo(nv.cNen50t, zp.knKo1);
		this.cShot51t = this.minusKojo(nv.cNen51t, zp.knKo1);

		this.aKshot25o = this.minusKojo(this.aShot25o, zp.khKiso);

		this.aKhIb26 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot25o, 4);	// 国保26
		this.aKhSb26 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot25o, 4);
		this.aKhKb26 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot25o, 2);
		this.aKh26 = this.aKhIb26[2] + this.aKhSb26[2] + this.aKhKb26[2];

		this.aKshot26o = this.minusKojo(this.aShot26o, zp.khKiso);

		this.aKhIb30 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot26o, 4);	// 国保30
		this.aKhSb30 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot26o, 4);
		this.aKhKb30 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot26o, 1.17);
		this.aKh30 = this.aKhIb30[2] + this.aKhSb30[2] + this.aKhKb30[2];

		this.aKshot30o = this.minusKojo(this.aShot30o, zp.khKiso);

		this.aKhIb31 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot30o, 4);	// 国保31
		this.aKhSb31 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot30o, 4);
		this.aKhKb31 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot30o, 1);
		this.aKh31 = this.aKhIb31[2] + this.aKhSb31[2] + this.aKhKb31[2];

		this.aKshot31o = this.minusKojo(this.aShot31o, zp.khKiso);

		this.aKhIb32 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot31o, 4);	// 国保32
		this.aKhSb32 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot31o, 4);
		this.aKhKb32 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot31o, 1);
		this.aKh32 = this.aKhIb32[2] + this.aKhSb32[2] + this.aKhKb32[2];

		this.aKshot33o = this.minusKojo(this.aShot33o, zp.khKiso);

		this.aKhIb34 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot33o, 3.25);	// 国保34
		this.aKhSb34 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot33o, 3.25);
		this.aKhKb34 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot33o, 1);
		this.aKh34 = this.aKhIb34[2] + this.aKhSb34[2] + this.aKhKb34[2];

		this.aKshot34o = this.minusKojo(this.aShot34o, zp.khKiso);

		this.aKhIb35 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot34o, 3);	// 国保35
		this.aKhSb35 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot34o, 3);
		this.aKhKb35 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot34o, 1);
		this.aKh35 = this.aKhIb35[2] + this.aKhSb35[2] + this.aKhKb35[2];

		this.aKhIb37 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot34o, 2.25);	// 国保37
		this.aKhSb37 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot34o, 2.25);
		this.aKhKb37 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot34o, 1);
		this.aKh37 = this.aKhIb37[2] + this.aKhSb37[2] + this.aKhKb37[2];

		this.aKhIb38 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot34o, 2);	// 国保38
		this.aKhSb38 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot34o, 2);
		this.aKhKb38 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot34o, 1);
		this.aKh38 = this.aKhIb38[2] + this.aKhSb38[2] + this.aKhKb38[2];

		this.aKhIb40 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot34o, 1.17);	// 国保40
		this.aKhSb40 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot34o, 1.17);
		this.aKhKb40 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot34o, 1);
		this.aKh40 = this.aKhIb40[2] + this.aKhSb40[2] + this.aKhKb40[2];

		this.aKhIb41 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshot34o, 1); 	// 国保41生存中
		this.aKhSb41 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshot34o, 1);
		this.aKhKb41 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.aKshot34o, 1);
		this.aKh41 = this.aKhIb41[2] + this.aKhSb41[2] + this.aKhKb41[2];

		this.bKshot49t = this.minusKojo(this.bShot49t, zp.khKiso);

		this.bKhIb49 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.bKshot49t, 1);	// 国保49死亡後
		this.bKhSb49 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.bKshot49t, 1);
		this.bKhKb49 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.bKshot49t, 1);
		this.bKh49 = this.bKhIb49[2] + this.bKhSb49[2] + this.bKhKb49[2];

		this.bKhIb50 = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.bKshot49t, 1);	// 国保50
		this.bKhSb50 = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.bKshot49t, 1);
		this.bKhKb50 = this.calcKokuhoPart(zp.khKS, zp.khKK, zp.khKG, this.bKshot49t, 0.83);
		this.bKh50 = this.bKhIb50[2] + this.bKhSb50[2] + this.bKhKb50[2];

		this.aKshotXt = this.minusKojo(this.aShotXt, zp.khKiso);

		this.aKhIbX = this.calcKokuhoPart(zp.khIS, zp.khIK, zp.khIG, this.aKshotXt, 1);	// 国保51
		this.aKhSbX = this.calcKokuhoPart(zp.khSS, zp.khSK, zp.khSG, this.aKshotXt, 1);
		this.aKhX = this.aKhIbX[2] + this.aKhSbX[2];

		this.aKh60 = this.kirisute100(this.aKhX * 10/12);	// 国保60

		// 介護保険料
		this.aKaig29Lo = this.calcKaigoLevel(this.aShot26o, -1, true);	// 介護保険料段階
		this.aKaig30Lo = this.calcKaigoLevel(this.aShot30o, -1, true);	// 介護保険料段階
		this.aKaig31Lo = this.calcKaigoLevel(this.aShot31o, -1, true);
		this.aKaig33Lo = this.calcKaigoLevel(this.aShot33o, -1, true);
		this.aKaig34Lo = this.calcKaigoLevel(this.aShot34o, -1, true);
		this.bKaig49Lt = this.calcKaigoLevel(0, 0, false);	// BTKAIG49L
		this.aKaigXLt = this.calcKaigoLevel(this.aShot51t, nv.aNen51t, false);	// 世帯非課税
		const kaigov = [-1,zp.kaig1,zp.kaig2,zp.kaig3,zp.kaig4,zp.kaig5,zp.kaig6,zp.kaig7,-1];
		this.aKaig30oY = kaigov[this.aKaig29Lo];
		this.aKaig30o = this.kirisute100(this.aKaig30oY * 10/12);
		this.aKaig31o = kaigov[this.aKaig30Lo];
		this.bKaig50t = kaigov[this.bKaig49Lt];	// BTKAIG50
		this.aKaigXt = kaigov[this.aKaigXLt];
		//console.log(`dbg> aKaig51Lt: ${aKaig51Lt}`);

		// 後期高齢者保険料
		this.oKoki40y = Math.floor(zp.kokik + this.minusKojo(this.aShot34o, zp.kkKiso) * zp.kokis / 100.0);
		this.aKoki40o = Math.floor(this.oKoki40y * 10 / 12);
		this.aKoki41o = Math.floor(zp.kokik + this.minusKojo(this.aShot34o, zp.kkKiso) * zp.kokis / 100.0);
		//this.aKoki51o = Math.floor(zp.kokik + this.minusKojo(this.aShot50o, zp.kkKiso) * zp.kokis / 100.0);
		//this.aKoki52o = Math.floor(zp.kokik + this.minusKojo(this.aShot51o, zp.kkKiso) * zp.kokis / 100.0);
		this.aKoki61t = Math.floor(zp.kokik + this.minusKojo(this.aShot51t, zp.kkKiso) * zp.kokis / 100.0);
		this.aKoki60t = Math.floor(this.aKoki61t * 2 / 12);

		// 所得税
		// 社会保険料 = 国民年金保険料＋国民健康保険料＋介護保険料＋後期高齢者医療保険料
		// 各種控除 = 公的年金等控除＋基礎控除＋配偶者控除＋扶養控除
		this.aSzSh26o = nv.aNenPay25_29o + this.aKh26;

		this.aSzSh27o = nv.aNenPay25_29o + this.aKh26;

		this.aSzSh30o = nv.aNenPay25_29o + this.aKh30 + this.aKaig30o;

		this.aSzSh31o = nv.aNenPay30o + this.aKh31 + this.aKaig31o;
		this.aSzKj31o = zp.knKo1 + zp.szKiso + zp.szHaigu + zp.szFuyo * 2;
		this.aShoZei31o = this.calcShotZei(nv.aNen30o, this.aSzSh31o, this.aSzKj31o, zp.szRitu);

		this.aSzSh32o = nv.aNenPay31o + this.aKh32 + this.aKaig31o;
		this.aSzKj32o = zp.knKo1 + zp.szKiso + zp.szHaigu + zp.szFuyo * 2;
		this.aShoZei32o = this.calcShotZei(nv.aNen31o, this.aSzSh32o, this.aSzKj32o, zp.szRitu);

		this.aSzSh33o = nv.aNenPay32_36o + this.aKh32 + this.aKaig31o;
		this.aSzKj33o = zp.knKo1 + zp.szKiso + zp.szHaigu + zp.szFuyo * 2;
		this.aShoZei33o = this.calcShotZei(nv.aNen31o, this.aSzSh33o, this.aSzKj33o, zp.szRitu);

		this.aSzSh34o = nv.aNenPay32_36o + this.aKh34 + this.aKaig31o;
		this.aSzKj34o = zp.knKo1 + zp.szKiso + zp.szHaigu + zp.szFuyo * 2;
		this.aShoZei34o = this.calcShotZei(nv.aNen33o, this.aSzSh34o, this.aSzKj34o, zp.szRitu);

		this.aSzSh35o = nv.aNenPay32_36o + this.aKh35 + this.aKaig31o;
		this.aSzKj35o = zp.knKo1 + zp.szKiso + zp.szHaigu + zp.szFuyo;
		this.aShoZei35o = this.calcShotZei(nv.aNen34o, this.aSzSh35o, this.aSzKj35o, zp.szRitu);

		this.aSzSh37o = nv.aNenPay32_36o + this.aKh37 + this.aKaig31o;
		this.aSzKj37o = zp.knKo1 + zp.szKiso + zp.szHaigu + zp.szFuyo;
		this.aShoZei37o = this.calcShotZei(nv.aNen34o, this.aSzSh37o, this.aSzKj37o, zp.szRitu);

		this.aSzSh38o = nv.aNenPay37o + this.aKh38 + this.aKaig31o;
		this.aSzKj38o = zp.knKo1 + zp.szKiso + zp.szHaigu;
		this.aShoZei38o = this.calcShotZei(nv.aNen34o, this.aSzSh38o, this.aSzKj38o, zp.szRitu);

		this.aSzSh39o = nv.aNenPay38_48o + this.aKh38 + this.aKaig31o;
		this.aSzKj39o = zp.knKo1 + zp.szKiso + zp.szHaigu;
		this.aShoZei39o = this.calcShotZei(nv.aNen34o, this.aSzSh39o, this.aSzKj39o, zp.szRitu);

		this.aSzSh40o = nv.aNenPay38_48o + this.aKh40 + this.aKaig31o + this.aKoki40o;
		this.aSzKj40o = zp.knKo1 + zp.szKiso + zp.szHaigu;
		this.aShoZei40o = this.calcShotZei(nv.aNen34o, this.aSzSh40o, this.aSzKj40o, zp.szRitu);

		this.aSzSh41o = nv.aNenPay38_48o + this.aKh41 + this.aKaig31o + this.aKoki41o;
		this.aSzKj41o = zp.knKo1 + zp.szKiso + zp.szHaigu;
		this.aShoZei41o = this.calcShotZei(nv.aNen34o, this.aSzSh41o, this.aSzKj41o, zp.szRitu);

		this.bSzSh48t = nv.bNenPayX_48t + this.bKh49;
		this.bSzSh49t = nv.bNenPay49t + this.bKh49;
		this.bSzSh50t = this.bKh50 + this.bKaig50t;
		this.bSzSh51t = this.aKhX + this.bKaig50t;
		this.aSzShXt = this.aKhX + this.aKaigXt;
		this.aSzSh60t = this.aKh60 + this.aKaigXt + this.aKoki60t;
		this.aSzSh61t = this.aKaigXt + this.aKoki61t;

		// 住民税
		this.aJzKj32o = this.aSzSh32o + zp.jzHaigu + zp.jzFuyoA + zp.jzFuyoB + zp.jzKiso;
		this.aJuZei32o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot31o, this.aJzKj32o) * zp.jzRitu / 100;
		this.aJzKj33o = this.aSzSh33o + zp.jzHaigu + zp.jzFuyoB + zp.jzFuyoB + zp.jzKiso;
		this.aJuZei33o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot31o, this.aJzKj33o) * zp.jzRitu / 100;
		this.aJzKj34o = this.aSzSh34o + zp.jzHaigu + zp.jzFuyoA + zp.jzFuyoB + zp.jzKiso;
		this.aJuZei34o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot33o, this.aJzKj34o) * zp.jzRitu / 100;
		this.aJzKj35o = this.aSzSh35o + zp.jzHaigu + zp.jzFuyoB + zp.jzKiso;
		this.aJuZei35o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot34o, this.aJzKj35o) * zp.jzRitu / 100;
		this.aJzKj37o = this.aSzSh37o + zp.jzHaigu + zp.jzFuyoA + zp.jzKiso;
		this.aJuZei37o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot34o, this.aJzKj37o) * zp.jzRitu / 100;
		this.aJzKj38o = this.aSzSh38o + zp.jzHaigu + zp.jzKiso;
		this.aJuZei38o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot34o, this.aJzKj38o) * zp.jzRitu / 100;
		this.aJzKj39o = this.aSzSh39o + zp.jzHaigu + zp.jzKiso;
		this.aJuZei39o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot34o, this.aJzKj39o) * zp.jzRitu / 100;
		this.aJzKj40o = this.aSzSh40o + zp.jzHaigu + zp.jzKiso;
		this.aJuZei40o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot34o, this.aJzKj40o) * zp.jzRitu / 100;
		this.aJzKj41o = this.aSzSh41o + zp.jzHaigu + zp.jzKiso;
		this.aJuZei41o = zp.jzKinto + this.kirisute1000minusKojo(this.aShot34o, this.aJzKj41o) * zp.jzRitu / 100;
	}

	calcShotZei(nenkin, shaHoken, szKojo, shRitu){
		// 所得税額円 ＝（課税年金額 ー 社会保険料 ー 各種控除）× 年金所得税率（復興特別税含む）5.105％。
		const v = this.minusKojo(nenkin, shaHoken + szKojo);
		return Math.floor(v * shRitu / 100);
	}

	kirisute1000minusKojo(val, kojo){
		const v = (val > kojo) ? val - kojo : 0;
		return Math.floor(v / 1000) * 1000;		
	}

	minusKojo(val, kojo){
		return (val > kojo) ? val - kojo : 0;
	}

	calcKaigoLevel(shotoku, nenkin, setaikazei){
		let level = -1;
		if (setaikazei) {
			if (nenkin < 0) {	// 住民税課税の場合で計算
				if (shotoku >= 2100000) level = -1;
				else if (shotoku >= 1200000) level = 7;
				else level = 6;
			} else {			// 住民税非課税の場合で計算
				if ((nenkin + shotoku) > 800000) level = 5;
				else level = 4;
			}
		} else {
				if ((nenkin + shotoku) > 1200000) level = 3;
				else if ((nenkin + shotoku) > 800000) level = 2;
				else level = 1;
		}
		return level;
	}
	
	kirisute100(val) {
		return Math.floor(val / 100) * 100;		
	}
	
	calcKokuhoPart(shotokuwari, kintowari, gendo, shotoku, nin){
		const s = Math.floor(shotoku * shotokuwari / 100.0);
		const k = nin * kintowari;
		//let ans = s + k;
		//ans = Math.floor(this.ans / 100) * 100;
		const ans = this.kirisute100(s + k);
		if (this.ans > gendo) ans = gendo;
		return [s, k, ans];
	}
}

class ZeikinWidget {
	spAShot25o = null;
	spAShot26o = null;
	spAShot30o = null;
	spAShot31o = null;
	spAShot33o = null;
	spAShot34o = null;
	spAShot50o = null;
	spAShot50t = null;
	spAShot51o = null;
	spAShot51t = null;
	spAShotXt = null;
	spBShot25o = null;
	spBShot26o = null;
	spBShot30o = null;
	spBShot31o = null;
	spBShot33o = null;
	spBShot34o = null;
	spBShot49t = null;
	spBShot50t = null;
	spBShot51t = null;
	spCShot25o = null;
	spCShot26o = null;
	spCShot29t = null;
	spCShot30t = null;
	spCShot31t = null;
	spCShot33t = null;
	spCShot34t = null;
	spCShot50t = null;
	spCShot51t = null;
	spAKshot25o = null;
	spAKshot26o = null;
	spAKshot30o = null;
	spAKshot31o = null;
	spAKshot33o = null;
	spAKshot34o = null;
	spBKshot49t = null;
	//spBKshot50t = null;
	spAKshotXt = null;
	spAKh26 = null;
	spAKhI26 = null;
	spAKhS26 = null;
	spAKhK26 = null;
	spAKh30 = null;
	spAKhI30 = null;
	spAKhS30 = null;
	spAKhK30 = null;
	spAKh31 = null;
	spAKhI31 = null;
	spAKhS31 = null;
	spAKhK31 = null;
	spAKh32 = null;
	spAKhI32 = null;
	spAKhS32 = null;
	spAKhK32 = null;
	spAKh34 = null;
	spAKhI34 = null;
	spAKhS34 = null;
	spAKhK34 = null;
	spAKh35 = null;
	spAKhI35 = null;
	spAKhS35 = null;
	spAKhK35 = null;
	spAKh37 = null;
	spAKhI37 = null;
	spAKhS37 = null;
	spAKhK37 = null;
	spAKh38 = null;
	spAKhI38 = null;
	spAKhS38 = null;
	spAKhK38 = null;
	spAKh40 = null;
	spAKhI40 = null;
	spAKhS40 = null;
	spAKhK40 = null;
	spAKh41 = null;
	spAKhI41 = null;
	spAKhS41 = null;
	spAKhK41 = null;
	spBKh49 = null;
	spBKhI49 = null;
	spBKhS49 = null;
	spBKhK49 = null;
	spBKh50 = null;
	spBKhI50 = null;
	spBKhS50 = null;
	spBKhK50 = null;
	spAKhX = null;
	spAKhIX = null;
	spAKhSX = null;
	spAKh60 = null;
	spASzSh26O = null;
	spASzKj26O = null;
	spAShoZei26O = null;
	spASzSh27O = null;
	spASzKj27O = null;
	spAShoZei27O = null;
	spASzSh30O = null;
	spASzKj30O = null;
	spAShoZei30O = null;
	spASzSh31O = null;
	spASzKj31O = null;
	spAShoZei31O = null;
	spASzSh32O = null;
	spASzKj32O = null;
	spAShoZei32O = null;
	spASzSh33O = null;
	spASzKj33O = null;
	spAShoZei33O = null;
	spASzSh34O = null;
	spASzKj34O = null;
	spAShoZei34O = null;
	spASzSh35O = null;
	spASzKj35O = null;
	spAShoZei35O = null;
	spASzSh37O = null;
	spASzKj37O = null;
	spAShoZei37O = null;
	spASzSh38O = null;
	spASzKj38O = null;
	spAShoZei38O = null;
	spASzSh39O = null;
	spASzKj39O = null;
	spAShoZei39O = null;
	spASzSh40O = null;
	spASzKj40O = null;
	spAShoZei40O = null;
	spASzSh41O = null;
	spASzKj41O = null;
	spAShoZei41O = null;
	spASzShXT = null;
	spASzKjXT = null;
	spAShoZeiXT = null;
	spASzSh60T = null;
	spASzKj60T = null;
	spAShoZei60T = null;
	spASzSh61T = null;
	spASzKj61T = null;
	spAShoZei61T = null;
	spBSzSh48t = null;
	spBSzKj48t = null;
	spBShoZei48t = null;
	spBSzSh49t = null;
	spBSzKj49t = null;
	spBShoZei49t = null;
	spBSzSh50t = null;
	spBSzKj50t = null;
	spBShoZei50t = null;
	spBSzSh51t = null;
	spBSzKj51t = null;
	spBShoZei51t = null;
	// 住民税
	spAJzKj32o = null;
	spAJuZei32o = null;
	spAJzKj33o = null;
	spAJuZei33o = null;
	spAJzKj34o = null;
	spAJuZei34o = null;
	spAJzKj35o = null;
	spAJuZei35o = null;
	spAJzKj37o = null;
	spAJuZei37o = null;
	spAJzKj38o = null;
	spAJuZei38o = null;
	spAJzKj39o = null;
	spAJuZei39o = null;
	spAJzKj40o = null;
	spAJuZei40o = null;
	spAJzKj41o = null;
	spAJuZei41o = null;
	spAJzKj50o = null;
	spAJuZei50o = null;
	spAJzKj51o = null;
	spAJuZei51o = null;
	spAJzKj52o = null;
	spAJuZei52o = null;

	constructor(){
		// 算出値
		this.spAShot25o = Array.from(document.getElementsByClassName("AOSHOT25"));
		this.spAShot26o = Array.from(document.getElementsByClassName("AOSHOT26"));
		this.spAShot30o = Array.from(document.getElementsByClassName("AOSHOT30"));
		this.spAShot31o = Array.from(document.getElementsByClassName("AOSHOT31"));
		this.spAShot33o = Array.from(document.getElementsByClassName("AOSHOT33"));
		this.spAShot34o = Array.from(document.getElementsByClassName("AOSHOT34"));
		this.spAShot50o = Array.from(document.getElementsByClassName("AOSHOT50"));
		this.spAShot50t = Array.from(document.getElementsByClassName("ATSHOT50"));
		this.spAShot51o = Array.from(document.getElementsByClassName("AOSHOT51"));
		this.spAShot51t = Array.from(document.getElementsByClassName("ATSHOT51"));
		this.spAShotXt = Array.from(document.getElementsByClassName("ATSHOTX"));
		this.spBShot25o = Array.from(document.getElementsByClassName("BOSHOT25"));
		this.spBShot26o = Array.from(document.getElementsByClassName("BOSHOT26"));
		this.spBShot30o = Array.from(document.getElementsByClassName("BOSHOT30"));
		this.spBShot31o = Array.from(document.getElementsByClassName("BOSHOT31"));
		this.spBShot33o = Array.from(document.getElementsByClassName("BOSHOT33"));
		this.spBShot34o = Array.from(document.getElementsByClassName("BOSHOT34"));
		this.spBShot49t = Array.from(document.getElementsByClassName("BTSHOT49"));
		this.spBShot50t = Array.from(document.getElementsByClassName("BTSHOT50"));
		this.spBShot51t = Array.from(document.getElementsByClassName("BTSHOT51"));
		this.spCShot25o = Array.from(document.getElementsByClassName("COSHOT25"));
		this.spCShot26o = Array.from(document.getElementsByClassName("COSHOT26"));
		this.spCShot29t = Array.from(document.getElementsByClassName("CTSHOT29"));
		this.spCShot30t = Array.from(document.getElementsByClassName("CTSHOT30"));
		this.spCShot31t = Array.from(document.getElementsByClassName("CTSHOT31"));
		this.spCShot33t = Array.from(document.getElementsByClassName("CTSHOT33"));
		this.spCShot34t = Array.from(document.getElementsByClassName("CTSHOT34"));
		this.spCShot50t = Array.from(document.getElementsByClassName("CTSHOT50"));
		this.spCShot51t = Array.from(document.getElementsByClassName("CTSHOT51"));

		this.spAKshot25o = Array.from(document.getElementsByClassName("AKSHOT25O"));	// （国保）課税標準所得
		this.spAKshot26o = Array.from(document.getElementsByClassName("AKSHOT26O"));
		this.spAKshot30o = Array.from(document.getElementsByClassName("AKSHOT30O"));
		this.spAKshot31o = Array.from(document.getElementsByClassName("AKSHOT31O"));
		this.spAKshot33o = Array.from(document.getElementsByClassName("AKSHOT33O"));
		this.spAKshot34o = Array.from(document.getElementsByClassName("AKSHOT34O"));
		this.spBKshot49t = Array.from(document.getElementsByClassName("BKSHOT49T"));
		//this.spBKshot50t = Array.from(document.getElementsByClassName("BKSHOT50T"));
		this.spAKshotXt = Array.from(document.getElementsByClassName("AKSHOTXT"));

		this.spAKh26 = Array.from(document.getElementsByClassName("AKH26"));	// 国保26
		this.spAKhI26 = this.getSpan3parts("AKHISW26", "AKHIKW26", "AKHIB26");
		this.spAKhS26 = this.getSpan3parts("AKHSSW26", "AKHSKW26", "AKHSB26");
		this.spAKhK26 = this.getSpan3parts("AKHKSW26", "AKHKKW26", "AKHKB26");

		this.spAKh30 = Array.from(document.getElementsByClassName("AKH30"));	// 国保30
		this.spAKhI30 = this.getSpan3parts("AKHISW30", "AKHIKW30", "AKHIB30");
		this.spAKhS30 = this.getSpan3parts("AKHSSW30", "AKHSKW30", "AKHSB30");
		this.spAKhK30 = this.getSpan3parts("AKHKSW30", "AKHKKW30", "AKHKB30");

		this.spAKh31 = Array.from(document.getElementsByClassName("AKH31"));	// 国保31
		this.spAKhI31 = this.getSpan3parts("AKHISW31", "AKHIKW31", "AKHIB31");
		this.spAKhS31 = this.getSpan3parts("AKHSSW31", "AKHSKW31", "AKHSB31");
		this.spAKhK31 = this.getSpan3parts("AKHKSW31", "AKHKKW31", "AKHKB31");

		this.spAKh32 = Array.from(document.getElementsByClassName("AKH32"));	// 国保32
		this.spAKhI32 = this.getSpan3parts("AKHISW32", "AKHIKW32", "AKHIB32");
		this.spAKhS32 = this.getSpan3parts("AKHSSW32", "AKHSKW32", "AKHSB32");
		this.spAKhK32 = this.getSpan3parts("AKHKSW32", "AKHKKW32", "AKHKB32");

		this.spAKh34 = Array.from(document.getElementsByClassName("AKH34"));	// 国保34
		this.spAKhI34 = this.getSpan3parts("AKHISW34", "AKHIKW34", "AKHIB34");
		this.spAKhS34 = this.getSpan3parts("AKHSSW34", "AKHSKW34", "AKHSB34");
		this.spAKhK34 = this.getSpan3parts("AKHKSW34", "AKHKKW34", "AKHKB34");

		this.spAKh35 = Array.from(document.getElementsByClassName("AKH35"));	// 国保35
		this.spAKhI35 = this.getSpan3parts("AKHISW35", "AKHIKW35", "AKHIB35");
		this.spAKhS35 = this.getSpan3parts("AKHSSW35", "AKHSKW35", "AKHSB35");
		this.spAKhK35 = this.getSpan3parts("AKHKSW35", "AKHKKW35", "AKHKB35");

		this.spAKh37 = Array.from(document.getElementsByClassName("AKH37"));	// 国保37
		this.spAKhI37 = this.getSpan3parts("AKHISW37", "AKHIKW37", "AKHIB37");
		this.spAKhS37 = this.getSpan3parts("AKHSSW37", "AKHSKW37", "AKHSB37");
		this.spAKhK37 = this.getSpan3parts("AKHKSW37", "AKHKKW37", "AKHKB37");

		this.spAKh38 = Array.from(document.getElementsByClassName("AKH38"));	// 国保38
		this.spAKhI38 = this.getSpan3parts("AKHISW38", "AKHIKW38", "AKHIB38");
		this.spAKhS38 = this.getSpan3parts("AKHSSW38", "AKHSKW38", "AKHSB38");
		this.spAKhK38 = this.getSpan3parts("AKHKSW38", "AKHKKW38", "AKHKB38");

		this.spAKh40 = Array.from(document.getElementsByClassName("AKH40"));	// 国保40
		this.spAKhI40 = this.getSpan3parts("AKHISW40", "AKHIKW40", "AKHIB40");
		this.spAKhS40 = this.getSpan3parts("AKHSSW40", "AKHSKW40", "AKHSB40");
		this.spAKhK40 = this.getSpan3parts("AKHKSW40", "AKHKKW40", "AKHKB40");

		this.spAKh41 = Array.from(document.getElementsByClassName("AKH41"));	// 国保41
		this.spAKhI41 = this.getSpan3parts("AKHISW41", "AKHIKW41", "AKHIB41");
		this.spAKhS41 = this.getSpan3parts("AKHSSW41", "AKHSKW41", "AKHSB41");
		this.spAKhK41 = this.getSpan3parts("AKHKSW41", "AKHKKW41", "AKHKB41");
		this.spBKh49 = Array.from(document.getElementsByClassName("BKH49"));	// 国保
		this.spBKhI49 = this.getSpan3parts("BKHISW49", "BKHIKW49", "BKHIB49");
		this.spBKhS49 = this.getSpan3parts("BKHSSW49", "BKHSKW49", "BKHSB49");
		this.spBKhK49 = this.getSpan3parts("BKHKSW49", "BKHKKW49", "BKHKB49");
		this.spBKh50 = Array.from(document.getElementsByClassName("BKH50"));	// 国保
		this.spBKhI50 = this.getSpan3parts("BKHISW50", "BKHIKW50", "BKHIB50");
		this.spBKhS50 = this.getSpan3parts("BKHSSW50", "BKHSKW50", "BKHSB50");
		this.spBKhK50 = this.getSpan3parts("BKHKSW50", "BKHKKW50", "BKHKB50");
		this.spAKhX = Array.from(document.getElementsByClassName("AKHX"));		// 国保X
		this.spAKhIX = this.getSpan3parts("AKHISWX", "AKHIKWX", "AKHIBX");
		this.spAKhSX = this.getSpan3parts("AKHSSWX", "AKHSKWX", "AKHSBX");

		this.spAKh60 = Array.from(document.getElementsByClassName("AKH60"));	// 国保60

		this.spAOKaig29L = Array.from(document.getElementsByClassName("AOKAIG29L"));	// 介護保険
		this.spAOKaig30L = Array.from(document.getElementsByClassName("AOKAIG30L"));
		this.spAOKaig31L = Array.from(document.getElementsByClassName("AOKAIG31L"));
		this.spAOKaig33L = Array.from(document.getElementsByClassName("AOKAIG33L"));
		this.spAOKaig34L = Array.from(document.getElementsByClassName("AOKAIG34L"));
		this.spBTKaig49L = Array.from(document.getElementsByClassName("BTKAIG49L"));
		this.spATKaigXL = Array.from(document.getElementsByClassName("ATKAIGXL"));
		this.spAOKaig30Y = Array.from(document.getElementsByClassName("AOKAIG30Y"));
		this.spAOKaig30 = Array.from(document.getElementsByClassName("AOKAIG30"));
		this.spAOKaig31 = Array.from(document.getElementsByClassName("AOKAIG31"));
		this.spBTKaig50 = Array.from(document.getElementsByClassName("BTKAIG50"));
		this.spATKaigX = Array.from(document.getElementsByClassName("ATKAIGX"));
		
		this.spAKoki40o = Array.from(document.getElementsByClassName("AOKOKI40"));	// 後期高齢者保険
		this.spAKoki41o = Array.from(document.getElementsByClassName("AOKOKI41"));
		this.spAKoki51o = Array.from(document.getElementsByClassName("AOKOKI51"));
		this.spAKoki52o = Array.from(document.getElementsByClassName("AOKOKI52"));
		this.spAKoki60t = Array.from(document.getElementsByClassName("ATKOKI60"));
		this.spAKoki61t = Array.from(document.getElementsByClassName("ATKOKI61"));

		// 所得税
		this.spASzSh26o = Array.from(document.getElementsByClassName("ASZSH26O"));
		this.spASzSh27o = Array.from(document.getElementsByClassName("ASZSH27O"));
		this.spASzSh30o = Array.from(document.getElementsByClassName("ASZSH30O"));
		this.spASzSh31o = Array.from(document.getElementsByClassName("ASZSH31O"));
		this.spASzKj31o = Array.from(document.getElementsByClassName("ASZKJ31O"));
		this.spAShoZei31o = Array.from(document.getElementsByClassName("ASHOZEI31O"));
		this.spASzSh32o = Array.from(document.getElementsByClassName("ASZSH32O"));
		this.spASzKj32o = Array.from(document.getElementsByClassName("ASZKJ32O"));
		this.spAShoZei32o = Array.from(document.getElementsByClassName("ASHOZEI32O"));
		this.spASzSh33o = Array.from(document.getElementsByClassName("ASZSH33O"));
		this.spASzKj33o = Array.from(document.getElementsByClassName("ASZKJ33O"));
		this.spAShoZei33o = Array.from(document.getElementsByClassName("ASHOZEI33O"));
		this.spASzSh34o = Array.from(document.getElementsByClassName("ASZSH34O"));
		this.spASzKj34o = Array.from(document.getElementsByClassName("ASZKJ34O"));
		this.spAShoZei34o = Array.from(document.getElementsByClassName("ASHOZEI34O"));
		this.spASzSh35o = Array.from(document.getElementsByClassName("ASZSH35O"));
		this.spASzKj35o = Array.from(document.getElementsByClassName("ASZKJ35O"));
		this.spAShoZei35o = Array.from(document.getElementsByClassName("ASHOZEI35O"));
		this.spASzSh37o = Array.from(document.getElementsByClassName("ASZSH37O"));
		this.spASzKj37o = Array.from(document.getElementsByClassName("ASZKJ37O"));
		this.spAShoZei37o = Array.from(document.getElementsByClassName("ASHOZEI37O"));
		this.spASzSh38o = Array.from(document.getElementsByClassName("ASZSH38O"));
		this.spASzKj38o = Array.from(document.getElementsByClassName("ASZKJ38O"));
		this.spAShoZei38o = Array.from(document.getElementsByClassName("ASHOZEI38O"));
		this.spASzSh39o = Array.from(document.getElementsByClassName("ASZSH39O"));
		this.spASzKj39o = Array.from(document.getElementsByClassName("ASZKJ39O"));
		this.spAShoZei39o = Array.from(document.getElementsByClassName("ASHOZEI39O"));
		this.spASzSh40o = Array.from(document.getElementsByClassName("ASZSH40O"));
		this.spASzKj40o = Array.from(document.getElementsByClassName("ASZKJ40O"));
		this.spAShoZei40o = Array.from(document.getElementsByClassName("ASHOZEI40O"));
		this.spASzSh41o = Array.from(document.getElementsByClassName("ASZSH41O"));
		this.spASzKj41o = Array.from(document.getElementsByClassName("ASZKJ41O"));
		this.spAShoZei41o = Array.from(document.getElementsByClassName("ASHOZEI41O"));
		this.spASzShXt = Array.from(document.getElementsByClassName("ASZSHXT"));
		this.spASzSh60t = Array.from(document.getElementsByClassName("ASZSH60T"));
		this.spASzSh61t = Array.from(document.getElementsByClassName("ASZSH61T"));
		this.spBSzSh48t = Array.from(document.getElementsByClassName("BSZSH48T"));
		this.spBSzSh49t = Array.from(document.getElementsByClassName("BSZSH49T"));
		this.spBSzSh50t = Array.from(document.getElementsByClassName("BSZSH50T"));
		this.spBSzSh51t = Array.from(document.getElementsByClassName("BSZSH51T"));
		
		// 住民税
		this.spAJzKj32o = Array.from(document.getElementsByClassName("AJZKJ32O"));
		this.spAJuZei32o = Array.from(document.getElementsByClassName("AJUZEI32O"));
		this.spAJzKj33o = Array.from(document.getElementsByClassName("AJZKJ33O"));
		this.spAJuZei33o = Array.from(document.getElementsByClassName("AJUZEI33O"));
		this.spAJzKj34o = Array.from(document.getElementsByClassName("AJZKJ34O"));
		this.spAJuZei34o = Array.from(document.getElementsByClassName("AJUZEI34O"));
		this.spAJzKj35o = Array.from(document.getElementsByClassName("AJZKJ35O"));
		this.spAJuZei35o = Array.from(document.getElementsByClassName("AJUZEI35O"));
		this.spAJzKj37o = Array.from(document.getElementsByClassName("AJZKJ37O"));
		this.spAJuZei37o = Array.from(document.getElementsByClassName("AJUZEI37O"));
		this.spAJzKj38o = Array.from(document.getElementsByClassName("AJZKJ38O"));
		this.spAJuZei38o = Array.from(document.getElementsByClassName("AJUZEI38O"));
		this.spAJzKj39o = Array.from(document.getElementsByClassName("AJZKJ39O"));
		this.spAJuZei39o = Array.from(document.getElementsByClassName("AJUZEI39O"));
		this.spAJzKj40o = Array.from(document.getElementsByClassName("AJZKJ40O"));
		this.spAJuZei40o = Array.from(document.getElementsByClassName("AJUZEI40O"));
		this.spAJzKj41o = Array.from(document.getElementsByClassName("AJZKJ41O"));
		this.spAJuZei41o = Array.from(document.getElementsByClassName("AJUZEI41O"));
	}

	update(val) {	// 更新
		this.spAShot25o.forEach(v => { v.innerText = val.aShot25o.toLocaleString(); });
		this.spAShot26o.forEach(v => { v.innerText = val.aShot26o.toLocaleString(); });
		this.spAShot30o.forEach(v => { v.innerText = val.aShot30o.toLocaleString(); });
		this.spAShot31o.forEach(v => { v.innerText = val.aShot31o.toLocaleString(); });
		this.spAShot33o.forEach(v => { v.innerText = val.aShot33o.toLocaleString(); });
		this.spAShot34o.forEach(v => { v.innerText = val.aShot34o.toLocaleString(); });
		this.spAShot50o.forEach(v => { v.innerText = val.aShot50o.toLocaleString(); });
		this.spAShot50t.forEach(v => { v.innerText = val.aShot50t.toLocaleString(); });
		this.spAShot51o.forEach(v => { v.innerText = val.aShot51o.toLocaleString(); });
		this.spAShot51t.forEach(v => { v.innerText = val.aShot51t.toLocaleString(); });
		this.spAShotXt.forEach(v => { v.innerText = val.aShotXt.toLocaleString(); });
		this.spBShot25o.forEach(v => { v.innerText = val.bShot25o.toLocaleString(); });
		this.spBShot26o.forEach(v => { v.innerText = val.bShot26o.toLocaleString(); });
		this.spBShot30o.forEach(v => { v.innerText = val.bShot30o.toLocaleString(); });
		this.spBShot31o.forEach(v => { v.innerText = val.bShot31o.toLocaleString(); });
		this.spBShot33o.forEach(v => { v.innerText = val.bShot33o.toLocaleString(); });
		this.spBShot34o.forEach(v => { v.innerText = val.bShot34o.toLocaleString(); });
		this.spBShot49t.forEach(v => { v.innerText = val.bShot49t.toLocaleString(); });
		this.spBShot50t.forEach(v => { v.innerText = val.bShot50t.toLocaleString(); });
		this.spBShot51t.forEach(v => { v.innerText = val.bShot51t.toLocaleString(); });
		this.spCShot25o.forEach(v => { v.innerText = val.cShot25o.toLocaleString(); });
		this.spCShot26o.forEach(v => { v.innerText = val.cShot26o.toLocaleString(); });
		this.spCShot29t.forEach(v => { v.innerText = val.cShot29t.toLocaleString(); });
		this.spCShot30t.forEach(v => { v.innerText = val.cShot30t.toLocaleString(); });
		this.spCShot31t.forEach(v => { v.innerText = val.cShot31t.toLocaleString(); });
		this.spCShot33t.forEach(v => { v.innerText = val.cShot33t.toLocaleString(); });
		this.spCShot34t.forEach(v => { v.innerText = val.cShot34t.toLocaleString(); });
		this.spCShot50t.forEach(v => { v.innerText = val.cShot50t.toLocaleString(); });
		this.spCShot51t.forEach(v => { v.innerText = val.cShot51t.toLocaleString(); });

		this.spAKshot25o.forEach(v => { v.innerText = val.aKshot25o.toLocaleString(); });
		this.setSpan3parts(this.spAKhI26, val.aKhIb26);		// 国保26
		this.setSpan3parts(this.spAKhS26, val.aKhSb26);
		this.setSpan3parts(this.spAKhK26, val.aKhKb26);
		this.spAKh26.forEach(v => { v.innerText = val.aKh26.toLocaleString(); });
		
		this.spAKshot26o.forEach(v => { v.innerText = val.aKshot26o.toLocaleString(); });
		this.setSpan3parts(this.spAKhI30, val.aKhIb30);		// 国保30
		this.setSpan3parts(this.spAKhS30, val.aKhSb30);
		this.setSpan3parts(this.spAKhK30, val.aKhKb30);
		this.spAKh30.forEach(v => { v.innerText = val.aKh30.toLocaleString(); });

		this.spAKshot30o.forEach(v => { v.innerText = val.aKshot30o.toLocaleString(); });
		this.setSpan3parts(this.spAKhI31, val.aKhIb31);		// 国保31
		this.setSpan3parts(this.spAKhS31, val.aKhSb31);
		this.setSpan3parts(this.spAKhK31, val.aKhKb31);
		this.spAKh31.forEach(v => { v.innerText = val.aKh31.toLocaleString(); });

		this.spAKshot31o.forEach(v => { v.innerText = val.aKshot31o.toLocaleString(); });
		this.setSpan3parts(this.spAKhI32, val.aKhIb32);		// 国保32
		this.setSpan3parts(this.spAKhS32, val.aKhSb32);
		this.setSpan3parts(this.spAKhK32, val.aKhKb32);
		this.spAKh32.forEach(v => { v.innerText = val.aKh32.toLocaleString(); });

		this.spAKshot33o.forEach(v => { v.innerText = val.aKshot33o.toLocaleString(); });
		this.setSpan3parts(this.spAKhI34, val.aKhIb34);		// 国保34
		this.setSpan3parts(this.spAKhS34, val.aKhSb34);
		this.setSpan3parts(this.spAKhK34, val.aKhKb34);
		this.spAKh34.forEach(v => { v.innerText = val.aKh34.toLocaleString(); });

		this.spAKshot34o.forEach(v => { v.innerText = val.aKshot34o.toLocaleString(); });
		this.setSpan3parts(this.spAKhI35, val.aKhIb35);		// 国保35
		this.setSpan3parts(this.spAKhS35, val.aKhSb35);
		this.setSpan3parts(this.spAKhK35, val.aKhKb35);
		this.spAKh35.forEach(v => { v.innerText = val.aKh35.toLocaleString(); });

		this.setSpan3parts(this.spAKhI37, val.aKhIb37);		// 国保37
		this.setSpan3parts(this.spAKhS37, val.aKhSb37);
		this.setSpan3parts(this.spAKhK37, val.aKhKb37);
		this.spAKh37.forEach(v => { v.innerText = val.aKh37.toLocaleString(); });

		this.setSpan3parts(this.spAKhI38, val.aKhIb38);		// 国保38
		this.setSpan3parts(this.spAKhS38, val.aKhSb38);
		this.setSpan3parts(this.spAKhK38, val.aKhKb38);
		this.spAKh38.forEach(v => { v.innerText = val.aKh38.toLocaleString(); });

		this.setSpan3parts(this.spAKhI40, val.aKhIb40);		// 国保40
		this.setSpan3parts(this.spAKhS40, val.aKhSb40);
		this.setSpan3parts(this.spAKhK40, val.aKhKb40);
		this.spAKh40.forEach(v => { v.innerText = val.aKh40.toLocaleString(); });

		this.setSpan3parts(this.spAKhI41, val.aKhIb41);		// 国保41
		this.setSpan3parts(this.spAKhS41, val.aKhSb41);
		this.setSpan3parts(this.spAKhK41, val.aKhKb41);
		this.spAKh41.forEach(v => { v.innerText = val.aKh41.toLocaleString(); });

		this.spBKshot49t.forEach(v => { v.innerText = val.bKshot49t.toLocaleString(); });
		this.setSpan3parts(this.spBKhI49, val.bKhIb49);		// 国保
		this.setSpan3parts(this.spBKhS49, val.bKhSb49);
		this.setSpan3parts(this.spBKhK49, val.bKhKb49);
		this.spBKh49.forEach(v => { v.innerText = val.bKh49.toLocaleString(); });

		this.setSpan3parts(this.spBKhI50, val.bKhIb50);		// 国保
		this.setSpan3parts(this.spBKhS50, val.bKhSb50);
		this.setSpan3parts(this.spBKhK50, val.bKhKb50);
		this.spBKh50.forEach(v => { v.innerText = val.bKh50.toLocaleString(); });

		this.spAKshotXt.forEach(v => { v.innerText = val.aKshotXt.toLocaleString(); });
		this.setSpan3parts(this.spAKhIX, val.aKhIbX);		// 国保X
		this.setSpan3parts(this.spAKhSX, val.aKhSbX);
		this.spAKhX.forEach(v => { v.innerText = val.aKhX.toLocaleString(); });

		this.spAKh60.forEach(v => { v.innerText = val.aKh60.toLocaleString(); });	// 国保60

		this.spAOKaig29L.forEach(v => { v.innerText = val.aKaig29Lo.toLocaleString(); });	// 介護保険
		this.spAOKaig30L.forEach(v => { v.innerText = val.aKaig30Lo.toLocaleString(); });
		this.spAOKaig31L.forEach(v => { v.innerText = val.aKaig31Lo.toLocaleString(); });
		this.spAOKaig33L.forEach(v => { v.innerText = val.aKaig33Lo.toLocaleString(); });
		this.spAOKaig34L.forEach(v => { v.innerText = val.aKaig34Lo.toLocaleString(); });
		this.spBTKaig49L.forEach(v => { v.innerText = val.bKaig49Lt.toLocaleString(); });
		this.spATKaigXL.forEach(v => { v.innerText = val.aKaigXLt.toLocaleString(); });

		this.spAOKaig30Y.forEach(v => { v.innerText = val.aKaig30oY.toLocaleString(); });
		this.spAOKaig30.forEach(v => { v.innerText = val.aKaig30o.toLocaleString(); });
		this.spAOKaig31.forEach(v => { v.innerText = val.aKaig31o.toLocaleString(); });
		this.spBTKaig50.forEach(v => { v.innerText = val.bKaig50t.toLocaleString(); });
		this.spATKaigX.forEach(v => { v.innerText = val.aKaigXt.toLocaleString(); });
		//console.log(`dbg> kaig4t: ${kaig4t}`);
		
		this.spAKoki40o.forEach(v => { v.innerText = val.aKoki40o.toLocaleString(); }); 	// 後期高齢者保険
		this.spAKoki41o.forEach(v => { v.innerText = val.aKoki41o.toLocaleString(); });
		this.spAKoki51o.forEach(v => { v.innerText = val.aKoki51o.toLocaleString(); });
		this.spAKoki52o.forEach(v => { v.innerText = val.aKoki52o.toLocaleString(); });
		this.spAKoki61t.forEach(v => { v.innerText = val.aKoki61t.toLocaleString(); });
		this.spAKoki60t.forEach(v => { v.innerText = val.aKoki60t.toLocaleString(); }); 

		// 所得税
		this.spASzSh26o.forEach(v => { v.innerText = val.aSzSh26o.toLocaleString(); });
		this.spASzSh27o.forEach(v => { v.innerText = val.aSzSh27o.toLocaleString(); });
		this.spASzSh30o.forEach(v => { v.innerText = val.aSzSh30o.toLocaleString(); });
		this.spASzSh31o.forEach(v => { v.innerText = val.aSzSh31o.toLocaleString(); });
		this.spASzKj31o.forEach(v => { v.innerText = val.aSzKj31o.toLocaleString(); });
		this.spAShoZei31o.forEach(v => { v.innerText = val.aShoZei31o.toLocaleString(); });
		this.spASzSh32o.forEach(v => { v.innerText = val.aSzSh32o.toLocaleString(); });
		this.spASzKj32o.forEach(v => { v.innerText = val.aSzKj32o.toLocaleString(); });
		this.spAShoZei32o.forEach(v => { v.innerText = val.aShoZei32o.toLocaleString(); });
		this.spASzSh33o.forEach(v => { v.innerText = val.aSzSh33o.toLocaleString(); });
		this.spASzKj33o.forEach(v => { v.innerText = val.aSzKj33o.toLocaleString(); });
		this.spAShoZei33o.forEach(v => { v.innerText = val.aShoZei33o.toLocaleString(); });
		this.spASzSh34o.forEach(v => { v.innerText = val.aSzSh34o.toLocaleString(); });
		this.spASzKj34o.forEach(v => { v.innerText = val.aSzKj34o.toLocaleString(); });
		this.spAShoZei34o.forEach(v => { v.innerText = val.aShoZei34o.toLocaleString(); });
		this.spASzSh35o.forEach(v => { v.innerText = val.aSzSh35o.toLocaleString(); });
		this.spASzKj35o.forEach(v => { v.innerText = val.aSzKj35o.toLocaleString(); });
		this.spAShoZei35o.forEach(v => { v.innerText = val.aShoZei35o.toLocaleString(); });
		this.spASzSh37o.forEach(v => { v.innerText = val.aSzSh37o.toLocaleString(); });
		this.spASzKj37o.forEach(v => { v.innerText = val.aSzKj37o.toLocaleString(); });
		this.spAShoZei37o.forEach(v => { v.innerText = val.aShoZei37o.toLocaleString(); });
		this.spASzSh38o.forEach(v => { v.innerText = val.aSzSh38o.toLocaleString(); });
		this.spASzKj38o.forEach(v => { v.innerText = val.aSzKj38o.toLocaleString(); });
		this.spAShoZei38o.forEach(v => { v.innerText = val.aShoZei38o.toLocaleString(); });
		this.spASzSh39o.forEach(v => { v.innerText = val.aSzSh39o.toLocaleString(); });
		this.spASzKj39o.forEach(v => { v.innerText = val.aSzKj39o.toLocaleString(); });
		this.spAShoZei39o.forEach(v => { v.innerText = val.aShoZei39o.toLocaleString(); });
		this.spASzSh40o.forEach(v => { v.innerText = val.aSzSh40o.toLocaleString(); });
		this.spASzKj40o.forEach(v => { v.innerText = val.aSzKj40o.toLocaleString(); });
		this.spAShoZei40o.forEach(v => { v.innerText = val.aShoZei40o.toLocaleString(); });
		this.spASzSh41o.forEach(v => { v.innerText = val.aSzSh41o.toLocaleString(); });
		this.spASzKj41o.forEach(v => { v.innerText = val.aSzKj41o.toLocaleString(); });
		this.spAShoZei41o.forEach(v => { v.innerText = val.aShoZei41o.toLocaleString(); });
		this.spASzShXt.forEach(v => { v.innerText = val.aSzShXt.toLocaleString(); });
		this.spASzSh60t.forEach(v => { v.innerText = val.aSzSh60t.toLocaleString(); });
		this.spASzSh61t.forEach(v => { v.innerText = val.aSzSh61t.toLocaleString(); });
		this.spBSzSh48t.forEach(v => { v.innerText = val.bSzSh48t.toLocaleString(); });
		this.spBSzSh49t.forEach(v => { v.innerText = val.bSzSh49t.toLocaleString(); });
		this.spBSzSh50t.forEach(v => { v.innerText = val.bSzSh50t.toLocaleString(); });
		this.spBSzSh51t.forEach(v => { v.innerText = val.bSzSh51t.toLocaleString(); });

		// 住民税
		this.spAJzKj32o.forEach(v => { v.innerText = val.aJzKj32o.toLocaleString(); });
		this.spAJuZei32o.forEach(v => { v.innerText = val.aJuZei32o.toLocaleString(); });
		this.spAJzKj33o.forEach(v => { v.innerText = val.aJzKj33o.toLocaleString(); });
		this.spAJuZei33o.forEach(v => { v.innerText = val.aJuZei33o.toLocaleString(); });
		this.spAJzKj34o.forEach(v => { v.innerText = val.aJzKj34o.toLocaleString(); });
		this.spAJuZei34o.forEach(v => { v.innerText = val.aJuZei34o.toLocaleString(); });
		this.spAJzKj35o.forEach(v => { v.innerText = val.aJzKj35o.toLocaleString(); });
		this.spAJuZei35o.forEach(v => { v.innerText = val.aJuZei35o.toLocaleString(); });
		this.spAJzKj37o.forEach(v => { v.innerText = val.aJzKj37o.toLocaleString(); });
		this.spAJuZei37o.forEach(v => { v.innerText = val.aJuZei37o.toLocaleString(); });
		this.spAJzKj38o.forEach(v => { v.innerText = val.aJzKj38o.toLocaleString(); });
		this.spAJuZei38o.forEach(v => { v.innerText = val.aJuZei38o.toLocaleString(); });
		this.spAJzKj39o.forEach(v => { v.innerText = val.aJzKj39o.toLocaleString(); });
		this.spAJuZei39o.forEach(v => { v.innerText = val.aJuZei39o.toLocaleString(); });
		this.spAJzKj40o.forEach(v => { v.innerText = val.aJzKj40o.toLocaleString(); });
		this.spAJuZei40o.forEach(v => { v.innerText = val.aJuZei40o.toLocaleString(); });
		this.spAJzKj41o.forEach(v => { v.innerText = val.aJzKj41o.toLocaleString(); });
		this.spAJuZei41o.forEach(v => { v.innerText = val.aJuZei41o.toLocaleString(); });
	}

	getSpan3parts(name1, name2, name3){
		return [
			Array.from(document.getElementsByClassName(name1)),
			Array.from(document.getElementsByClassName(name2)),
			Array.from(document.getElementsByClassName(name3)) ];
	}
	
	setSpan3parts(parts, values){
		parts[0].forEach(v => { v.innerText = values[0].toLocaleString(); });
		parts[1].forEach(v => { v.innerText = values[1].toLocaleString(); });
		parts[2].forEach(v => { v.innerText = values[2].toLocaleString(); });
	}
}

// 受給年金表
class NenkinGets {
	bNenkinO = null;
	bNenkinT = null;

	constructor(val){
		this.bNenkinO = Array(63);
		this.bNenkinT = Array(63);
		this.bNenkinO.fill(0);
		this.bNenkinT.fill(0);
		// 標準
		this.bNenkinO[25] = val.bNen25o;
		this.bNenkinO.fill(val.bNen26o, 26, 30);		
		this.bNenkinO[30] = val.bNen30o;
		this.bNenkinO.fill(val.bNen31o, 31, 33);		
		this.bNenkinO[33] = val.bNen33o;
		this.bNenkinO.fill(val.bNen34o, 34, 63);	// 夫生存中
		this.bNenkinT.fill(val.bNen49tF, 34, 50);	// 夫死亡後
		this.bNenkinT[50] = val.bNen50tF;
		this.bNenkinT.fill(val.bNen51tF, 51, 63);
	}
}

// 国民年金支払い表
class NenkinPays {
	bNenPaysO = null;
	bNenPaysT = null;

	constructor(val){
		this.bNenPaysO = Array(63);
		this.bNenPaysT = Array(63);
		this.bNenPaysO.fill(0);
		this.bNenPaysT.fill(0);
		this.bNenPaysO.fill(val.bNenPay25_29, 25, 30)
		this.bNenPaysO[30] = val.bNenPay30o;
		this.bNenPaysO[31] = val.bNenPay31o;
		this.bNenPaysO.fill(val.bNenPay32_36o, 32, 37);
		this.bNenPaysO[37] = val.bNenPay37o;
		//this.bNenPaysO[38] = val.bNenPay38_Xo;
		//this.bNenPaysO[39] = 99;
		this.bNenPaysO.fill(val.bNenPay38_Xo, 38, 49);
		this.bNenPaysO[49] = val.bNenPay49t;
		//this.bNenPaysT.fill(99, 39, 48);
		//this.bNenPaysT[48] = val.bNenPayX_48t;
		this.bNenPaysT.fill(val.bNenPayX_48t, 39, 49);
		this.bNenPaysT[49] = val.bNenPay49t;
	}
}

// 税金支払い表
class ZeikinPays {
	kokuhoPay = null;	// 健保支払
	kaigoPayO = null;	// 夫介護支払
	kaigoPayT = null;	// 妻介護支払
	kokiPayO = null;	// 夫後期支払
	kokiPayT = null;	// 妻後期支払
	shotPayO = null;	// 夫所得支払
	shotPayT = null;	// 妻所得支払
	juminPayO = null;	// 夫住民支払
	juminPayT = null;	// 妻住民支払

	constructor(zk){
		// 健保
		this.kokuhoPay = Array(63);
		this.kokuhoPay.fill(0);
		this.kokuhoPay.fill(zk.aKh26, 26, 30);
		this.kokuhoPay[30] = zk.aKh30;
		this.kokuhoPay[31] = zk.aKh31;
		this.kokuhoPay.fill(zk.aKh32, 32, 34);
		this.kokuhoPay[34] = zk.aKh34;
		this.kokuhoPay.fill(zk.aKh35, 35, 37);
		this.kokuhoPay[37] = zk.aKh37;
		this.kokuhoPay.fill(zk.aKh38, 38, 40);
		this.kokuhoPay[40] = zk.aKh40;
		this.kokuhoPay[41] = zk.aKh41;	// 生存中
		this.kokuhoPay[42] = 99;
		this.kokuhoPay.fill(zk.bKh49, 43, 50);	// 死亡後
		this.kokuhoPay[50] = zk.bKh50;
		this.kokuhoPay.fill(zk.aKhX, 51, 60);
		this.kokuhoPay[60] = zk.aKh60;
		// 介護保険料
		this.kaigoPayO = Array(63);
		this.kaigoPayT = Array(63);
		this.kaigoPayO.fill(0);
		this.kaigoPayT.fill(0);
		this.kaigoPayO[30] = zk.aKaig30o;
		this.kaigoPayO.fill(zk.aKaig31o, 31, 63);
		this.kaigoPayT.fill(zk.bKaig50t, 50, 52);
		this.kaigoPayT.fill(zk.aKaigXt, 52, 63);
		// 後期高齢者保険料★
		this.kokiPayO = Array(63);
		this.kokiPayT = Array(63);
		this.kokiPayO.fill(0);
		this.kokiPayT.fill(0);
		this.kokiPayO[40] = zk.aKoki40o;
		this.kokiPayO.fill(zk.aKoki41o, 41, 63);
		//this.kokiPayO[51] = zk.aKoki51o;
		//this.kokiPayO.fill(zk.aKoki52o, 52, 63);
		this.kokiPayT[60] = zk.aKoki60t;
		this.kokiPayT.fill(zk.aKoki61t, 61, 63);
		// 所得税
		this.shotPayO = Array(63);	// 夫所得支払
		this.shotPayT = Array(63);	// 妻所得支払
		this.shotPayO.fill(0);
		this.shotPayT.fill(0);
		//this.shotPayO[26] = zk.aShoZei26o;
		//this.shotPayO.fill(zk.aShoZei27o, 27, 30);
		//this.shotPayO[30] = zk.aShoZei30o;
		this.shotPayO[31] = zk.aShoZei31o;
		this.shotPayO[32] = zk.aShoZei32o;
		this.shotPayO[33] = zk.aShoZei33o;
		this.shotPayO[34] = zk.aShoZei34o;
		this.shotPayO.fill(zk.aShoZei35o, 35, 37);
		this.shotPayO[37] = zk.aShoZei37o;
		this.shotPayO[38] = zk.aShoZei38o;
		this.shotPayO[39] = zk.aShoZei39o;
		this.shotPayO[40] = zk.aShoZei40o;
		this.shotPayO.fill(zk.aShoZei41o, 41, 63);
		// 住民税
		this.juminPayO = Array(63);	// 夫住民支払
		this.juminPayT = Array(63);	// 妻住民支払
		this.juminPayO.fill(0);
		this.juminPayT.fill(0);
		this.juminPayO[32] = zk.aJuZei32o;
		this.juminPayO[33] = zk.aJuZei33o;
		this.juminPayO[34] = zk.aJuZei34o;
		this.juminPayO.fill(zk.aJuZei35o, 35, 37);
		this.juminPayO[37] = zk.aJuZei37o;
		this.juminPayO[38] = zk.aJuZei38o;
		this.juminPayO[39] = zk.aJuZei39o;
		this.juminPayO[40] = zk.aJuZei40o;
		this.juminPayO.fill(zk.aJuZei41o, 41, 63);
	}
};

class App {

	constructor(){
		this.contentsText = null;
		this.zeikinParams = null;
		this.nenkinValues = null;
		this.zeikinParamsMap = null;	// 税金算出規定値
		this.zeikinParamWidget = null;	// 税金算出規定値画面部品
		this.nenkinValuesMap = null;	// 公的年金データ値
		this.nenkinValueWidget = null;	// 公的年金データ値画面部品
		this.zeikinWidget = null;		// 税金算出値画面部品
	}

	// 初期化処理
	init(){
		this.contentsText = document.querySelector("#CONTENTS_TEXT");
		this.zeikinParams = document.querySelector("#ZEIKIN_PARAMS");
		FileUtil.initDnDReadText(this.contentsText, null, text => this.setText(text));
		this.contentsText2 = document.querySelector("#CONTENTS_TEXT2");
		this.nenkinValues = document.querySelector("#NENKIN_VALUES");
		FileUtil.initDnDReadText(this.contentsText2, null, text => this.setText2(text));

		this.zeikinParamWidget = new ZeikinParamWidget();	// 税金算出規定値
		this.nenkinValueWidget = new NenkinValuesWidget();	// 公的年金データ値
		this.zeikinWidget = new ZeikinWidget();	// 税金算出値画面部品

		this.zeikinParamsMap = new Map();
		this.nenkinValuesMap = new Map();
	}

	// 実行（GUIロード時に呼ばれる）
	run(){
		this.scanZeikinParams();	// 税金パラメータをテキストから読み取って辞書作成
		this.viewZeikinParams();	// 税金パラメータ表示
		this.scanNenkinValues();	// 年金値をテキストから読み取って辞書作成
		this.viewNenkinValues();	// 年金値表示
		this.calcZeikin();			// 税金計算
		//this.drawFigures();			// 図表示
	}

	// パラメータ値更新（GUIボタン押しで呼ばれる）
	updateZeikinParams(){
		this.scanZeikinParams();	// 税金パラメータをテキストから読み取って辞書作成
		this.viewZeikinParams();	// 税金パラメータ表示
		this.calcZeikin();			// 税金計算
	}

	// 年金値更新（GUIボタン押しで呼ばれる）
	updateNenkinValues(){
		this.scanNenkinValues();	// 年金値をテキストから読み取って辞書作成
		this.viewNenkinValues();	// 年金値表示
		this.calcZeikin();			// 税金計算
	}

	// 収支計画データ作成 for Download
	buildPlanData(zp, nv, zeikin){
		const ngets = new NenkinGets(nv);	// 受給年金表
		const npays = new NenkinPays(nv);	// 年金支払い表
		const zpays = new ZeikinPays(zeikin);	// 税金支払い表

		let text = "年, 夫年金, 妻年金";
		text += ", 夫年金支払, 妻年金支払, 健保支払, 夫介護支払, 妻介護支払, 夫後期支払, 妻後期支払";
		text += ", 夫所得支払, 妻所得支払, 夫住民支払, 妻住民支払\n";
		for (let i = 25; i <= 62; i++) {
			text += `${i}`;
			text += `, ${ngets.bNenkinO[i]}, ${ngets.bNenkinT[i]}`;		// 年金受給額
			text += `, ${npays.bNenPaysO[i]}, ${npays.bNenPaysT[i]}`;	// 国民年金保険料納付額
			text += `, ${zpays.kokuhoPay[i]}`;							// 国民健康保険料納付額
			text += `, ${zpays.kaigoPayO[i]}, ${zpays.kaigoPayT[i]}`;	// 介護保険料納付額
			text += `, ${zpays.kokiPayO[i]}, ${zpays.kokiPayT[i]}`;	// 後期高齢者保険料納付額
			text += `, ${zpays.shotPayO[i]}, ${zpays.shotPayT[i]}`;	// 所得税納付額
			text += `, ${zpays.juminPayO[i]}, ${zpays.juminPayT[i]}`;	// 住民税納付額
			text += '\n';
		}
		this.result = text;
	}

	// 税金計算
	calcZeikin(){
		const zp = new ZeikinParam(this.zeikinParamsMap);	// 税金算出規定値
		const nv = new NenkinValues(this.nenkinValuesMap);	// 公的年金データ値

		const zeikin = new Zeikin(zp, nv);	// 税金算出値（計算）

		this.zeikinParamWidget.update(zp);	// 税金算出規定値更新
		this.nenkinValueWidget.update(nv);	// 公的年金データ値更新
		this.zeikinWidget.update(zeikin);	// 税金算出更新

		this.buildPlanData(zp, nv, zeikin);	// 収支計画データ作成
	}

	// 税金パラメータをテキストから読み取って辞書作成
	scanZeikinParams(){
		const zmap = this.zeikinParamsMap;
		try{
			// 規定値マップ作成
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
		}
		catch(e){
			console.error(e);
			this.zeikinParams.innerHTML = e.stack;
		}
	}

	// 年金値をテキストから読み取って辞書作成
	scanNenkinValues(){
		const nmap = this.nenkinValuesMap;
		try{
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
		}
		catch(e){
			console.error(e);
			this.nenkinValues.innerHTML = e.stack;
		}
	}

	// 税金算出規定値表示
	viewZeikinParams(){
		const varkeys = [
			"年金等控除65歳未満130万円以下","年金等控除65歳未満410万円以下定額分",
			"年金等控除65歳以上330万円以下","年金等控除65歳以上410万円以下定額分",
			"国民健康保険基礎控除",
			"国民健康保険医療分所得割","国民健康保険医療分均等割","国民健康保険医療分限度額",
			"国民健康保険支援分所得割","国民健康保険支援分均等割","国民健康保険支援分限度額",
			"国民健康保険介護分所得割","国民健康保険介護分均等割","国民健康保険介護分限度額",
			"介護保険料第1段階年額","介護保険料第2段階年額","介護保険料第3段階年額","介護保険料第4段階年額",
			"介護保険料第5段階年額","介護保険料第6段階年額","介護保険料第7段階年額",
			"後期高齢者保険基礎控除", "後期高齢者保険均等割","後期高齢者保険所得割",
			"年金所得税率（復興特別税含む）", "所得税基礎控除", "所得税配偶者控除","所得税扶養控除",
			"住民税率","住民税均等割","住民税基礎控除","住民税配偶者控除","住民税寡婦控除",
			"住民税扶養控除16以上19未満","住民税扶養控除19以上23未満",
			"住民税扶養控除一般","住民税扶養控除特定","住民税扶養控除老人"
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
		try{
			this.nenkinValues.innerHTML = "";
			let result = '<table class="VALUES">';
			result += '<tr><th>項目</th><th>値</th></tr>';
			this.nenkinValuesMap.forEach((value, key) => {
				//console.log(key.substr(0,2));
				if ("標準" == key.substr(0,2)) {
					result += '<tr><td>';
					result += key;
					result += '</td><td>';
					result += Number(value).toLocaleString();	// コンマ区切り
					result += '</td></tr>';				
				}
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
	
	// 結果をダウンロード
	downloadResult(filename){
		FileUtil.downloadText(this.result, filename);
	}
}

// Python's zip
function* zip(...args){
    const length = args[0].length;    
    for (let arr of args){
        if (this.arr.length !== length){
            throw "Lengths of arrays are not eqaul.";
        }
    }
    for (let index = 0; index < length; index++){
        let elms = [];
        for (this.arr of args){
            elms.push(this.arr[index]);
        }
        yield elms;
    }
}
