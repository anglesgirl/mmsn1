//-----------------------------------------------------------------------------
//  Galv's New Game Plus
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_NewGamePlus.js
//-----------------------------------------------------------------------------
//  2016-06-26 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_NewGamePlus = true;

var Galv = Galv || {};            // Galv's main object
Galv.NEWGP = Galv.NEWGP || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Start a new game while keeping things from a previous playthrough.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Command Text
 * @desc Text displayed in title command window when a saved file is able to do New Game Plus
 * @default New Game+
 *
 * @param Help Text
 * @desc Text displayed in top help box when selecting a save file to use for a New Game Plus
 * @default Select a save file to start a New Game+
 *
 * @param Active Icon
 * @desc Icon that appears in the save file list if a game is activated to use new game plus
 * @default 245
 *
 * @param Active Icon XY
 * @desc Position of the active icon in the save file list
 * x,y
 * @default 40,40
 *
 * @param NGP Icon
 * @desc Icon that appears in the save file list if a game is a New Game+ game
 * @default 190
 *
 * @param NGP Icon XY
 * @desc Position of the New Game+ icon in the save file list
 * @default 0,40
 *
 * @param --------------
 * @desc
 * @default
 *
 * @param Max Gold
 * @desc The max amount of gold player can keep from the save game. -1 to keep all of it.
 * @default -1
 *
 * @param Actor List
 * @desc Comma separated variables that will keep in new game+
 * Use a variable ID for single or a dash to separate a range.
 * @default
 *
 * @param --------------
 * @desc
 * @default
 *
 * @param Variable Type
 * @desc 0 = Only variables in the variable list
 * 1 = All variables excluding the variable list
 * @default 0
 *
 * @param Variable List
 * @desc Comma separated variables that will keep in new game+
 * Use a variable ID for single or a dash to separate a range.
 * @default
 *
 * @param Switch Type
 * @desc 0 = Only switches in the switch list
 * 1 = All switches excluding the switch list
 * @default 0
 *
 * @param Switch List
 * @desc Comma separated switches that will keep in new game+
 * Use a switch ID for single or a dash to separate a range.
 * @default
 *
 * @param Item Type
 * @desc 0 = Only items in the item list
 * 1 = All items excluding the item list
 * @default 0
 *
 * @param Item List
 * @desc Comma separated item ids that will keep in new game+
 * Use an item ID for single or a dash to separate a range.
 * @default
 *
 * @param Weapon Type
 * @desc 0 = Only weapons in the weapon list
 * 1 = All weapons excluding the weapon list
 * @default 0
 *
 * @param Weapon List
 * @desc Comma separated weapon ids that will keep in new game+
 * Use a weapon ID for single or a dash to separate a range.
 * @default
 *
 * @param Armor Type
 * @desc 0 = Only armors in the armor list
 * 1 = All armors excluding the armor list
 * @default 0
 *
 * @param Armor List
 * @desc Comma separated armor ids that will keep in new game+
 * Use an armor ID for single or a dash to separate a range.
 * @default
 *
 * @help
 *   Galv's New Game Plus
 * ----------------------------------------------------------------------------
 * This plugin creates a "New Game Plus" system, which allows the player to
 * replay the game using certain things from their previous playthrough.
 *
 * ----------------------------------------------------------------------------
 * HOW IS WORKS
 * ----------------------------------------------------------------------------
 * During the game, when the player gets to a point where you'd like for them
 * to be able to use their save data for a New Game+ (usually done when the
 * player completes the game), use a SCRIPT event command with:
 *
 *     Galv.NEWGP.activate();
 *
 * This activates the ability to New Game+ in the current playthrough. The
 * player will need to then save their game after this script call.
 *
 * Ths next time the player is on the title screen if any saved games have been
 * activated with the script call above, the "New Game+" option will appear.
 * This will take the player to the save file list where the player will be
 * able to choose from the saved games that have been activated, which will
 * have an icon on them as specified in the "Icon" plugin setting.
 *
 * When a new game+ is started, the data specified in the plugin settings will
 * be transferred into the game from the chosen saved file.
 *
 * ----------------------------------------------------------------------------
 * PLUGIN SETTINGS
 * ----------------------------------------------------------------------------
 * Variables
 * ---------
 * The variable list setting along with the Variable Type setting control which
 * variables are transferred from the save file to the new game+.
 *
 * Example Variable List:
 * 34,56,90            // a list of 3 variables
 * 1-20,60-80          // a list of variables between ranges 1-20 and 60-80
 * 1-20,60-80,56,90    // a list of variables between ranges plus 2 variables
 *
 * Example Variable Type:
 * 0  // Only variables in the variable list are transferred over
 * 1  // All variables transferred over excluding those in the variable list
 *
 * Switches
 * --------
 * All switches start as OFF by default in Rpg Maker when you start a new game.
 * Switches work in the same way as above using the Switch List and the
 * Switch Type plugin settings to control which switches are transferred over.
 *
 * Actors
 * ------
 * The actors setting again works as above to keep actor save file actor data.
 * However, actors do not have the "type" setting - the list contains ids of
 * all actors that you want to keep from the save file.
 *
 * Remember, though, that when you have a "Change Party Member" event command
 * during your game, if you tick "Initialize" box when adding an actor to party,
 * then it will revert that character to starting level.
 *
 * Items / Weapons / Armors
 * ------------------------
 * These settings also work like Variables (above) using the item's ID in the
 * lists as desired.
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT CALLS
 * ----------------------------------------------------------------------------
 *
 *     Galv.NEWGP.activate();   // activates the game's New Game+ capability
 *                              // (player needs to save after this)
 *
 * ----------------------------------------------------------------------------
 *   CONDITIONAL BRANCH - SCRIPT:
 * ----------------------------------------------------------------------------
 *
 *     Galv.NEWGP.isReplay()       // if player is playing a new game+ game
 *     Galv.NEWGP.isReplay(x)      // if it's new new game+ playthrough x
 *     Galv.NEWGP.isReplay(a,b)    // if it's a playthrough between a and b
 *
 *     Galv.NEWGP.isActive()       // if new game+ is active in current game
 *
 * ----------------------------------------------------------------------------
 *   CONTROL VARIABLES - SCRIPT
 * ----------------------------------------------------------------------------
 *
 *    $gameSystem.newGamePlus   // returns the amount of times New Game+ has
 *                              // been used for the currently played file
 */
