/* @modifier moriuchi 2024/10
  MIT License。流用・改造はご自由に。
 */
/* @author gorogoronyan 2024/09
  MIT License。流用・改造はご自由に。
 */

let FileUtil = {};
 
/** テキストをダウンロード
	add moriuchi
 */
FileUtil.downloadText = function(text, filename) {
	const a = document.createElement("a");
	const url = URL.createObjectURL(new Blob([text], {type: "text/plain"}));
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

/** FileReader でテキストファイルとして読み、コールバックする。
  @param {Blob} file
  @param {string} encoding : 文字コード。null の場合は utf-8。
  @param {Callback} callback(text, file, progressEvent)
    エラーの場合は text = null。後は event を見て。
 */
FileUtil.readText = function(file, encoding = "utf-8", callback){
	const reader = new FileReader();
	reader.onload = event => callback(event.target.result, file, event);
	reader.onerror = error => callback(null, file, error);
	reader.readAsText(file, encoding);
};

/** 同期でテキストファイルを読む。
 @param {Blob} file : ファイル。Blob も可。
 @return [string} エラーの場合は null。
 */
FileUtil.readTextSync = async function(file, encoding){
	return new Promise( (resolve, reject) => {
		FileUtil.readText(file, encoding, (text, file, event) => resolve(text));
	})
	.then( text => text);
};

/** ファイルのドラッグ＆ドロップでテキストファイルを読む。
 @param {HTMLElement} elTarget: ドロップを受ける要素。
   例:body, textarea, div など。document も可能。
 @param {string} encoding : 文字コード。null にした場合は utf-8。
 @param {Callback} callback(text, file, progressEvent, dragEvent) : 
  ファイル読み込みを完了したときに呼ばれるコールバック。
  text: テキストファイルの内容。
  progressEvent: ファイル読み込み完了のイベント。FileReader やエラーなどの情報。
  dragEvent: ドロップしたときイベント。
 */
FileUtil.initDnDReadText = function(elTarget, encoding = "utf-8", callback){
	this.initDnDFile(elTarget, (file, dragEvent) => {
		this.readText(file, encoding, (text, file, progressEvent) => callback(text, file, progressEvent, dragEvent));
	});
};

/** ファイルのドロップイベントが発生したら最初のファイルをコールバックする。
 @param {HTMLElement} elTarget: ドロップを受ける要素。
 @param {Callback} callback(File, dragEvent) : 
 */
FileUtil.initDnDFile = function(elTarget, callback){
	elTarget.addEventListener("drop", event => {
//console.log("#drop");
		// デフォルトの動作を無効にする。
		// event.stopPropagation() で止める方法もあります。
		event.preventDefault();
		// 1個目のファイルだけ処理する。
		const file = event.dataTransfer.files[0];
		if (file){
			callback(file, event);
		}
	});

	elTarget.addEventListener("dragover", event => {
		// デフォルトはドロップ禁止の表示になるので無効する。
		event.preventDefault();
	});

	// マウスカーソルのアイコンを変えるなど必要な処理があれば入れる。
	//elTarget.addEventListener("dragenter", event => {});
};
