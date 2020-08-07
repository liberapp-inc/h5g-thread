/**
 * GAイベントを送信
 *
 * @param {string} category GAカテゴリ
 * @param {string} action GAアクション
 * @param {string} label GAラベル
 * @param {Event} e イベント
 */
/*
declare global{
    interface Window {
        trEventBe(context, category, action, label, e): void
    }
}
//interface MyWindow extends Window { trEventBe(context, category, action, label, e): void; }
//export declare var window: MyWindow;

// この関数を呼び出せない
export function trEventBe(category:string, action:string, label:string):void {
    const e:Event = window.event;
    const context = e ? e.currentTarget : window;
    if ('ga' in window && 'trEventBe' in window) {
        // GTMで提供されるtrEventBeを利用する
        window.trEventBe(context, category, action, label, e);
        return;
    }
    // eslint-disable-next-line no-console
    console.log('trEventBe: "%s", "%s", "%s", %o, %o', category, action, label, context, e);
}

// export default {
//     window,
//     trEventBe
// }

*/


function treventbe(category:string, action:string, label:string):void {
    const e:Event = window.event;
    const context = e ? e.currentTarget : window;
    if ('ga' in window && 'trEventBe' in window) {
        // GTMで提供されるtrEventBeを利用する
        (<any>window).trEventBe(context, category, action, label, e);
        return;
    }
    // eslint-disable-next-line no-console
    console.log('trEventBe: "%s", "%s", "%s", %o, %o', category, action, label, context, e);
}