/*:ja
 * @plugindesc いわゆる「強くてニューゲーム」の機能を追加できます
 *
 * @author Galv - galvs-scripts.com
 *
 * @param Command Text
 * @text コマンドテキスト
 * @desc 保存されたファイルが強くてニューゲームを実行できる場合、タイトルコマンドウィンドウに表示されるテキスト
 * @default 強くてニューゲーム
 *
 * @param Help Text
 * @text ヘルプテキスト
 * @desc 強くてニューゲームに使用する保存ファイルを選択する時、上部のヘルプボックスに表示されるテキスト
 * @default 保存ファイルを選択して、強くてニューゲームを開始します
 *
 * @param Active Icon
 * @text 有効化アイコン
 * @desc 強くてニューゲームが有効化された場合、保存ファイルリストに表示されるアイコン
 * @default 245
 *
 * @param Active Icon XY
 * @text 有効化アイコンXY
 * @desc 保存ファイルリスト内の有効なアイコンの位置
 * x,y
 * @default 40,40
 *
 * @param NGP Icon
 * @text  強くてニューゲームアイコン
 * @desc ゲームが強くてニューゲームの場合、保存ファイルリストに表示されるアイコン
 * @default 190
 *
 * @param NGP Icon XY
 * @text  強くてニューゲームアイコンXY
 * @desc 保存ファイルリスト内の強くてニューゲームアイコンの位置
 * @default 0,40
 *
 * @param --------------
 * @text  --------------
 * @desc
 * @default
 *
 * @param Max Gold
 * @text  最大所持金
 * @desc 所持金の最大量はセーブゲームから除外できます。 -1で全てを保持します。
 * @default -1
 *
 * @param Actor List
 * @text アクターリスト
 * @desc 強くてニューゲームで引き継ぐアクターID
 * ID同士は,区切り。範囲はID-ID
 * @default
 *
 * @param --------------
 * @text  --------------
 * @desc
 * @default
 *
 * @param Variable Type
 * @text 変数タイプ
 * @type select
 * @option 変数リスト内の変数のみ
 * @value 0
 * @option 変数リストを除く全ての変数
 * @value 1
 * @desc 0:変数リスト内の変数のみ
 * 1:変数リストを除く全ての変数
 * @default 0
 *
 * @param Variable List
 * @text 変数リスト
 * @desc 強くてニューゲームで引き継ぐ変数ID
 * ID同士は,区切り。範囲はID-ID
 * @default
 *
 * @param Switch Type
 * @text スイッチタイプ
 * @type select
 * @option スイッチリスト内のスイッチのみ
 * @value 0
 * @option スイッチリストを除く全てのスイッチ
 * @value 1
 * @desc 0:スイッチリスト内のスイッチのみ
 * 1:スイッチリストを除く全てのスイッチ
 * @default 0
 *
 * @param Switch List
 * @text スイッチリスト
 * @desc 強くてニューゲームで引き継ぐスイッチ
 * ID同士は,区切り。範囲はID-ID
 * @default
 *
 * @param Item Type
 * @text アイテムタイプ
 * @type select
 * @option アイテムリスト内のアイテムのみ
 * @value 0
 * @option アイテムリストを除く全てのアイテム
 * @value 1
 * @desc 0:アイテムリスト内のアイテムのみ
 * 1:アイテムリストを除く全てのアイテム
 * @default 0
 *
 * @param Item List
 * @text アイテムリスト
 * @desc 強くてニューゲームで引き継ぐアイテムID
 * ID同士は,区切り。範囲はID-ID
 * @default
 *
 * @param Weapon Type
 * @text 武器タイプ
 * @type select
 * @option 武器リストにある武器のみ
 * @value 0
 * @option 武器リストを除く全ての武器
 * @value 1
 * @desc 0:武器リストにある武器のみ
 * 1:武器リストを除く全ての武器
 * @default 0
 *
 * @param Weapon List
 * @text 武器リスト
 * @desc 強くてニューゲームで引き継ぐ武器ID
 * ID同士は,区切り。範囲はID-ID
 * @default
 *
 * @param Armor Type
 * @text 防具タイプ
 * @type select
 * @option 防具リストの防具のみ
 * @value 0
 * @option 防具リストを除く全ての防具
 * @value 1
 * @desc 0:防具リストの防具のみ
 * 1:防具リストを除く全ての防具
 * @default 0
 *
 * @param Armor List
 * @text 防具リスト
 * @desc 強くてニューゲームで引き継ぐ防具ID
 * ID同士は,区切り。範囲はID-ID
 * @default
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * https://galvs-scripts.com/2016/06/26/mv-new-game-plus/
 *
 *   Galv's New Game Plus
 * ---------------------------------------------------------------------------
 * このプラグインは、
 * '強くてニューゲーム'システムを作成します。
 * プレーヤーはそれまでのプレイ状況の特定のものを引き継いでプレイできます。
 *
 * ---------------------------------------------------------------------------
 * 仕組み
 * ---------------------------------------------------------------------------
 * プレイヤーが強くてニューゲームにセーブデータを使用できるようにしたい場合
 * (通常、プレイヤーがゲームを完了した時、行われます)、
 * 下記のイベントコマンドSCRIPTを使用します。
 *
 *     Galv.NEWGP.activate();
 *
 * 実行時のプレイ状況で強くてニューゲームの機能が有効になります。
 * プレイヤーは、このスクリプトコールの後、ゲームを保存する必要があります。
 *
 * 上記のスクリプトコールで保存されたゲームが有効になっている場合、
 * 次にプレイヤーがタイトル画面にいると、
 * '強くてニューゲーム'オプションが表示されます。
 * プレーヤーは保存されたファイルリストに移動し、
 * そこで有効化された保存ファイルから選択できます。
 * これには、[アイコン]プラグインパラメーターで指定されたアイコンがあります。
 *
 * 強くてニューゲームが開始されると、
 * プラグインパラメーターで指定されたデータが、
 * 選択した保存ファイルから引き継がれます。
 *
 * ---------------------------------------------------------------------------
 * プラグインパラメーター
 * ---------------------------------------------------------------------------
 * 変数
 * ---------
 * 変数リストと変数タイプは、
 * 保存するファイルから強くてニューゲームに引き継ぐ変数を制御します。
 *
 * 変数リストの例
 * 34,56,90            // 3つの変数のリスト
 * 1-20,60-80          // 範囲1から20と範囲60から80の変数のリスト
 * 1-20,60-80,56,90    // 範囲2つと2つの変数のリスト
 *
 * 範囲間の変数と2つの変数のリスト変数タイプの例：
 * 0  // 変数リスト内の変数のみが転送されます
 * 1  // 変数リストにあるものを除き、全ての変数が転送されます
 *
 * スイッチ
 * --------
 * RPGツクールMVでは、強くてニューゲームを開始すると、
 * 全てのスイッチがデフォルトでオフとして起動します。
 * スイッチは、上記と同じように動作します。
 * スイッチリストとスイッチタイプを使用して、
 * どのスイッチを引き継ぐかを制御します。
 *
 * アクター
 * ------
 * アクターも上記のように機能し、
 * アクターはファイルアクターデータを保存し続けます。
 * ただし、アクターには'タイプ'がありません。
 * リストには、保存ファイルから引き継ぐ全てのアクターのIDが含まれます。
 *
 * ただし、ゲーム中に'メンバーの入れ替え'イベントコマンドがある場合、
 * パーティにアクターを追加する時、'初期化'ボックスにチェックが入っていると、
 * そのキャラクターは開始レベルに戻ります。
 *
 * アイテム/武器/防具
 * ------------------------
 * これらの設定は、必要に応じてリスト内のアイテムのIDを使用して、
 * 変数(上記)と同様に機能します。
 *
 * ---------------------------------------------------------------------------
 *   スクリプトコール
 * ---------------------------------------------------------------------------
 *
 *     Galv.NEWGP.activate();
 *       // ゲームの強くてニューゲーム機能を有効にします
 *       // (プレーヤーはこの後に保存する必要があります)
 *
 * ---------------------------------------------------------------------------
 *   条件分岐 - スクリプト
 * ---------------------------------------------------------------------------
 *
 *     Galv.NEWGP.isReplay()
 *       // プレイヤーが強くてニューゲームをプレイしている場合
 *     Galv.NEWGP.isReplay(x)
 *       // 新しい強くてニューゲームプレイ状況xの場合
 *     Galv.NEWGP.isReplay(a,b)
 *       // aとbの間のプレイ状況である場合
 *
 *     Galv.NEWGP.isActive()
 *       // 現在のゲームで強くてニューゲームが有効な場合
 *
 * ---------------------------------------------------------------------------
 *   変数の操作 - スクリプト
 * ---------------------------------------------------------------------------
 *
 *    $gameSystem.newGamePlus
 *      // 現在プレイされているファイルに対して
 *      // 強くてニューゲームが使用された回数を返します
 */
