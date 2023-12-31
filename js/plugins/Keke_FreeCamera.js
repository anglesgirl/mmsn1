//=============================================================================
//  Keke_FreeCamera - フリーカメラ
// バージョン: 1.0.1
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc カメラを自由に操作する
 * @author ケケー
 * 
 * @help
 * 【ver.1.0.0】
 * カメラを自由自在に操作する。ズーム・移動・注視など
 *
 * ◉ 特徴 ◉
 *
 * ■自由自在なカメラ操作
 * ◎なめらかで縦横無尽なカメラワーク
 * ◎好きなキャラを注視・追尾
 * ◎メッセージ制御文字でも操作可能
 * ◎指定のキャラをズーム時サイズ固定にする『ズーム除外』
 *
 * ■カメラの維持
 * ◎シーン変更・データロードしてもカメラの状態を維持
 * ◎シーンを切り替えてもカメラの動きが途切れない
 * 
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * 【基本1】カメラを操作する
 * => プラグインコマンド → カメラ操作
 * ◎ズーム倍率・ずらしX・ずらしYは
 * 　「動作文字での動作制御」が可能
 * 　詳しくは後述
 * 　
 *
 * 【基本2】ズーム除外キャラを設定する
 * => プラグインコマンド → ズーム除外
 * ◎除外キャラはズームしてもサイズが変わらない
 * ◎除外拡大率を設定した場合はズーム時にサイズ補正される
 * 　2 なら 2倍、0.5 なら 0.5倍
 * ◎効果があるのはズームアウト(カメラを引いた)時のみ
 *
 *
 * 【基本1】「メッセージ中の制御文字」でのカメラ操作
 * メッセージ中に
 *  　\cm[注視キャラ名/ID, 動作時間, ズーム倍率, ずらしX, ずらしY]
 * ◎zm の部分はプラグインパラメータから変更できる
 * ◎キャラ名 => ***→イベント検索、セルフ→イベント自身、
 * 　プレイヤー→プレイヤー
 * ◎キャラID => 1〜→イベントID。0→イベント自身、-1→プレイヤー
 *
 *
 * 【応用1】マップ開始時にカメラ変更状態にする
 * => 各プラグインコマンドの『開始時に適用』を true にする
 *
 *
 * 【応用2】好きな地点を注視する
 * 　カメラ専用のイベントを作り、それを好きな地点に移動させて、注視する
 *
 *
 * 【応用3】動作文字での動作制御
 * 　ズーム倍率・ずらしX・ずらしYの末尾に
 *  e
 * 　イージング。ゆっくり始まってゆっくり終わる
 *  ei
 * 　イージングイン。ゆっくり始まる
 *  eo
 * 　イージングアウト。ゆっくり終わる
 *  tn
 * 　ターン。→←。進んで戻る
 *  cg
 * 　チャージ。←→→。少し戻ってから一気に進む。cg(**)で戻り幅が **倍
 *  fk
 * 　フック。→→←。一気に進んでから少し戻る。fk(**)で戻り幅が **倍
 *  cf
 * 　チャージフック。←→→←。チャージとフックの融合。cf(**)で戻り幅が **倍
 *  rd
 * 　ラウンド。→←←→。ぐるりと円を描く
 *  bk
 * 　バック。←。戻ってくる
 * &t
 * 　単位をタイルに変更(標準はピクセル)
 *  _回数
 * 　動作回数。_2 なら 2回繰り返す。_0 ならループ(次のカメラ操作まで繰り返す)
 * 例)
 * ズーム倍率　2e
 * 　ズーム倍率をイージングをかけながら 2倍 にする
 * ズーム倍率　2tn
 * 　ズーム倍率を 2倍 にして、元に戻す
 * ずらしX　100tn
 * 　右に 100ピクセル 進み、元の位置に戻る
 * ずらしX　2cg&t
 * 　右に 2タイル 進み、元の位置に戻る
 * ずらしX　2cg&t_2
 * 　右に 2タイル 進み、元の位置に戻る。それを2回繰り返す
 * ずらしX　2cg&t_2
 * 　右に 2タイル 進み、元の位置に戻る。それをループ
 *
 *
 * 【注釈】名前でのキャラ指定について
 * ◎語句を入力すると、
 * 　入力語句が名前+メモ欄に“含まれている”イベントを指定する
 * 　『zoom』なら、名前+メモ欄に zoom が含まれているイベント
 * ◎プレイヤー と入力すると プレイヤー を指定
 * ◎セルフ と入力すると、動作中のイベント自身 を指定
 * ◎フォロワー1 と入力すると 1番目 のフォロワーを指定。フォロワー2 なら 2番目
 * ◎乗り物1 と入力すると 1番目 の乗り物を指定。乗り物2 なら 2番目
 *
 *
 * 【注釈】IDでのキャラ指定について
 * ◎数値を入力すると、イベントIDがその値のイベントを指定する
 * 　5なら、ID 5 のイベント
 * ◎-1 を入力すると プレイヤー を指定
 * ◎0 を入力すると、動作中のイベント自身 を指定
 * ◎-11 を入力すると 1番目 のフォロワーを指定。-12 なら 2番目
 * ◎-101 を入力すると 1番目 の乗り物を指定。-101 なら 2番目
 * 　
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 *
 *
 * @param 基本ズーム率
 * @desc 基本のズーム拡大率
 * @default 1
 *
 * @param ピクチャ画面固定
 * @desc ピクチャに画面に固定し、ズームの影響を受けなくする(標準:true)
 * @type boolean
 * @default true
 *
 * @param 場所移動でカメラ初期化
 * @desc 場所移動時にカメラを初期化する(標準:true)
 * @type boolean
 * @default true
 *
 * @param カメラ制御文字
 * @desc カメラ操作をするメッセージ制御文字。cm なら \cm[注視キャラID/名前, ズーム倍率, 動作時間, ずらしX, ずらしY]
 * @default cm
 *
 *
 *
 *
 *
 * @command カメラ操作
 * @desc  カメラをズーム・注視・移動する
 *
 * @arg 開始時に適用
 * @desc シーン開始時に自動的に実行する
 * @type boolean
 * @default false
 *
  * @arg 注視キャラ-名前
 * @desc 名前で注視キャラを指定。***→イベント検索、セルフ→イベント自身、プレイヤー、フォロワー、乗り物
 *
 * @arg 注視キャラ-ID
 * @desc IDで注視キャラを指定。1〜→イベントID。0→イベント自身、-1→プレイヤー、-11〜→フォロワー、-101〜→乗り物
 *
 * @arg 動作時間
 * @desc カメラ動作時間。5 なら 5フレーム 、5s なら 5秒 かけて実行。_2 付きで 2回 実行、_0 でループ実行。w 付きでウェイト
 *
 * @arg ズーム倍率
 * @desc 目標とするズーム倍率。2 なら 2倍 カメラが対象に近づく。空欄時 1。演算可。動作文字対応
 *
 * @arg ずらしX
 * @desc 注視地点からのXずらし幅。5 なら 5ピクセル 右へ。空欄時 0。演算可。動作文字対応
 *
 * @arg ずらしY
 * @desc 注視地点からのYずらし幅。5 なら 5ピクセル 下へ。空欄時 0。演算可。動作文字対応
 *
 *
 *
 *
 * @command ズーム除外
 * @desc  ズーム時に大きさが変わらないキャラを設定する
 *
 * @arg 開始時に適用
 * @desc シーン開始時に自動的に実行する
 * @type boolean
 * @default false
 *
  * @arg 除外クリア
 * @desc 全てのキャラの除外設定を解除する
 * @type boolean
 * @default false
 *
 * @arg 対象キャラ-名前
 * @desc 名前で対象キャラを指定。***→イベント検索、セルフ→イベント自身、プレイヤー→プレイヤー、全て→全キャラ。, で複数選択
 *
 * @arg 対象キャラ-ID
 * @desc IDで対象キャラを指定。。1〜→イベントID。0→イベント自身、-1→プレイヤー、-2→全キャラ。 , で複数選択、~ でまとめて選択
 *
 * @arg 除外時拡大率
 * @desc ズーム除外時の拡大率。空欄時 1。演算可
 * @default 
 */
 
 
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    
    
    //--  パラメータ受け取り  --//
    
    
    const parameters = PluginManager.parameters(pluginName);
    
    const keke_zoomScaleBase = Number(parameters["基本ズーム率"]);
    const keke_pictureScreenFix = eval(parameters["ピクチャ画面固定"]);
    const keke_initCameraInLocate = eval(parameters["場所移動でカメラ初期化"]);
    const keke_controlCharCamera = parameters["カメラ制御文字"] ? parameters["カメラ制御文字"].toUpperCase() : "";
    
    
    
    

    //--  プラグインコマンド  --//
    
    
    //- カメラ操作
    PluginManager.registerCommand(pluginName, "カメラ操作", args => {
        const self = getPlcmEvent();
        // 注視対象を取得
        let chara = [...getCharasByName(args["注視キャラ-名前"], self), ...getCharasById(args["注視キャラ-ID"], self)][0];
        if (!chara && (args["注視マップX"] || args["注視マップY"])) {
            chara = { _realX:args["注視地点X"] || 0, _realY:args["注視地点Y"] || 0 }
        }
        $gameTemp.callZoomKe(chara, args["動作時間"], args["ズーム倍率"], args["ずらしX"], args["ずらしY"], plcmPreter);
    });
    
    
    //- ズーム除外
    PluginManager.registerCommand(pluginName, "ズーム除外", args => {
        if (eval(args["クリア"])) {
            getAllCharacter.forEach(chara => chara ? chara._zoomNoKe = null : 0);
        }
        const self = getPlcmEvent();
        const charas = [...getCharasByName(args["対象キャラ-名前"], self), ...getCharasById(args["対象キャラ-ID"], self)];
        charas.forEach(chara => {
            if (!chara) { return; }
            chara._zoomNoKe = args["除外時拡大率"] ? calcMulti(chara._zoomNoKe || 1, args["除外時拡大率"])[0].val : chara._zoomNoKe || 1;
        });
    });
    
    
    
     
    
    //--  共通開始  --//
    
    //- スプライトセット・マップ開始(コア追加)
    const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        // ズームのロード
        loadZoom();
        _Spriteset_Map_initialize.call(this);
    };
    
    
    //- シーンマップ・スタート(コア追加)
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _Scene_Map_start.apply(this);
        // ズームの再開
        restartZoom();
    };
    
    
     //- ゲームマップ・セットアップ(コア追加)
    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        // カメラの初期化
        initCamera();
        _Game_Map_setup.apply(this, arguments);
    };
    
    
    //- スプライトキャラクター
    let charaSpritePlcm = null;
    const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character) {
        _Sprite_Character_initialize.call(this, character);
        // 開始時プラグインコマンドの実行
        if (character._eventId && !character._pcStartedKeFrcm && character._pageIndex >= 0) {
            charaSpritePlcm = this;
            runPluginCmdStarting(character.list(), [/ズーム除外/, /カメラ操作/], "開始時に適用");
            charaSpritePlcm = null;
            character._pcStartedKeFrcm = true;
        }
    };
    
    
    
    
    
    
    
    
    //--  共通更新  --//
    
    
    //- スプライトキャラクター更新(コア追加)
    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _Sprite_Character_update.apply(this);
        // ズーム除外の更新
        updateZoomNo(this);
    };
    
    
    
    
    
    //--  共通終了  --//
    
    
    
    
    
    
    
    //--  ズームの実行  --//
    
    
    let noZoomSave = false;
    let doScaleLoop = false;
    let doXLoop = false;
    let doYLoop = false;
    
    
    //- カメラの初期化
    function initCamera() {
        if (keke_initCameraInLocate) { $gameMap._zoomInitedKe = false; }
        // 注視の初期化
        initFocus();
        if ($gameMap._zoomInitedKe) { return; }
        // カメラパラムのセット
        setCameraParam($gamePlayer, keke_zoomScaleBase.toString(), "0", "0");
        // ズームの起動
        runZoom();
        $gameMap._zoomInitedKe = true;
    };
    
    
    //- 注視の初期化
    function initFocus() {
        const p = getCameraParam();
        if (!p) { return; }
        p.chara = $gamePlayer;
        p.preChara = null;
    };
    
    
    //- ズームの呼び出し(公開)
    Game_Temp.prototype.callZoomKe = function(chara, duration, scale, offsetX, offsetY, preter) {
        // ズームの終了
        finishZoom();
        // カメラパラムのセット
        setCameraParam(chara, scale, offsetX, offsetY, duration, preter);
        // ズームの起動
        runZoom();
    };
    
    
    //- ズームの終了
    function finishZoom() {
        const p = getCameraParam();
        if (!p || !p.duration) { return; }
        const gs = $gameScreen;
        p.duration = 0;
        p.scaleDuration = 0;
        p.xDuration = 0;
        p.yDuration = 0;
        gs._zoomScale = p.scaleEasing.match(/tn|rd|bk/i) ? p.scaleStart : p.scaleTarget;
        p.x = p.xEasing.match(/tn|rd|bk/i) ? p.xStart || p.xTarget : p.xTarget;
        p.y = p.yEasing.match(/tn|rd|bk/i) ? p.yStart || p.yTarget : p.yTarget;
        p.allNum = 0;
        // ズーム変更の更新
        updateZoomChange(true);
    };
    
    
    //- カメラパラムのセット
    function setCameraParam(chara, scale, x, y, duration, preter) {
        const gs = $gameScreen;
        if (!gs._zoomParamKe) { gs._zoomParamKe = {}; }
        const p = gs._zoomParamKe;
        // 注視キャラ
        const preChara = p.chara || $gamePlayer;
        p.chara = chara || preChara;
        p.preChara = !isSameChara(preChara, p.chara) ? preChara : null;
        p.transX = null;
        p.transY = null;
        // 時間
        duration = duration || "0";
        const wait = duration.match(/w/i);
        let match = duration.match(/_(\d+)/);
        p.allNum = match ? Number(match[1]) : 1;
        p.allNum = !p.allNum ? -1 : p.allNum;
        p.timeMax = Number(duration.match(/(\d+)/)[0]);
        p.duration = p.timeMax;
        // 動作中ウェイト
        if (wait && p.timeMax > 0) { preter.wait(p.timeMax); }
        // 拡大率
        const bs = keke_zoomScaleBase;
        const preScale = gs.zoomScale() || 1;
        let r = scale ? calcMulti(p.scale || bs, scale)[0] : { val:p.scale || bs };
        scale = r.val;
        p.scaleEasing = r.easing || "E";
        p.scaleEasingRate = r.easingRate || 1;
        p.scaleNum = r.num || 1;
        p.scaleTimeMax = p.duration / p.scaleNum;
        p.scaleDuration = p.scaleTimeMax;
        p.scale = duration ? preScale : scale || p.scale || bs;
        p.scaleTarget = scale || preScale || bs;
        p.scaleStart = preScale != p.scaleTarget ? preScale : null;
        // ずらしX
        p.x = !p.x ? 0 : p.x;
        const preX = p.x || 0;
        r = x ? calcMulti(preX, x, null, [])[0] : { val:preX };
        p.xEasing = r.easing || "E";
        p.xEasingRate = r.easingRate || 1;
        p.xNum = r.num || 1;
        p.xTimeMax = p.duration / p.xNum
        p.xDuration = p.xTimeMax;
        p.xTarget = r.val;
        p.xStart = preX != p.xTarget ? preX : null;
        // ずらしY
        p.y = !p.y ? 0 : p.y;
        const preY = p.y || 0;
        r = y ? calcMulti(preY, y, null, [])[0] : { val:preY };
        p.yEasing = r.easing || "E";
        p.yEasingRate = r.easingRate || 1;
        p.yNum = r.num || 1;
        p.yTimeMax = p.duration / p.yNum;
        p.yDuration = p.yTimeMax;
        p.yTarget = r.val;
        p.yStart = preY != p.yTarget ? preY : null;
    };
    
    
    //- カメラパラムの取得
    function getCameraParam() {
        return $gameScreen._zoomParamKe;
    };
    
    
    //- ズームの起動
    function runZoom() {
        const p = getCameraParam();
        if (!p) { return; }
        // 少しずつズーム
        if (p.duration) {
            $gameScreen.startZoom(0, 0, p.scaleTarget, p.duration);
        // 即ズーム
        } else {
            $gameScreen.setZoom(0, 0, p.scaleTarget);
            setCameraOffset(p.xTarget, p.yTarget);
            // ズーム変更の更新
            updateZoomChange(true);
        }
    };
    
    
    //- カメラずらしのセット
    function setCameraOffset(x, y) {
        const p = getCameraParam();
        p.x = x;
        p.y = y;
    };
    
    
    //- ズームのセット(コア追加)
    const _Game_Screen_setZoom = Game_Screen.prototype.setZoom;
    Game_Screen.prototype.setZoom = function(x, y, scale) {
        _Game_Screen_setZoom.apply(this, arguments);
        // ズーム変更の更新
        updateZoomChange(true);
    };
    
    
    //- ズームの更新(コア追加)
    const _Game_Screen_updateZoom = Game_Screen.prototype.updateZoom;
    Game_Screen.prototype.updateZoom = function() {
        if (!this._zoomDuration) { return; }
        // ズームスケールの更新
        const did = updateZoomScale(this);
        // 通常の更新
        if (!did) { _Game_Screen_updateZoom.apply(this); }
        // ズーム変更の更新
        updateZoomChange();
    };
    
    
    //- ズーム変更の更新
    function updateZoomChange(force) {
        const p = getCameraParam();
        if (!force && (!p || !p.duration)){ return; }
        if (p.duration) { p.duration -= 1; }
        // ズームパラムの更新
        updateZoomParam(p);
        // 注視の更新
        updateFocus(p);
        // カメラずらしの更新
        updateCameraOffset(p);
        // マップの拡大
        scaleMap(p);
        // 遠景の拡大
        if (!$gameScreen._noZoomSaveKe) { scaleParallax(p); }
        // ループの処理
        processLoop(p);
    };
    
    
    //- ループの処理
    function processLoop(p) {
        const gs = $gameScreen;
        // 全体
        if (p.duration <= 0) {
            if (p.allNum > 0) { p.allNum--; }
            if (p.allNum) {
                $gameScreen._zoomDuration = p.timeMax;
                p.duration = p.timeMax;
            }
        }
        // 拡大率
        if (doScaleLoop) {
            p.scaleDuration = p.scaleTimeMax;
            gs._zoomScale = p.scaleStart;
            p.scale = p.scaleStart;
            doScaleLoop = false;
        }
        // Xずらし
        if (doXLoop) {
            p.xDuration = p.xTimeMax;
            p.x = p.xStart;
            doXLoop = false;
        }
        // Yずらし
        if (doYLoop) {
            p.yDuration = p.yTimeMax;
            p.y = p.yStart;
            doYLoop = false;
        }
    };
    
    
    //- ズームパラムの更新
    function updateZoomParam(p) {
        const saveNo = $gameScreen._noZoomSaveKe || SceneManager._scene.constructor.name != "Scene_Map";
        if (!saveNo) { p.scale = $gameScreen.zoomScale(); }
    };
    
    
    //- ズームスケールの更新
    function updateZoomScale(gs) {
        const p = getCameraParam();
        // スケールイージングの更新
        if (p && p.scaleStart != null && p.scaleEasing) {
            updateScaleEasing(gs, p);
            return true;
        }
        return false;
    };
    
    
    //- スケールイージングの更新
    function updateScaleEasing(gs, p) {
        if (gs._zoomDuration <= 0 || !p.scaleTimeMax) { return; }
        gs._zoomDuration--;
        p.scaleDuration--;
        gs._zoomScale = applyEasing(gs._zoomScale, p.scaleStart, gs._zoomScaleTarget, p.scaleDuration, p.scaleTimeMax, p.scaleEasing, p.scaleEasingRate);
        gs._zoomScale = Math.max(gs._zoomScale, 0.1);
        // 繰り返し処理
        if (!p.scaleDuration) {
            if (p.scaleNum > 0) { p.scaleNum--; }
            if (p.scaleNum || (p.allNum - 1) != 0) {
                doScaleLoop = true;
            }
        }
    };
    
    
    //- 注視の更新
    function updateFocus(p) {
        // カメラずらし量
        const gm = $gameMap;
        const offsetX = p.mapOutOkX ? 0 : p.x / gm.tileWidth();
        const offsetY = p.mapOutOkY ? 0 : p.y / gm.tileHeight();
        // 移行注視
        if (p.preChara && p.timeMax) {
            transfarFocus(p, offsetX, offsetY);
        // 注視
        } else {
            const gm = $gameMap;
            p.chara.center(p.chara._realX + offsetX, p.chara._realY + offsetY);
        }
    };
    
    
    //- 移行注視
    function transfarFocus(p, offsetX, offsetY) {
        const cx = $gamePlayer.centerX();
        const cy = $gamePlayer.centerY();
        const newX = p.chara._realX - cx;
        const preX = p.preChara._realX - cx;
        const volX = preX - newX;
        p.transX = newX + (Math.sin(Math.PI * (p.duration / p.timeMax + 1.5)) * volX + volX) / 2;
        const newY = p.chara._realY - cy;
        const preY = p.preChara._realY - cy;
        const volY = preY - newY;
        p.transY = newY + (Math.sin(Math.PI * (p.duration / p.timeMax + 1.5)) * volY + volY) / 2;
        const gm = $gameMap;
        $gameMap.setDisplayPos(p.transX + offsetX, p.transY + offsetY);
    };
    
    
    //- カメラずらしの更新
    function updateCameraOffset(p) {
        if (!p || !p.timeMax) { return; }      
        const gs = $gameScreen;
        // Xずらし
        if (p.xStart != null) {
            p.xDuration--;
            if (p.xEasing) {
                p.x = applyEasing(p.x, p.xStart, p.xTarget, p.xDuration, p.xTimeMax, p.xEasing, p.xEasingRate);
            } else {
                p.x = p.xStart + (p.xStart - p.x) * p.duration / p.timeMax;
            }
            // 繰り返し処理
            if (!p.xDuration) {
                if (p.xNum > 0) { p.xNum--; }
                if (p.xNum || (p.allNum - 1) != 0) {
                    doXLoop = true;
                }
            }
        }
        // Yずらし
        if (p.yStart != null) {
            p.yDuration--;
            if (p.yEasing) {
                p.y = applyEasing(p.y, p.yStart, p.yTarget, p.yDuration, p.yTimeMax, p.yEasing, p.yEasingRate);
            } else {
                p.y = p.yStart + (p.yStart - p.y) * p.duration / p.timeMax;
            }
            // 繰り返し処理
            if (!p.yDuration) {
                if (p.yNum) { p.yNum--; }
                if (p.yNum || (p.allNum - 1) != 0) {
                    doYLoop = true;
                }
            }
        }
    };
    
    
    
    
    
    //--  各グラフィックのズーム対応  --//
    
    
    //- カメラずらしの適用(コア追加)
    const _Spriteset_Base_updatePosition = Spriteset_Base.prototype.updatePosition;
    Spriteset_Base.prototype.updatePosition = function() {
        _Spriteset_Base_updatePosition.apply(this);
        const p = getCameraParam();
        if (p) {
            this.x += p.mapOutOkX ? p.x : 0;
            this.y += p.mapOutOkY ? p.y : 0;
        }
    };
    
    
    //- マップの拡大
    function scaleMap(p) {
        const spriteset = SceneManager._scene._spriteset;
        if (!spriteset || !spriteset._tilemap.parent) { return; }
        const scale = $gameScreen.zoomScale();
        const x = xOffsetMax(p);
        const y = yOffsetMax(p);
        spriteset._tilemap.width = Math.ceil((Graphics.width / scale) * 2) + spriteset._tilemap._margin * 2 ;
        spriteset._tilemap.height = Math.ceil((Graphics.height / scale) * 2) + spriteset._tilemap._margin * 2 ;
        spriteset._tilemap.refresh();
    };
    
    
    //- 遠景の拡大
    function scaleParallax(p) {
        const spriteset = SceneManager._scene._spriteset;
        if (!spriteset || !spriteset._parallax) { return; }
        const scale = $gameScreen.zoomScale();
        const x = xOffsetMax(p) / scale * 1.5;
        const y = yOffsetMax(p) / scale * 1.5;
        spriteset._parallax.move(0, 0, Graphics.width / scale * 2, Graphics.height / scale * 2);
    };
    
    
    // Xずらし最大値
    function xOffsetMax(p) {
        return Math.max(Math.abs(p.xTarget || 0), Math.abs(p.x || 0), Math.abs(p.xStart || 0))
    };
    
    
    // Yずらし最大値
    function yOffsetMax(p) {
        return Math.max(Math.abs(p.yTarget || 0), Math.abs(p.y || 0), Math.abs(p.yStart || 0))
    };
    
    
    //- 画面タイル数のズーム対応(コア追加)
    const _Game_Map_screenTileX = Game_Map.prototype.screenTileX;
    Game_Map.prototype.screenTileX = function () {
        if ($gameScreen.zoomScale() != 1) {
            return Graphics.width / (this.tileWidth() * $gameScreen.zoomScale());
        }
        return _Game_Map_screenTileX.apply(this);
    };
    
    const _Game_Map_screenTileY = Game_Map.prototype.screenTileY;
    Game_Map.prototype.screenTileY = function () {
        if ($gameScreen.zoomScale() != 1) {
            return Graphics.height / (this.tileHeight() * $gameScreen.zoomScale());
        }
        return _Game_Map_screenTileY.apply(this);
    };
    
    
    //- 画面座標→マップ座標のズーム対応(コア追加)
    const _Game_Map_canvasToMapX = Game_Map.prototype.canvasToMapX;
    Game_Map.prototype.canvasToMapX = function (x) {
        if ($gameScreen.zoomScale() != 1) {
            const tileWidth = this.tileWidth() * $gameScreen.zoomScale();
            const originX = this._displayX * tileWidth;
            const mapX = Math.floor((originX + x) / tileWidth);
            return this.roundX(mapX);
        }
        return _Game_Map_canvasToMapX.apply(this, arguments);
    };
    
    const _Game_Map_canvasToMapY = Game_Map.prototype.canvasToMapY;
    Game_Map.prototype.canvasToMapY = function (y) {
        if ($gameScreen.zoomScale() != 1) {
            const tileHeight = this.tileHeight() * $gameScreen.zoomScale();
            const originY = this._displayY * tileHeight;
            const mapY = Math.floor((originY + y) / tileHeight);
            return this.roundY(mapY);
        }
        return _Game_Map_canvasToMapY.apply(this, arguments);
    };
        
        
    //- ゲームキャラクターのセンター化関数を追加
    Game_Character.prototype.centerX = function () {
        return ($gameMap.screenTileX() - 1) / 2.0;
    };

    Game_Character.prototype.centerY = function () {
        return ($gameMap.screenTileY() - 1) / 2.0;
    };
    
    Game_Character.prototype.center = function (x, y) {
        return $gameMap.setDisplayPos(x - this.centerX(), y - this.centerY());
    };
    
    
    //- 天候の拡大(コア再定義)
    Weather.prototype._rebornSprite = function(sprite) {
        const zoomScale = $gameScreen.zoomScale();
        sprite.ax = Math.randomInt(Graphics.width / zoomScale + 100) - 100 + this.origin.x;
        sprite.ay = Math.randomInt(Graphics.height / zoomScale + 200) - 200 + this.origin.y;
        sprite.opacity = 160 + Math.randomInt(60);
    };
    
    
    //- ピクチャの画面固定(コア追加)
    const _Sprite_Picture_updatePosition = Sprite_Picture.prototype.updatePosition;
    Sprite_Picture.prototype.updatePosition = function() {
        _Sprite_Picture_updatePosition.apply(this);
        // ズーム画面固定値の取得
        const zoomOffset = getZoomScreenFix(this);
        this.x += zoomOffset.x;
        this.y += zoomOffset.y;
    };
    
    const _Sprite_Picture_updateScale = Sprite_Picture.prototype.updateScale;
    Sprite_Picture.prototype.updateScale = function() {
        _Sprite_Picture_updateScale.apply(this);
        if (!keke_pictureScreenFix) { return; }
        const scale = $gameScreen.zoomScale();
        this.scale.x /= scale;
        this.scale.y /= scale;
    };
    
    
    //- ズーム画面固定値の取得
    function getZoomScreenFix(sprite) {
        const gs = $gameScreen;
        const p = gs._zoomParamKe;
        const rate = 1 / gs.zoomScale();
        const offsetX = (sprite.x - gs.zoomX()) * (rate - 1) - (p ? p.x : 0) * rate;
        const offsetY = (sprite.y - gs.zoomY()) * (rate - 1) - (p ? p.y : 0) * rate;
        return { x:offsetX, y:offsetY };
    };
    
    
    //- タイマーの画面固定
    const _Sprite_Timer_updatePosition = Sprite_Timer.prototype.updatePosition;
    Sprite_Timer.prototype.updatePosition = function () {
        _Sprite_Timer_updatePosition.apply(this);
        const scale = $gameScreen.zoomScale();
        this.x /= scale;
        this.y /= scale;
        this.scale.x = 1 / scale;
        this.scale.y = 1 / scale;
    };
    
    
    //- エンカウントエフェクト(コア再定義)
    Scene_Map.prototype.updateEncounterEffect = function() {
        if (this._encounterEffectDuration > 0) {
            if (this._encounterEffectDuration == this.encounterEffectSpeed()) { $gameScreen._noZoomSaveKe = true; }
            this._encounterEffectDuration--;
            const speed = this.encounterEffectSpeed();
            const n = speed - this._encounterEffectDuration;
            const p = n / speed;
            const q = ((p - 1) * 20 * p + 5) * p + 1;
            const pr = getCameraParam();
            const zoomX = pr ? pr.x : $gamePlayer.screenX();
            const zoomY = pr ? pr.y : $gamePlayer.screenY() - 24;
            const zoomScale = pr ? pr.scale : 1;
            if (n === 2) {
                $gameScreen.setZoom(zoomX, zoomY, zoomScale);
                this.snapForBattleBackground();
                this.startFlashForEncounter(speed / 2);
            }
            $gameScreen.setZoom(zoomX, zoomY, q * zoomScale);
            if (n === Math.floor(speed / 6)) {
                this.startFlashForEncounter(speed / 2);
            }
            if (n === Math.floor(speed / 2)) {
                BattleManager.playBattleBgm();
                this.startFadeOut(this.fadeSpeed());
            }
            if (!this._encounterEffectDuration) {
                $gameScreen._noZoomSaveKe = false;
            }
        }
    };
    
    
    
    
    
    //--  ズームの維持  --//
    
    
    //- ズームのロード
    function loadZoom() {
        p = getCameraParam();
        if (!p) { return; }
        $gameScreen.setZoom(0, 0, p.scale);
        setCameraOffset(p.x, p.y);
        if (p.chara) { p.chara = searchSameChara(p.chara); }
        if (p.preChara) { p.preChara = searchSameChara(p.preChara); }
    };
    
    
    //- ズームの再開
    function restartZoom() {
        p = getCameraParam();
        if (!p) { return; }
        if (p.duration) {
            const gs = $gameScreen;
            gs._zoomScaleTarget = p.scaleTarget;
            gs._zoomDuration = p.duration;
        }
        // ズーム変更の更新
        updateZoomChange(true);
    };
    
    
    
    
    
    //--  ズーム注視  --//
    
    
    //- プレイヤー注視の停止
    const _Game_Player_updateScroll = Game_Player.prototype.updateScroll;
    Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
        const p = getCameraParam();
        if (p && !isSameChara(p.chara, this)) { return; };
        _Game_Player_updateScroll.apply(this, arguments);
    };
    
    
    //- イベントの注視
    const _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        const lastScrolledX = this.scrolledX();
        const lastScrolledY = this.scrolledY();
        _Game_Event_update.apply(this);
        $gamePlayer.updateScroll.call(this, lastScrolledX, lastScrolledY);
    };
    
    
    //- フォロワーの注視
    const _Game_Follower_update = Game_Follower.prototype.update;
    Game_Follower.prototype.update = function() {
        const lastScrolledX = this.scrolledX();
        const lastScrolledY = this.scrolledY();
        _Game_Follower_update.apply(this);
        $gamePlayer.updateScroll.call(this, lastScrolledX, lastScrolledY);
    };
    
    
    //- 乗り物の注視
    const _Game_Vehicle_update = Game_Vehicle.prototype.update;
    Game_Vehicle.prototype.update = function() {
        const lastScrolledX = this.scrolledX();
        const lastScrolledY = this.scrolledY();
        _Game_Vehicle_update.apply(this);
        $gamePlayer.updateScroll.call(this, lastScrolledX, lastScrolledY);
    };
        
    
    
    
    
    //--  ズーム除外  --//
    
    
    //- ズーム除外の更新
    function updateZoomNo(sprite) {
        const chara = sprite._character;
        if (!chara || !chara._zoomNoKe) { return; }
        if (sprite._zoomRateKe) {
             sprite.scale.x /= sprite._zoomRateKe;
             sprite.scale.y /= sprite._zoomRateKe;
             sprite._zoomRateKe = null;
        }
        // スケール補正の取得
        const scale = $gameScreen.zoomScale();
        if (scale >= 1) { return; }
        sprite._zoomRateKe = (1 / scale) * chara._zoomNoKe;
        // 補正
        sprite.scale.x *= sprite._zoomRateKe;
        sprite.scale.y *= sprite._zoomRateKe;
    };
    
    
    
    
    
    //- 制御文字でのズーム
    
    
    msgPreter = null;
    
    
    //- 制御文字にカメラ操作を追加
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.apply(this, arguments);
        const regExp = /\n*\x1b([^\[]+)\[([^\]]*)\n*\]/g
        let dels = [];
        while (true) {
            const match = regExp.exec(text);
            if (!match || !match[1]) { break; }
            if (match[1].toUpperCase() == keke_controlCharCamera) {
                // カメラ操作
                callZoomByControlChar(match[2]);
                dels.push(match[0]);
            }
        }
        if (dels.length) { dels.forEach(del => text = text.replace(del, "")); }
        return text;
    };
    
    
    //- 制御文字からのカメラ呼び出し
    function callZoomByControlChar(param) {
        const args = param.replace(/\s/g, "").split(",");
        const chara = callTarget(args[0])[0];
        $gameTemp.callZoomKe(chara, args[1], args[2], args[3], args[4], msgPreter);
    };
    
    
    //- ターゲットの呼び出し
    function callTarget(tageStr, event, emptyNull) {
        const nul = emptyNull ? [null] : [event];
        if (!tageStr) { return nul; }
        // イベント番号でターゲット呼び出し
        if (tageStr.match(/^-?\d+\.?\d*(?!\w)/)) {
            const targets = getCharasById(tageStr, event);
            return targets.length ? targets : nul;
        // イベント名でターゲット呼び出し
        } else {
            const targets = getCharasByName(tageStr, event);
            return  targets.length ? targets : nul;
        }
    };
    
    
    //- メッセージ時にプリターを保存(コア追加)
    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        msgPreter = getEventInPreter(this)
        return _Game_Interpreter_command101.apply(this, arguments);
    };
    
    
    
    
    
    
    
    //--  計算基本 /ベーシック  --//
    
    
    //- マルチ演算
    function calcMulti(cur, tage, ori, cmds = []) {
        if (tage == null) { return [{}]; }
        const datas = [cur, tage.toString(), ori, cmds];
        cur = cur || 0;
        let tageStr = tage.toString();
        let tageLine = tageStr.split(",");
        tageLine = tageLine.map(v => v.replace(/\s/g, ""));
        let sols = [];
        tageLine.forEach((tages, i) => {
             const match = tages.match(/^(r*m*s*\/|)([\+\*\/\%←→↑↓]*)(\-*\d+\.*\d*)~*(\-*\d*\.*\d*)([\+\*\/\%←→↑↓]*)(tn|cg|fk|cf|rd|bk|ei|eo|er|e|)(\(?\-*\d*\.*\d*\)?)(&*b*j*d*c*t*o*)(\_*\-?\d*\.*\d*)$/i);
            if (!match) {
                sols.push({ val:tages, header:"", easing:"", easingRate:1, extra:"", num:0, datas:datas });
                return;
            }
            let val = 0;
            let rvs = 1;
            let header = "";
            let easing = "";
            let easingRate = 1;
            let extra = "";
            let num = 1;
            let rand = null;
            if (match[1]) {
                header = match[1].replace(/\//g, "");
                if (header.match(/r/i)) { rvs = -1; }
            }
            if (match[6]) {
                easing = match[6];
            }
            if (match[7]) {
                const mt = match[7].match(/\-*\d+\.*\d*/);
                easingRate = mt ? Number(mt[0]) : 1;
            }
            if (match[8]) {
                extra = match[8].replace(/&/g, "");
            }
            if (match[9]) {
                num = Number(match[9].replace(/\_/g, ""));
            }
            let calc = 0;
            if (match[4]) {
                const calcs = [Number(match[3]), Number(match[4])];
                calcs.sort((a, b) => a - b);
                calc = calcs[0] + Math.random() * (calcs[1] - calcs[0]);
            } else {
                calc = Number(match[3]);
            }
            const symbol = (match[2] || "") + (match[5] || "");
            if (symbol.includes("+")) {
                val = Number(cur) + calc * rvs;
            } else if (symbol.includes("*")) {
                val = Number(cur) * calc * rvs;
            } else if (symbol.includes("/")) {
                val = Number(cur) / calc * rvs;
            } else if (symbol.includes("%")) {
                val = Number(cur) % calc * rvs;
            } else if (symbol.includes("←")) {
                val = Number(cur) - calc * rvs;
            } else if (symbol.includes("→")) {
                val = Number(cur) + calc * rvs;
            } else if (symbol.includes("↑")) {
                val = Number(cur) - calc * rvs;
            } else if (symbol.includes("↓")) {
                val = Number(cur) + calc * rvs;
            } else {
                val = calc * rvs;
                if (ori) {
                    if (ori.toString().includes("*")) {
                        val *= Number(ori.replace(/\*/g, ""));
                    } else {
                        val += ori;
                    }
                }
            }
            cmds.forEach(cmd => {
                if (cmd.includes("+")) {
                    val += Number(cmd.replace(/\+/g, ""));
                } else if (cmd.includes("*")) {
                    val *= Number(cmd.replace(/\*/g, ""));
                } else if (cmd.includes("/")) {
                    val /= Number(cmd.replace(/\//g, ""));
                } else if (cmd.includes("%")) {
                    val %= Number(cmd.replace(/\%/g, ""));
                } else {
                    val = Number(cmd);
                }
            });
            sols.push({ val:val, header:header, easing:easing, easingRate:easingRate, extra:extra, num:num, datas:datas });
        });
        return sols;
    };
    
    
    //- 小数点を丸める
    function roundDecimal(val, rate) {
        const newVal = Math.floor(val* rate) / rate
        return newVal;
    };
    
    
    //- イージングの適用
    function applyEasing(current, start, target, duration, timeMax, easing, easingRate = 1) {
        // イージングの処理
        if (easing.match(/ei|eo|e/i)) {
            return processEasing(current, target, duration + 1, timeMax, easing, easingRate);
        }
        // カービング
        if (easing.match(/tn|cg|fk|cf|rd|bk/i)) {
            return processCurving(current, start, target, duration + 1, timeMax, easing, easingRate);
        }
    };
    
    
    //- イージングの処理
    function processEasing(current, target, duration, timeMax, easing, easingRate = 1) {
        const lt = calcEasing((timeMax - duration) / timeMax, easing, easingRate);
        const t = calcEasing((timeMax - duration + 1) / timeMax, easing, easingRate);
        const start = (current - target * lt) / (1 - lt);
        return start + (target - start) * t;
    };
    
    
    //- イージングの計算
    function calcEasing(t, easing, easingRate = 1) {
        const exponent = 2 * easingRate;
        switch (easing.toUpperCase()) {
            case "EI":
                return easeIn(t, exponent);
            case "EO":
                return easeOut(t, exponent);
            case "E":
                return easeInOut(t, exponent);
            default:
                return t;
        }
    };
    
    
    //- 各イージング処理
    function easeIn(t, exponent) {
        return Math.pow(t, exponent) || 0.001;
    };
    
    function easeOut(t, exponent) {;
        return 1 - (Math.pow(1 - t, exponent) || 0.001);
    };
    
    function easeInOut(t, exponent) {
        if (t < 0.5) {
            return easeIn(t * 2, exponent) / 2;
        } else {
            return easeOut(t * 2 - 1, exponent) / 2 + 0.5;
        }
    };
    
    
    //- カービングの処理
    function processCurving(current, start, target, duration, timeMax, easing, easingRate = 1) {
        // 0 の時の処理
        if (duration <= 0) { return easing.match(/tn|rd|bk/i) ? start : target; }
        let result = 0;
        // ターン
        if (easing.toUpperCase() == "TN") {
            result = processTurn(current, start, target, duration, timeMax, easingRate);
        // チャージ
        } else if (easing.toUpperCase() == "CG") {
            result = processCharge(current, start, target, duration, timeMax, easingRate);
        // フック
        } else if (easing.toUpperCase() == "FK") {
            result = processFook(current, start, target, duration, timeMax, easingRate);
        // チャージフック
        } else if (easing.toUpperCase() == "CF") {
            result = processChargeFook(current, start, target, duration, timeMax, easingRate);
        // ラウンド
        } else if (easing.toUpperCase() == "RD") {
            result = processRound(current, start, target, duration, timeMax, easingRate);
        // バック
        }  else if (easing.toUpperCase() == "BK") {
            result = processBack(current, start, target, duration, timeMax, easingRate);
        }
        return result;
    };
    
    
    //- ターンの処理
    function processTurn(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax / 2);
        const d2 = timeMax - d1;
        if (duration > d2) {
            result = processEasing(current, target, duration - d2, d1, "e", easingRate);
        } else {
            result = processEasing(current, start, duration, d2, "e", easingRate);
        }
        return result;
    };
    
    
    //- チャージの処理
    function processCharge(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax / 3);
        const d2 = timeMax - d1;
        if (duration > d2) {
            result = processEasing(current, start + (start - target) * easingRate, duration - d2, d1, "e");
        } else {
            result = processEasing(current, target, duration, d2, "e");
        }
        return result;
    };
    
    
    //- フックの処理
    function processFook(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax * 2 / 3);
        const d2 = timeMax - d1;
        if (duration > d2) {
            result = processEasing(current, target + (target - start) * easingRate, duration - d2, d1, "e");
        } else {
            result = processEasing(current, target, duration, d2, "e");
        }
        return result;
    };
    
    
    //- チャージフックの処理
    function processChargeFook(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax / 4);
        const d3 = Math.round(timeMax / 4);
        const d2 = timeMax - d1 - d3;
        if (duration > (d2 + d3)) {
            result = processEasing(current, start + (start - target) * easingRate, duration - d2 - d3, d1, "e");
        } else if (duration > d3) {
            result = processEasing(current, target + (target - start) * easingRate, duration - d3, d2, "e");
        } else {
            result = processEasing(current, target, duration, d3, "e");
        }
        return result;
    };
    
    
    //- ラウンドの処理
    function processRound(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax / 4);
        const d2 = Math.round(timeMax / 2);
        const d3 = timeMax - d1 - d2;
        if (duration > (d2 + d3)) {
            result = processEasing(current, target, duration - d2 - d3, d1, "eo", easingRate);
        } else if (duration > d3) {
            result = processEasing(current, start + (start - target), duration - d3, d2, "e", easingRate);
        } else {
            result = processEasing(current, start, duration, d3, "ei", easingRate);
        }
        return result;
    };
    
    
    //- バックの処理
    function processBack(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = 1;
        const d2 = timeMax - d1;
        if (duration > d2) {
            result = processEasing(current, target, duration - d2, d1, "e", easingRate);
        } else {
            result = processEasing(current, start, duration, d2, "e", easingRate);
        }
        return result;
    };
    
    
    
    
    
    //---  位置基本 /ベーシック  --//
    
    
    //- マス座標を画面座標へ-X
    function massToScreenX(x) {
        var tw = $gameMap.tileWidth();
        var scrolledX = $gameMap.adjustX(x)
        return Math.round(scrolledX * tw + tw / 2);
    };
    
    
     // マス座標を画面座標へ-Y
    function massToScreenY(y) {
        var th = $gameMap.tileHeight();
        var scrolledY = $gameMap.adjustY(y)
        return Math.round(scrolledY * th + th / 2);
    };
    
    
    //- ピクセルXへ
    function toPixelX(v) {
        return v * $gameMap.tileWidth();
    };
    
    
    //- ピクセルYへ
    function toPixelY(v) {
        return v * $gameMap.tileHeight();
    };
    
    
    //- タイルXへ
    function toTileX(v) {
        return v / $gameMap.tileWidth();
    };
    
    
    //- タイルYへ
    function toTileY(v) {
        return v / $gameMap.tileHeight();
    };
    
    
    
    
    
    //--  文字列基本 /ベーシック  --//
    
    
    // 文字列の数字リスト化
    function strToNumList(str) {
        const list = [];
        str = str.replace(/\[/g, "");
        str = str.replace(/\]/g, "");
        const strs = str.split(",");
        let s2 = null;
        for (let s of strs) {
            if (s.includes("~")) {
                s2 = s.split("~");
                s2 = s2.map(s => Number(s));
                if (s2[1] >= s2[0]) {
                    for (let i = s2[0]; i <= s2[1]; i++) { list.push(i); }
                } else {
                    for (let i = s2[1]; i <= s2[0]; i++) { list.push(i); }
                }
            } else {
                list.push(Number(s));
            }
        };
        return list;
    };
    
    
    
    
    
    //--  イベント基本 /ベーシック  --//
    
    
    //- インタープリターでのイベント取得
   function getEventInPreter(preter) {
        let result = null;
        // イベントIDが同じイベントを取得
        $gameMap.events().forEach(event => {
            if (event._eventId == preter._eventId) {
                result = event;
            }
        });
        return result;
    };
    
    
    
    
    
    //--  プラグインコマンド基本 /ベーシック  --//
    
    
    let plcmPreter = null;
    
    
    //- プラグインコマンド呼び出しプリターを保存
    const _PluginManager_callCommand = PluginManager.callCommand;
    PluginManager.callCommand = function(self, pluginName, commandName, args) {
        plcmPreter = self;
        _PluginManager_callCommand.call(this, self, pluginName, commandName, args);
        plcmPreter = null;
    };
    
    
    //- プラグインコマンド呼び出しイベントを取得
    function getPlcmEvent() {
        if (!plcmPreter) { return; }
        const preter = plcmPreter;
        return preter.character(preter.eventId());
    };
    
    
    //- 名前からのキャラリスト取得
    function getCharasByName(names, self) {
        if (!names) { return []; }
        const nameList = names.replace(/\s/g, "").split(",");
        let charas = [];
        let match = null;
        for (const name of nameList) {
            // イベントを取得
            $gameMap.events().forEach(event => {
                const note = event.event().name + " " + event.event().note;
                if (note.includes(name)) { charas.push(event); }
            }, this);
            // セルフを取得
            if (name.match(/^(セルフ|自分|自身|self)$/)) {
                self = self || getPlcmEvent() || charaSpritePlcm._character;
                if (self) { charas.push(self); }
            }
            // プレイヤーを取得
            if (name.match(/^(プレイヤー|操作キャラ|player)$/)) {
                charas = [...charas, $gamePlayer];
            }
            // フォロワーを取得
            match = name.match(/^(フォロワー|フォロアー|隊列|隊列キャラ|follower)(\d*)$/)
            if (match) {
                const id = match[2] ? Number(match[2]) - 1 : 0;
                charas = id ? [...charas, $gamePlayer._followers._data[id]] : [...charas, ...$gamePlayer._followers._data];
            }
            // パーティを取得
            if (name.match(/^(パーティ|味方|味方全員|味方全体|party)$/)) {
                charas = [...charas, $gamePlayer, ...$gamePlayer._followers._data];
            }
            // 乗り物を取得
            match = name.match(/^(乗り物|乗物|乗機|vehicle)(\d*)$/);
            if (match) {
                const id = match[2] ? Number(match[2]) - 1 : 0;
                charas = id ? [...charas, $gameMap._vehicles[id]] : [...charas, ...$gameMap._vehicles];
            }
            // 全て取得
            if (name.match(/^(全て|すべて|全部|全体|all)$/)) {
                charas = [...$gameMap.events(), $gamePlayer, ...$gamePlayer._followers._data, ...$gameMap._vehicles];
            }
            // 選択なし
            if (name.match(/^(なし|無し|none)$/)) {
            }
        }
        charas = charas.filter(chara => chara);
        return charas;
    };
    
    
    //- IDからのキャラリスト取得
    function getCharasById(ids, self) {
        if (!ids) { return []; }
        const idList = !ids ? [] : strToNumList(ids.toString());
        let charas = [];
        for (const id of idList) {
            // イベントを取得
            if (id > 0) { charas.push($gameMap.event(id)); }
            // セルフを取得
            if (id == 0) {
                self = self || getPlcmEvent() || charaSpritePlcm._character;
                if (self && !idList.includes(self._eventId)) { charas.push(self); }
            }
            // プレイヤーを取得
            if (id == -1) { charas = [...charas, $gamePlayer]; }
            // フォロワーを取得
            if (id <= -10 && id >= -99) {
                charas = id == -10 ? [...charas, ...$gamePlayer._followers._data] : [...charas, $gamePlayer._followers._data[Math.abs(id) - 11]];
            }
            // 乗り物を取得
            if (id <= -100) {
                charas = id == -100 ? [...charas, ...$gameMap._vehicles] : [...charas, $gameMap._vehicles[Math.abs(id) - 101]];
            }
            // 全て取得
            if (id == -2) {
                charas = [...$gameMap.events(), $gamePlayer, ...$gamePlayer._followers._data, ...$gameMap._vehicles];
            }
        }
        charas = charas.filter(chara => chara);
        return charas;
    };
    
    
    //- 全てのキャラを取得
    function getAllCharacter() {
        return  [...$gameMap.events(), $gamePlayer, ...$gamePlayer._followers._data, ...$gameMap._vehicles];
    };
    
    
    //- 同じキャラか
    function isSameChara(a, b) {
        if (!a) { return !b; }
        if (!b) { return !a; }
        if (a._eventId) {
            if (!b._eventId) { return false; }
            return a._eventId == b._eventId;
        }
        if (a._followers && b._followers) { return true; }
        if (a._memberIndex && a._memberIndex == b._memberIndex) { return true; }
        if (a._type && a._type == b._type) { return true; }
        return false;
    };
    
    
    //- 同じキャラを検索
    function searchSameChara(chara) {
        let same = null;
        for (let c of getAllCharacter()) {
            if (isSameChara(c, chara)) {
                same = c;
                break;
            }
        }
        return same;
    };
    
    
    
    
    
    //--  開始時プラグインコマンド /ベーシック  --//
    
    
    //- 開始時プラグインコマンドの実行
    function runPluginCmdStarting(list, regs = [], condition = "") {
        if (!list || !list.length) { return; }
        // 開始時用インタープリターを作成
        const startingIp = new Game_InterpreterStartingKeAcms();
        startingIp.setup(list, regs, condition);
        while (1) {
            if (!startingIp.executeCommand()) { break; }
        }
    };
    
    
    //- 対象のプラグインコマンドか
    function isCanPluginCmd(cmd, regs = [], condition = "") {
        if (cmd.code != 357) { return false; }
        let result = false;
        const params = cmd.parameters;
        const args = params[3];
        let condiOk = condition ? false : true;
        if (eval(args[condition])) { condiOk = true; }
        const regsOk = params[1] ? regs.filter(reg => params[1].match(reg)).length : false;
        if (regsOk && condiOk) { result = true; }
        return result;
    };
    
    
    //- 開始時用インタープリター
    function Game_InterpreterStartingKeAcms() {
        this.initialize(...arguments);
    }
    
    Game_InterpreterStartingKeAcms.prototype = Object.create(Game_Interpreter.prototype);
    Game_InterpreterStartingKeAcms.prototype.constructor = Game_InterpreterStartingKeAcms;
    
    
    //- セットアップ
    Game_InterpreterStartingKeAcms.prototype.setup = function(list, regs, condition) {
        Game_Interpreter.prototype.setup.call(this, list);
        this._regsKe = regs;
        this._conditionKe = condition;
    };
    
    
    //- コマンド実行
    Game_InterpreterStartingKeAcms.prototype.executeCommand = function() {
        const cmd = this.currentCommand();
        if (cmd) {
            this._indent = cmd.indent;
            // 対象のプラグインコマンドのみ実行
            if (this.canExecute(cmd)) {
                const methodName = "command" + cmd.code;
                if (typeof this[methodName] === "function") {
                    if (!this[methodName](cmd.parameters)) {
                        return false;
                    }
                }
            }
            this._index++;
        } else {
            return false;
        }
        return true;
    };
    
    
    //- コマンド実行するか
    Game_InterpreterStartingKeAcms.prototype.canExecute = function(cmd) {
        result = false;
        if (cmd.code == 111) { result = true; }
        if (cmd.code == 411) { result = true; }
        if (cmd.code == 117) { result = true; }
        if (cmd.code == 357) {
            result = isCanPluginCmd(cmd, this._regsKe, this._conditionKe);
        }
        return result;
    };
    
    
    //- 開始時コモンイベントのセットアップ
    Game_InterpreterStartingKeAcms.prototype.setupChild = function(list, eventId) {
        if (!this._childInterpreter) { this._childInterpreter = new Game_InterpreterStartingKeAcms(this._depth + 1); }
        this._childInterpreter.setup(list, this._regsKe, this._conditionKe);
        while (1) {
            if (!this._childInterpreter.executeCommand()) { break; }
        }
    };
    
})();