/*
	====================================================
	Project Name    : 栽培計画クラス（栽培ライブラリ）
	File Name       : CultivationPlan.js
	Encoding        : UTF-8
	Creation Date   : 2025/06/04 - 2025/07/11
	Author's email	: moriuchi@ymail.ne.jp

	Copyright © 2025 moriuchi. All rights reserved.
	====================================================
 */

// 栽培計画クラス
class CultivationPlan {

    constructor(elem_name) {
        // 描画準備
        this.canvas = document.getElementById(elem_name);
        this.canvas_width = this.canvas.clientWidth;
        this.canvas_height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        this.act_color = {};    // 作業定義
        this.status_color = {}; // 状態定義
        this.status_opacity = 0.5;  // 状態不透明度
        this.click_method = [];
        this.dataset = null;    // 栽培期間データ
        this.methodset = null;  // 栽培方法説明
        // デフォルト値設定
        this.bgcolor = 'white'; // 背景色
        this.set_font("14px 'MS P Gothic'");
        this.padding = 10;
        this.border_width = 0.25;
        this.border_color = 'gray';
        this.month_bgcolor = null;
        this.is_legend = true;
        this.today_width = 0.5;
        this.today_color = null;
    }

    set_dataset(dataset) {  // 栽培期間データ設定
        this.dataset = dataset;       
    }

    set_methodset(methodset) {  // 栽培方法説明設定
        this.methodset = methodset;       
    }

    add_action(action, color) { // 作業定義（作業名, 色）
        this.act_color[action] = color;
    }

    add_status(status, color) { // 状態定義（状態名, 色）
        this.status_color[status] = color;
    }

    set_status_opacity(opacity) {   // 状態不透明度
        this.status_opacity = opacity;
    }

    set_bgcolor(color) {    // 背景色設定（オプション）
        this.bgcolor = color;
    }

    set_font(font) {    // フォント設定（オプション）
        this.ctx.font = font;
        this.font_size = parseInt(font.match(/(\d+)px/)[1]);   // 正則表現でpxを抽出して数値に変換
        this.ystep = this.font_size * 2;
    }

    set_padding(val) {   // パディング設定（オプション）
        this.padding = val;
    }

    set_border(width, color) {   // 罫線の幅と色を設定（オプション）
        this.border_width = width;
        this.border_color = color;
    }

    set_month_bgcolor(color) {  // 月背景色設定（オプション）
        this.month_bgcolor = color;
    }

    hide_legend() { // 凡例非表示（オプション）
        this.is_legend = false;
    }

    set_today(width, color) {   // 今日線の幅と色を設定（オプション）
        this.today_width = width;
        this.today_color = color;
    }

    draw() { // 描画
        this.ctx.fillStyle = this.bgcolor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.label_width = this.get_max_name_width_(this.dataset) + 10;
        this.xzero = this.padding + this.label_width + 1;
        this.xstep = (this.canvas_width - this.label_width - this.padding * 2) / 36;
        this.draw_month_(this.dataset.length);  // 月描画
        let ypos = this.padding + this.ystep;
        for (let i = 0; i < this.dataset.length; i++) {
            const data = this.dataset[i];
            let periodset = [];
            for (let key in data) {
                switch (key) {
                    case 'name':
                    case 'color':
                    case 'status':
                        break;
                    default:
                        if (this.act_color[key] !== undefined) periodset.push(key); // 期間追加
                        break;
                }
            }
            // 期間重複検査
            let drawperiods = [];
            let check = Array(12*3).fill(0);
            let is2nd = false;
            for (let pi = 0; pi < periodset.length; pi++) {
                const key = periodset[pi];
                const { start, end } = this.get_period_(data[key]); // 開始日, 終了日翌日
                let y2nd = 0;
                if (start < end) {
                    for (let p = start; p < end; p++) {
                        if (check[p] != 0) {
                            y2nd = 1;
                            break;
                        }
                    }
                    if (y2nd == 0) {
                        for (let p = start; p < end; p++) check[p] = pi + 1;
                    } else {
                        is2nd = true;
                    }
                } else {    // 年またぎ
                    const limit = 36;   // 12*3
                    for (let p = start; p < limit; p++) {
                        if (check[p] != 0) {
                            y2nd = 1;
                            break;
                        }
                    }
                    if (y2nd == 0) {
                        for (let p = 0; p < end; p++) {
                            if (check[p] != 0) {
                                y2nd = 1;
                                break;
                            }
                        }
                    }
                    if (y2nd == 0) {
                        for (let p = start; p < limit; p++) check[p] = pi + 1;
                        for (let p = 0; p < end; p++) check[p] = pi + 1;
                    } else {
                        is2nd = true;
                    }
                }
                drawperiods.push( { key, start, end, ypos, y2nd } );    // 描画期間データ準備
            }
            // 行高さ算出
            let yheight = this.ystep;
            if (is2nd) {
                yheight += this.ystep / 2;
            }

            // 名前描画
            this.draw_name_(ypos, yheight, data.color, "black", data.name);

            // 縦線描画
            for (let month = 1; month <= 12; month++) {
                const x0 = this.xzero + (month - 1) * 3 * this.xstep;
                this.draw_line_(x0, ypos, x0, ypos + yheight, this.border_color, this.border_width);
            }
            const xlimit = this.xzero + 36 * this.xstep;
            this.draw_line_(xlimit - 1, ypos, xlimit - 1, ypos + yheight, this.border_color, this.border_width);

            // 期間描画
            let yoffset = 0;
            for (let di = 0; di < drawperiods.length; di++) {
                const { key, start, end, ypos, y2nd } = drawperiods[di];
                const method = this.methodset.get(`${data.name}:${key}`);
                // console.log(`${ckey.name},${ckey.action},${method}`);
                if (is2nd) yoffset = y2nd == 0 ? -1 : 1;
                this.draw_period_(ypos, yoffset, this.act_color[key], start, end, method);
            }

            // 状態色描画
            if (this.status_color[data.status] !== undefined) {         
                this.draw_status_(ypos, yheight, this.status_color[data.status], this.status_opacity);
            }

            // 横線描画
            this.draw_line_(this.padding, ypos, this.canvas_width - this.padding, ypos, this.border_color, this.border_width);
            ypos += yheight;
        }
        this.draw_line_(this.padding, ypos, this.canvas_width - this.padding, ypos, this.border_color, this.border_width);  // 横線描画
        const ys = this.padding + this.ystep;

        // 今日描画
        if (this.today_color != null) this.draw_today_(ys, ypos- ys, this.today_color, this.today_width);

        // 凡例描画
        if (this.is_legend) this.draw_legend_(ypos);
    }