//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.NEWGP.newGameTxt = PluginManager.parameters('Galv_NewGamePlus')["Command Text"];
Galv.NEWGP.helpTxt = PluginManager.parameters('Galv_NewGamePlus')["Help Text"];
Galv.NEWGP.icon = Number(PluginManager.parameters('Galv_NewGamePlus')["Active Icon"]);
Galv.NEWGP.iconNGP = Number(PluginManager.parameters('Galv_NewGamePlus')["NGP Icon"]);
Galv.NEWGP.maxGold = Number(PluginManager.parameters('Galv_NewGamePlus')["Max Gold"]);

var txt = PluginManager.parameters('Galv_NewGamePlus')["Active Icon XY"].split(",");
Galv.NEWGP.iconXY = [Number(txt[0]),Number(txt[1])];

var txt = PluginManager.parameters('Galv_NewGamePlus')["NGP Icon XY"].split(",");
Galv.NEWGP.iconNGPXY = [Number(txt[0]),Number(txt[1])];


Galv.NEWGP.sortNumber = function(a,b) {
    return a - b;
};

Galv.NEWGP.makeList = function(string) {
	var list = string.split(",");
	var finalList = {'ids':[], 'ranges':[]};
	
	for (var i = 0; i < list.length; i++) {
		var number = Number(list[i]);
		if (isNaN(list[i])) {
			// create range
			var range = list[i].split("-");
			range = [Number(range[0]),Number(range[1])];
			range.sort(Galv.NEWGP.sortNumber);
			finalList.ranges.push(range);
		} else {
			// Add number
			finalList.ids.push(number);
		};
	}
	return finalList;
};


