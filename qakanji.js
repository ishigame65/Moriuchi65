/* @author moriuchi 2024/10
 * © 2024 moriuchi65.
 */

let app;

window.onload = () => {
	app = new App();
	try {
		app.init();
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
		this.qaContents = null;
		this.qaTitle = null;
		this.qaInstruction = null;
	}

	// 初期化処理
	init(){
		this.titleText = document.querySelector("#TITLE_TEXT");
		this.instructionText = document.querySelector("#INSTRUCTION_TEXT");
		this.contentsText = document.querySelector("#CONTENTS_TEXT");
		this.qaContents = document.querySelector("#QACONTENTS");
		this.qaTitle = document.querySelector("#QATITLE");
		this.qaInstruction = document.querySelector("#QAINSTRUCTION");
		FileUtil.initDnDReadText(this.contentsText, null, text => this.setText(text));
	}
	
	createPracticeQA(is_ans){
		const regex = /[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]/mu;	// 平仮名が含まれるか判定
		try{
			this.qaContents.innerHTML = "";
			this.qaTitle.innerText = this.titleText.value;
			this.qaInstruction.innerText = this.instructionText.value;					
			const text = this.contentsText.value;
			const qlines = [];
			const alines = [];
			for (let line of text.split('\n')){	// 1行ずつ
				const qline = [];
				const aline = [];
				for (let word of line.split(/＜|＞/)){	// 1語ずつ
					if (word == ''){
						continue;
					}
					let kword = word.split(/（|）/);
					if (kword.length > 1){	// 3個目は空白文字
						if (regex.test(kword[0])){	// 平仮名を含む
							aline.push(kword[0]);
							qline.push('<span class="ISKANA">' + kword[1] + '</span>');
						}else{						// 平仮名を含まない
							aline.push(kword[0]);
							qline.push('<span class="NOKANA">' + kword[1] + '</span>');
						}
					}else{
						qline.push(word);
						aline.push(word);
					}
				}
				if (qline.length == 0){
					continue;
				}
				qlines.push(qline.join(''));	// 配列要素を指定文字でつなぐ
				alines.push(aline.join(''));	// 配列要素を指定文字でつなぐ
			}
			let result = '<ol class="MARU_NUM_LIST">';
			for (let [q, a] of zip(qlines, alines)){
				result += '<li>';
				result += q;
				result += '<div class="ANSWER">';
				if (is_ans){
					result += a;
				} else {
					result += '　';
				}
				result += '</div>';
			}
			result += '</ol>';
			console.log(result);
			this.qaContents.innerHTML = result;
		}
		catch(e){
			console.error(e);
			this.qaContents.innerHTML = e.stack;
		}
	}

	setText(text){
		this.contentsText.innerText = text;
	}

	readFile(file){
		const text = FileUtil.readTextSync(file);
		if (text){
			this.contentsText.innerText = text;
		}
		else {
			alert(`ファイルがありません`);
		}
	}
}

function* zip(...args){    // Python's zip
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
