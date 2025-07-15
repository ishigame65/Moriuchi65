/*
	====================================================
	Project Name    : 栽培地図クラス（栽培ライブラリ）
	File Name       : CultivationMap.js
	Encoding        : UTF-8
	Creation Date   : 2025/06/15
	Author's email	: moriuchi@ymail.ne.jp

	Copyright © 2025 moriuchi. All rights reserved.
	====================================================
 */

// 栽培地図クラス
class CultivationMap {

    constructor(elem_name) {
        // 描画準備
        this.canvas = document.getElementById(elem_name);
        this.canvas_width = this.canvas.clientWidth;
        this.canvas_height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        this.dead_pat = new Image();
        this.dead_pat.src = './img/pluspat1.png';   // 非栽培パターンマーク
        this.dead_color = {};
        this.dead_area_set = [];
        this.plant_color = {};
        this.plant_area_set = [];
        this.direction = new Image();
        this.direction.src = './img/direction1.png';

        // デフォルト値設定
        this.area_w = 100;
        this.area_h = 100;
        this.basic_font = "12px 'MS P Gothic'";
        this.set_direction(null, 0, 0);
    }

    // 栽培エリアサイズ設定
    set_size(w, h) {
        this.area_w = w;
        this.area_h = h;
    }
    
    // 周囲余白指定
    set_margin(margin_str) {
        this.canvas.style.margin = margin_str;
    }

    // 非栽培色設定
    set_dead_color(dead_name, color) {
        this.dead_color[dead_name] = color;
    }

    // 非栽培区画設定
    add_dead(dead_name, x, y, w, h) {
        this.dead_area_set.push( { dead_name, x, y, w, h} );
    }

    // 作物色設定（今はCultivationPlantsオブジェクトをset_plantしているため未使用）
    set_plant_color(plant_name, color) {
        this.plant_color[plant_name] = color;
    }

    // 作物設定（色）
    set_plants(plants) {
        for (let [key, value] of Object.entries(plants.get_colors())) {
            this.plant_color[key] = value;
        }
    }

    // 基本フォント設定（オプション）
    set_basic_font(font) {
        this.basic_font = font;        
    }

    // 作物区画設定
    add_plant(plant_name, x, y, w, h) {
        this.plant_area_set.push( { plant_name, x, y, w, h } );
    }

    // 作物区画設定（個別フォント指定有）
    add_plant_font(plant_name, x, y, w, h, font) {
        this.plant_area_set.push( { plant_name, x, y, w, h, font } );
    }

    draw() { // 描画
        // 非栽培エリア
        for (let i = 0; i < this.dead_area_set.length; i++) {
            const dead = this.dead_area_set[i];
            this.draw_dead_(dead, this.dead_color[dead.dead_name]);
        }

        // 作物エリア
        for (let i = 0; i < this.plant_area_set.length; i++) {
            const plant = this.plant_area_set[i];
            this.draw_plant_(plant, this.plant_color[plant.plant_name]);
        }

        // 方角
        if (this.ang != null) {
            this.draw_direction_(this.ang, this.ang_x, this.ang_y);
        }

        // 外枠
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(0, 0, this.canvas_width, this.canvas_height);
    }

    draw_dead_(area, color) {
        const {x, y, w, h} = this.get_rect_(area);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
        const pattern = this.ctx.createPattern(this.dead_pat, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(x, y, w, h);
    }

    set_font_(font) {
        this.ctx.font = font;
        this.font_size = parseInt(font.match(/(\d+)px/)[1]);   // 正則表現でpxを抽出して数値に変換
    }

    draw_plant_(plant, color) {
        this.ctx.fillStyle = color;
        const {x, y, w, h} = this.get_rect_(plant);
        this.ctx.fillRect(x, y, w, h);
        if (plant.font == undefined) this.set_font_(this.basic_font);
        else if (plant.font == 'noname') return;    // 栽培植物名非表示
        else this.set_font_(plant.font);
        this.ctx.fillStyle = 'black';
        const metrics = this.ctx.measureText(plant.plant_name);
        const padding = 2;
        if (w > metrics.width + padding) {
            const ox = x + (w - metrics.width ) / 2;
            const oy = y + (h + this.font_size) / 2;
            this.ctx.fillText(plant.plant_name, ox, oy);
        } else {    // 2列表示
            const str = plant.plant_name;
            const mid = Math.ceil(str.length / 2);  // 切り上げ（必須）
            const str1 = str.slice(0, mid);
            const str2 = str.slice(mid);
            const met1 = this.ctx.measureText(str1);
            const ox = x + (w - met1.width ) / 2;
            const oy1 = y + h / 4 + this.font_size / 2;
            const oy2 = y + h * 3 / 4 + this.font_size / 2;
            this.ctx.fillText(str1, ox, oy1);
            this.ctx.fillText(str2, ox, oy2);
        }
    }

    get_rect_(area) {
        const xratio = this.canvas_width / this.area_w;
        const yratio = this.canvas_height / this.area_h;
        const x = area.x * xratio;
        const y = area.y * yratio;
        const w = area.w * xratio;
        const h = area.h * yratio;
        return { x, y, w, h };
    }

    // 方角設定
    set_direction(ang, x, y) {
        this.ang = ang;
        this.ang_x = x;
        this.ang_y = y;
    }

    // 方角描画
    draw_direction_(ang, x, y) {
        const half = 25;
        this.ctx.save();
        this.ctx.translate(half + x, half + y);
        this.ctx.rotate(ang * Math.PI / 180);   // ラジアン
        this.ctx.translate(-half, -half);
        this.ctx.drawImage(this.direction, 0, 0);
        this.ctx.restore();
    }
}