    action_clicked(mx, my) {    // 作業選択（栽培方法説明）
        const maxlen = 22;
        const fgcolor = 'DarkBlue';
        const bgcolor = 'rgba(255,255,255,0.75)';
        // const bgcolor = 'orange';
        for (let i = 0; i < this.click_method.length; i++) {
            const m = this.click_method[i];
            if (mx >= m.x && mx <= m.x + m.w && my >= m.y && my <= m.y + m.h) {
                const yc = m.y + m.h / 2;
                this.ctx.fillStyle = fgcolor;
                this.ctx.fillRect(m.x + 4, yc - 2, m.w - 8, 4);
                let y1 = m.y + m.h;
                let str = m.method;
                while (str.length > 0) {
                    let pos = str.indexOf('。');
                    if (pos > maxlen || pos == -1 && str.length > maxlen) pos = maxlen;
                    if (pos == -1) {
                        const w =  this.ctx.measureText(str).width; // 文字列幅
                        this.ctx.fillStyle = bgcolor;
                        this.ctx.fillRect(this.xzero + 1, y1 + 1, w + 5, this.font_size + 4);
                        y1 += this.font_size + 1;
                        this.ctx.fillStyle = fgcolor;
                        this.ctx.fillText(str, this.xzero + 3, y1);
                        break;
                    }
                    const str_0 = str.substring(0, pos+1);
                    const w =  this.ctx.measureText(str_0).width; // 文字列幅
                    this.ctx.fillStyle = bgcolor;
                    this.ctx.fillRect(this.xzero + 1, y1 + 1, w + 5, this.font_size + 4);
                    y1 += this.font_size + 1;
                    this.ctx.fillStyle = fgcolor;
                    this.ctx.fillText(str_0, this.xzero + 3, y1);
                    str = str.substring(pos+1);
                }
                break;
            }
        }
    }

    get_max_name_width_(dataset) {  // 最大名前長さ取得
        let max_w = 0;
        for (let i = 0; i < dataset.length; i++) {
            const w = this.ctx.measureText(dataset[i].name).width; // 文字列幅
            if (w > max_w) max_w = w;
        }
        return max_w;
    }

    draw_month_(data_num) {     // 月描画
        if (this.month_bgcolor != null) {
            this.ctx.fillStyle = this.month_bgcolor;
            const x0 = this.xzero;
            this.ctx.fillRect (this.xzero + 1, this.padding + 1, 36 * this.xstep - 2, this.ystep - 1);
        }
        this.ctx.fillStyle = 'black'
        this.draw_line_(this.padding, this.padding, this.canvas_width - this.padding, this.padding, this.border_color, this.border_width);  // 横線描画
        this.draw_line_(this.padding, this.padding, this.padding, this.padding + this.ystep, this.border_color, this.border_width); // 縦線描画
        for (let month = 1; month <= 12; month++) {
            const x0 = this.xzero + (month - 1) * 3 * this.xstep;
            this.draw_line_(x0, this.padding, x0, this.padding + this.ystep, this.border_color, this.border_width); // 縦線
            const mstr = String(month);
            const metrics = this.ctx.measureText(mstr); // 文字列長さ
            const ox = (this.xstep * 3 - metrics.width) / 2;
            const oy = this.padding + this.ystep / 2 + this.font_size / 2;
            this.ctx.fillText(mstr, x0 + ox, oy); // 月
        }
        const xlimit = this.xzero + 36 * this.xstep;
        this.draw_line_(xlimit - 1, this.padding, xlimit - 1, this.padding + this.ystep, this.border_color, this.border_width); // 縦線描画
    }