Galv.NEWGP.varType = Number(PluginManager.parameters('Galv_NewGamePlus')["Variable Type"]);
Galv.NEWGP.varList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Variable List"]);

Galv.NEWGP.swiType = Number(PluginManager.parameters('Galv_NewGamePlus')["Switch Type"]);
Galv.NEWGP.swiList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Switch List"]);

Galv.NEWGP.itemType = Number(PluginManager.parameters('Galv_NewGamePlus')["Item Type"]);
Galv.NEWGP.itemList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Item List"]);

Galv.NEWGP.weaponType = Number(PluginManager.parameters('Galv_NewGamePlus')["Weapon Type"]);
Galv.NEWGP.weaponList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Weapon List"]);

Galv.NEWGP.armorType = Number(PluginManager.parameters('Galv_NewGamePlus')["Armor Type"]);
Galv.NEWGP.armorList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Armor List"]);

Galv.NEWGP.actorList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Actor List"]);


Galv.NEWGP.activate = function() {
	$gameSystem.gameCompleted = true;
};

Galv.NEWGP.buildFinishedSaveList = function() {
	Galv.NEWGP.games = false;
	var count = DataManager.maxSavefiles();
	
	for (var i = 0; i < count; i++) {
		var valid = DataManager.isThisGameFile(i + 1);
		if (valid) {
			var game = DataManager.buildNewGamePlusData(i + 1);
			if (game.System.gameCompleted) {
				Galv.NEWGP.games = Galv.NEWGP.games || {};
				Galv.NEWGP.games[i + 1] = game;
			};
		};
	};
};

