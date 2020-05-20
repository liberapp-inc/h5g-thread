// Liberapp 2020 Tahiti Katagai
// LiberappSDK 便利くん
/*
const BoardName = "board1";

// ローカルデバッグ用
const LocalDebug = false;
const AppKey   = "afba5f6b-2d7f-49cc-b07e-f8a8fde628d3";
const AppToken = "5268833a-83af-49e7-85d0-e205d2507b44";
const AppUser  = "0508280e-a343-411f-91a3-a9f949824672";

class SdkUtil{

    static I:SdkUtil = null;
    static sdk:any = null;

    constructor() {
        SdkUtil.I = this;
    }

    async init()
    {
        SdkUtil.sdk = window["LiberappSdk"];

        try {
            // ローカルデバッグ
            if( LocalDebug )
                await SdkUtil.sdk.enableDebug({ applicationKey: AppKey, debugSigninOptions: { accessToken: AppToken, userAkey: AppUser } });
            
            await SdkUtil.sdk.initializeAsync();
            await SdkUtil.sdk.startGameAsync();
            if (SdkUtil.sdk.player) {
                console.log("ID", SdkUtil.sdk.player.getID());
                console.log("name", SdkUtil.sdk.player.getName());
                console.log("photo", SdkUtil.sdk.player.getPhoto());
            } else {
                console.log("GUEST");
            }

            // あらかじめ作成してあるリーダーボードを取得します
            const l = await SdkUtil.sdk.getLeaderboardAsync(BoardName);
            // 件数を取得
            const count = await l.getEntryCountAsync();
            console.log("Count", count);
            
            let localScore = Util.getSaveDataNumber( SaveKeyBestScore, DefaultBestScore );
            console.log("localScore = " + localScore );

            let serverEntry = null;
            let serverScore = DefaultBestScore;
            if( count > 0 ){
                serverEntry = await l.getPlayerEntryAsync();  // カウント０の場合エラー
                if( serverEntry )
                {
                    serverScore = serverEntry.getScore();
                    console.log("serverScore = " + serverScore );
                }
            }

            // サーバースコアなしなら、スコア送信
            if( serverEntry == null ){
                serverEntry = await l.setScoreAsync( localScore );  // 引数[追加データ]はバグのため不可
                serverScore = serverEntry.getScore();
                console.log("serverScore updated " + serverScore );
            }
            else{
                // サーバースコアあり、ローカルスコア記録なし（消失）なら、スコア記録
                if( localScore == DefaultBestScore || serverScore > localScore ){
                    Util.setSaveDataNumber( SaveKeyBestScore, serverScore );
                    console.log("localScore updated "+ serverScore );
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    async sendScore( score:number ){
        try {
            // 送信
            const l = await SdkUtil.sdk.getLeaderboardAsync(BoardName);
            const serverEntry = await l.getPlayerEntryAsync();
            let serverScore = serverEntry.getScore();
            // サーバースコアなし or スコア更新なら、スコア送信
            if( serverScore == null || score > serverScore ){
                serverScore = await l.setScoreAsync( score );  // 引数[追加データ]はバグのため不可
            }
        } catch (e) {
            console.log(e);
        }
    }
}
*/