    draw_name_(ypos, yheight, bgcolor, color, namestr) {    // 名前描画
        if (bgcolor != null && bgcolor !== undefined) {
            this.ctx.fillStyle = bgcolor;
            this.ctx.fillRect(this.padding, ypos + 1, this.label_width, yheight - 1);
        }
        this.draw_line_(this.padding, ypos, this.padding, ypos + yheight, this.border_color, this.border_width); // 縦線
        const metrics = this.ctx.measureText(namestr);
        const ox = this.padding + (this.label_width - metrics.width) / 2;
        const oy = yheight / 2 + this.font_size / 2;
        this.ctx.fillStyle = color;
        this.ctx.fillText(namestr, ox, ypos + oy);
    }

    get_period_(periodstring) {     // 期間取得
        const days = { 'a':0, 'b':1, 'c':2 }; // 上旬, 中旬, 下旬
        const period = periodstring.split('-');
        let start_days = days[period[0].slice(-1)];
        const start = start_days === undefined ? (+period[0] - 1) * 3 : (+period[0].slice(0,-1) - 1) * 3 + start_days;
        let end_days = days[period[1].slice(-1)];
        const end = end_days === undefined ? +period[1] * 3 : (+period[1].slice(0,-1) - 1) * 3 + end_days + 1;
        return { start, end };  // 開始日, 終了日翌日
    }

    draw_period_(ypos, yoffset, color, start, end, method) {    // 期間描画
        if (color === undefined) return;
        let y = ypos + this.ystep / 4;
        if (yoffset == 1) y += this.ystep / 2;
        let h = this.ystep / 2;
        const xstart = start * this.xstep;  // start: 開始日
        const xend = end * this.xstep;      // end: 終了日翌日
        const x = this.xzero + xstart + 1;
        const yc = y + h / 2;
        if (start < end) {
            const w = xend - xstart - 2;
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, w, h);
            if (method != undefined) {
                this.click_method.push({ x:x, y:y, w:w, h:h, method:method });
                this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
                this.ctx.fillRect(x + 4, yc - 2, w - 8, 4);
            }
        } else {    // 年またぎ
            const xlimit = 36 * this.xstep;
            const w1 = xlimit - xstart - 2;
            const x2 = this.xzero + 1;
            const w2 = xend - 2;
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, w1, h);
            this.ctx.fillRect(x2, y, w2, h);
            if (method != undefined) {
                this.click_method.push({ x:x, y:y, w:w1, h:h, method:method });
                this.click_method.push({ x:x2, y:y, w:w2, h:h, method:method });
                this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
                this.ctx.fillRect(x + 4, yc - 2, w1 - 8, 4);
                this.ctx.fillRect(x2 + 4, yc - 2, w2 - 8, 4);
            }
        }
    }

    draw_status_(ypos, yheight, color, opacity){    // 状態色描画
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = color;
        this.ctx.fillRect (this.padding + 1, ypos + 1, this.label_width + 36 * this.xstep - 2, yheight - 1);
        this.ctx.globalAlpha = 1;
    }

    draw_legend_(ypos) { // 凡例描画
        const color_width = 30;
        const color_height = this.ystep * 3 / 5;
        let ox = this.padding * 2;
        ypos += this.padding + 2;
        let max_width = 100;
        for (let key in this.act_color) {
            this.ctx.fillStyle = this.act_color[key];
            this.ctx.fillRect (ox, ypos + 1, color_width, color_height + 1);
            this.ctx.fillStyle = 'black';
            const metrics = this.ctx.measureText(key);
            if (metrics.width > max_width) max_width = metrics.width;
            const xplus = color_width + this.padding / 2;
            ox += xplus;
            const oy = color_height / 2 + this.font_size / 2;
            this.ctx.fillText(key, ox, ypos + oy);
            ox += metrics.width + this.padding + 2;
            if (ox > this.canvas_width - (max_width + xplus + this.padding + 2)) {
                ox = this.padding * 2;
                ypos += color_height + this.padding;
            }
        }
        if (this.today_color != null) { // 今日
            ox += this.padding / 2;
            this.draw_line_(ox, ypos, ox, ypos + color_height, this.today_color, this.today_width); // 縦線
            ox += this.padding / 2;
            const oy = color_height / 2 + this.font_size / 2;
            this.ctx.fillText("今日", ox, ypos + oy);
        }
    }

    draw_today_(ypos, yheight, color, width) {  // 今日描画
        const today = new Date();
        const m0 = today.getMonth();   // 0-11
        const d = today.getDate();    // 0-31
        const x = this.xzero + ((m0 * 3 + d / 10) * this.xstep);
        this.ctx.setLineDash([10, 10]);
        this.draw_line_(x, ypos, x, ypos + yheight, color, width); // 縦線
        this.ctx.setLineDash([]);
    }

    draw_line_(sx, sy, ex, ey, color, width) {  // 線描画
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(ex, ey);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}