Galv.NEWGP.setupNewGamePlus = function() {
	var game = Galv.NEWGP.newGameSaveFile;
	
	// GAME SYSTEM
	$gameSystem = game.System;             // Duplicate Game System
	$gameSystem.newGamePlus += 1;          // Increase new game plus number
	$gameSystem.gameCompleted = false;     // Remove completed.
	Galv.NEWGP.newGameSaveFile = 0;
	
	// GAME PARTY
	var maxGold = Galv.NEWGP.maxGold < 0 ? game.Party._gold : Galv.NEWGP.maxGold;
	$gameParty._gold = Math.min(game.Party._gold,maxGold);
	
	// GAME VARIABLES
	this.setVariables(game);
	
	// GAME SWITCHES
	this.setSwitches(game);

	// GAME ACTORS
	this.setActors(game);
	
	// GAME ITEMS
	this.setItems(game,'item');
	this.setItems(game,'weapon');
	this.setItems(game,'armor');

};

// GAME VARIABLES
Galv.NEWGP.setVariables = function(game) {
	if (Galv.NEWGP.varType == 0) { // Only transfer List
		for (var i = 0; i < Galv.NEWGP.varList.ids.length; i++) {    // constants
			$gameVariables._data[Galv.NEWGP.varList.ids[i]] = game.Variables._data[Galv.NEWGP.varList.ids[i]];
		};
		for (var i = 0; i < Galv.NEWGP.varList.ranges.length; i++) { // ranges
			var range = Galv.NEWGP.varList.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameVariables._data[r] = game.Variables._data[r];
			};
		};
	} else if (Galv.NEWGP.varType == 1) { // Transfer all EXCEPT list
		// change ALL variables
		$gameVariables = game.Variables;
		
		// then set excluded variables back to 0
		for (var i = 0; i < Galv.NEWGP.varList.ids.length; i++) {    // constants
			$gameVariables._data[Galv.NEWGP.varList.ids[i]] = 0;
		};
		for (var i = 0; i < Galv.NEWGP.varList.ranges.length; i++) { // ranges
			var range = Galv.NEWGP.varList.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameVariables._data[r] = 0;
			};
		};
	};
};

