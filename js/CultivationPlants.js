/*
	====================================================
	Project Name    : 栽培植物クラス（栽培ライブラリ）
	File Name       : CultivationPlants.js
	Encoding        : UTF-8
	Creation Date   : 2025/06/22
	Author's email	: moriuchi@ymail.ne.jp

	Copyright © 2025 moriuchi. All rights reserved.
	====================================================
 */

// 栽培植物クラス
class CultivationPlants {
    constructor() {
        this.plant_color = {};
    }

    // 植物色設定
    set_color(plant_name, color) {
        this.plant_color[plant_name] = color;
    }

    // 植物色取得
    get_colors() {
        return this.plant_color;
    }
}
