/**
 * Clipboard write text button
 *
 * @version 1.0.0
 */
export default class ClipboardButton extends HTMLButtonElement {
    #private;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * ボタン押下時の処理
     */
    private _clickEvent;
    /**
     * HTMLElement のコンテンツ (Node.textContent など) を取得する
     *
     * @param {HTMLElement} element - HTMLElement
     *
     * @returns {string} Node.textContent の値 (一部要素は `value` などの属性値)
     */
    private _getContent;
}
//# sourceMappingURL=ButtonClipboard.esm.d.ts.map