// GAME SWITCHES
Galv.NEWGP.setSwitches = function(game) {
	if (Galv.NEWGP.swiType == 0) { // Only transfer List
		for (var i = 0; i < Galv.NEWGP.swiList.ids.length; i++) {    // constants
			// change all constant variables
			$gameSwitches._data[Galv.NEWGP.swiList.ids[i]] = game.Switches._data[Galv.NEWGP.swiList.ids[i]];
		};
		for (var i = 0; i < Galv.NEWGP.swiList.ranges.length; i++) { // ranages
			var range = Galv.NEWGP.swiList.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameSwitches._data[r] = game.Switches._data[r];
			};
		};
	} else if (Galv.NEWGP.swiType == 1) { // Transfer all EXCEPT list
		// change ALL variables
		$gameSwitches = game.Switches;
		
		// then set excluded variables back to 0
		for (var i = 0; i < Galv.NEWGP.swiList.ids.length; i++) {    // constants
			$gameSwitches._data[Galv.NEWGP.swiList.ids[i]] = false;
		};
		for (var i = 0; i < Galv.NEWGP.swiList.ranges.length; i++) { // ranges
			var range = Galv.NEWGP.swiList.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameSwitches._data[r] = false;
			};
		};
	};
};

// GAME ACTORS
Galv.NEWGP.setActors = function(game) {
	for (var i = 0; i < Galv.NEWGP.actorList.ids.length; i++) {    // constants
		$gameActors._data[Galv.NEWGP.actorList.ids[i]] = game.Actors._data[Galv.NEWGP.actorList.ids[i]];
	};
	for (var i = 0; i < Galv.NEWGP.actorList.ranges.length; i++) { // ranges
		var range = Galv.NEWGP.actorList.ranges[i];
		for (var r = range[0]; r <= range[1]; r++) {
			$gameActors._data[r] = game.Actors._data[r];
		};
	};
};


// GAME ITEMS / WEAPONS / ARMORS
Galv.NEWGP.setItems = function(game, iType) {
	var type = Galv.NEWGP[iType + 'Type'];
	var list = Galv.NEWGP[iType + 'List'];
	
	switch (iType) {
		case 'item':
			var itemBox = '_items';
			var itemData = $dataItems;
			break;
		case 'weapon':
			var itemBox = '_weapons';
			var itemData = $dataWeapons;
			break;
		case 'armor':
			var itemBox = '_armors';
			var itemData = $dataArmors;
			break;
	};
	
	if (type == 0) { // Only transfer List
		for (var i = 0; i < list.ids.length; i++) {    // constants
			var itemId = list.ids[i];
			var itemAmount = game.Party[itemBox][itemId];
			if (itemAmount) $gameParty.gainItem(itemData[itemId], itemAmount);
		};
		for (var i = 0; i < list.ranges.length; i++) { // ranges
			var range = list.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				var itemAmount = game.Party[itemBox][r];
				if (itemAmount) $gameParty.gainItem(itemData[r], itemAmount);
			};
		};
	} else if (type == 1) { // Transfer all EXCEPT list
		// change ALL items
		$gameParty[itemBox] = game.Party[itemBox];
		
		// then set excluded variables back to 0
		for (var i = 0; i < list.ids.length; i++) {    // constants
			var itemId = list.ids[i];
			if (itemAmount) $gameParty.gainItem(itemData[itemId], -game.Party[itemBox][itemId]);
		};
		for (var i = 0; i < list.ranges.length; i++) { // ranges
			var range = list.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameParty.gainItem(itemData[r], -game.Party[itemBox][r]);
			};
		};
	};
};



Galv.NEWGP.isActive = function() {
	return $gameSystem.gameCompleted;
};

Galv.NEWGP.isReplay = function(a,b) {
	if (!a && !b) {
		return $gameSystem.newGamePlus > 0;
	} else if (!b) {
		return $gameSystem.newGamePlus == b;
	} else {
		if (b < 0) {
			// infinite
			return $gameSystem.newGamePlus > a;
		} else {
			var array = [a,b];
			array.sort(Galv.NEWGP.sortNumber);
			return ($gameSystem.newGamePlus > array[0] && $gameSystem.newGamePlus < array[1]);
		};
	};
};


// DATA MANAGER
//-----------------------------------------------------------------------------

Galv.NEWGP.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
	Galv.NEWGP.DataManager_setupNewGame.call(this);
	if (Galv.NEWGP.newGameSaveFile) Galv.NEWGP.setupNewGamePlus();
};

