/*
	====================================================
	Project Name    : 栽培記録クラス（栽培ライブラリ）
	File Name       : CultivationLog.js
	Encoding        : UTF-8
	Creation Date   : 2025/06/10
	Author's email	: moriuchi@ymail.ne.jp

	Copyright © 2025 moriuchi. All rights reserved.
	====================================================
 */

// 栽培記録クラス
class CultivationLog {

    constructor(elem_name) {
        this.log_elem = document.getElementById(elem_name);
        this.articles = [];     // 記事
        this.label_list_class = 'label_style0';
        this.label_lineheight = null;
        this.label_gap = null;
    }

    // 栽培記録追加
    add_log(name, date, photos, text) {
        let title = `<div class="name">${name}</div>`;
        const imgs = photos.split(", ");
        const same_article = this.articles.find( item => item.name == name );
        let log = `<div class="date">${date}</div>`;
        for (let i=0; i < imgs.length; i++) {
            log += `<img src="${imgs[i]}">`;
        }
        if (text == undefined) text = '';
        log += '<p class="popup-text">' + text + '</p>';
        if (same_article == undefined) {
            const content = title + log;
            this.articles.push( { name, content } );
        } else {
            same_article.content += log;
        }
    }

    // 栽培記録用div領域に栽培記録設定
    set_logs() {
        this.log_elem.innerHTML = this.get_logs_();
    }

    // ラベルスタイル指定
    set_label_style(no) {
        switch (no) {
            case 1:     // 縦並び
                this.label_list_class = 'label_style1';
                break;
            case 2:     // 横並び
                this.label_list_class = 'label_style2';
                break;
            default:    // マーカー付き縦並び（デフォルト）
                this.label_list_class = 'label_style0';
                break;
        }
    }

    // 行高さ指定
    set_label_lineheight(h) {
        this.label_lineheight = `line-height:${h};`;
    }

    // 横並び時の間隔指定
    set_label_gap(g) {
        this.label_gap = `gap:${g};`;
    }
    
    // 周囲余白指定
    set_margin(margin_str) {
        this.log_elem.style.margin = margin_str;
    }

    // 栽培記録取得
    get_logs_() {
        let opt = '';
        if (this.label_gap != null || this.label_lineheight != null) {
            opt = 'style="';
            if (this.label_lineheight != null) opt += this.label_lineheight;
            if (this.label_gap != null) opt += this.label_gap;
            opt += '"';
        }
        let links = `<ul class=${this.label_list_class} ${opt}>`;
        let contents = '';
        for (let ai = 0; ai < this.articles.length; ai++) {
            const article = this.articles[ai];
            const id = "popup" + ai;
            links += '<li>' + this.get_popup_link_(id, article.name);
            contents += this.get_popup_content_(id, article.content);
        }
        links += '</ul>';
        return links + contents;
    }

    get_popup_link_(id, label) {    // ポップアップリンクラベル取得
        let out = '<div class="label">';
        out += `<a href="" class="popup-open" data-modal-btn=${id}>${label}</a>`;
        out += '</div>';
        return out;
    }

    get_popup_content_(id, content) {   // ポップアップ記事取得
        let out = `<div class="popup-wrap" data-modal-cont=${id}>`;
        out += '<div class="popup-back"></div>';
        out += '<div class="popup-inner"><span class="popup-close"></span><div class="popup-contents">';
        out += content;
        out += '</div></div></div>';
        return out;
    }
  
}