DataManager.buildNewGamePlusData = function(savefileId) {
	var newGameData = {};
    var globalInfo = this.loadGlobalInfo();
    if (this.isThisGameFile(savefileId)) {
        var json = StorageManager.load(savefileId);
        newGameData = this.buildViewableSaveContents(JsonEx.parse(json));
        return newGameData;
    } else {
        return false;
    }
};

DataManager.buildViewableSaveContents = function(contents) {
	var obj = {};
    obj.System        = contents.system;
    obj.Switches      = contents.switches;
    obj.Variables     = contents.variables;
    obj.Actors        = contents.actors;
    obj.Party         = contents.party;
	return obj;
};

Galv.NEWGP.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
	var info = Galv.NEWGP.DataManager_makeSavefileInfo.call(this);
	info.newGamePlus = $gameSystem.newGamePlus;
	info.gameCompleted = $gameSystem.gameCompleted;
	return info;
};


// GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.NEWGP.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.NEWGP.Game_System_initialize.call(this);
	this.newGamePlus = 0;  // Number of times game has been new game plussed
	this.gameCompleted = false;  //
};


// SCENE TITLE
//-----------------------------------------------------------------------------

Galv.NEWGP.Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
	Galv.NEWGP.buildFinishedSaveList();
	Galv.NEWGP.newGameSaveFile = 0;
	Galv.NEWGP.Scene_Title_create.call(this);
	this._commandWindow.setHandler('newGamePlus',  this.commandNewGamePlus.bind(this));
};

Scene_Title.prototype.commandNewGamePlus = function() {
	this._commandWindow.close();
    SceneManager.push(Scene_LoadNGPlus);
};


// WINDOW TITLE COMMAND
//-----------------------------------------------------------------------------

Galv.NEWGP.Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    if (Galv.NEWGP.games) this.addCommand(Galv.NEWGP.newGameTxt, 'newGamePlus'); // Show command if any save file is "completed"
    Galv.NEWGP.Window_TitleCommand_makeCommandList.call(this);
};


// WINDOW SAVE FILE LIST
//-----------------------------------------------------------------------------

Galv.NEWGP.Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
	Galv.NEWGP.Window_SavefileList_drawContents.call(this,info,rect,valid);
	this.drawNewGamePlus(info,rect.x,rect.y,rect.width);
};

Window_SavefileList.prototype.drawNewGamePlus = function(info, x, y, width) {
	if (info.gameCompleted) {
		// completed game icon
		this.drawIcon(Galv.NEWGP.icon,x + Galv.NEWGP.iconXY[0],y + Galv.NEWGP.iconXY[1]);
	}
	var NGPnumber = info.newGamePlus ? info.newGamePlus : 0;
	if (NGPnumber > 0) {
		// new game plus icon
		this.drawIcon(Galv.NEWGP.iconNGP,x + Galv.NEWGP.iconNGPXY[0],y + Galv.NEWGP.iconNGPXY[1]);
		// draw number
		if (NGPnumber > 1) {
			this.contents.fontSize = 16;
			this.drawText(NGPnumber,x + Galv.NEWGP.iconNGPXY[0] + 3,y + Galv.NEWGP.iconNGPXY[1] + 10,Window_Base._iconWidth,'right');
			this.resetFontSettings();
		};
	}
};

})();


// Scene_LoadNGPlus
//-----------------------------------------------------------------------------

function Scene_LoadNGPlus() {
    this.initialize.apply(this, arguments);
}

Scene_LoadNGPlus.prototype = Object.create(Scene_File.prototype);
Scene_LoadNGPlus.prototype.constructor = Scene_LoadNGPlus;

Scene_LoadNGPlus.prototype.helpWindowText = function() {
    return Galv.NEWGP.helpTxt;
};

Scene_LoadNGPlus.prototype.firstSavefileIndex = function() {
    return 0;
};

Scene_LoadNGPlus.prototype.onSavefileOk = function() {
	if (Galv.NEWGP.games[this._listWindow._index + 1]) {
		Galv.NEWGP.newGameSaveFile = Galv.NEWGP.games[this._listWindow._index + 1];
		SoundManager.playLoad();
		DataManager.setupNewGame();
		this.fadeOutAll();
		SceneManager.goto(Scene_Map);
	} else {
		SoundManager.playBuzzer();
		this.activateListWindow();
	};
};