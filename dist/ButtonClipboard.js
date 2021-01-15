var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _writeText, _targetElement, _feedbackElement;
/**
 * Clipboard write text button
 *
 * @version 1.0.0
 */
export default class ClipboardButton extends HTMLButtonElement {
    constructor() {
        super();
        _writeText.set(this, void 0);
        _targetElement.set(this, null);
        _feedbackElement.set(this, null);
        this.type = 'button';
    }
    connectedCallback() {
        const writeText = this.dataset.text;
        const targetElementId = this.dataset.targetFor;
        if (writeText === undefined && targetElementId === undefined) {
            throw new Error('Attribute: `data-text` or `data-target-for` is not set.');
        }
        if (writeText !== undefined) {
            __classPrivateFieldSet(this, _writeText, writeText);
        }
        if (targetElementId !== undefined) {
            const targetElement = document.getElementById(targetElementId);
            if (targetElement === null) {
                throw new Error(`Element: #${targetElementId} can not found.`);
            }
            __classPrivateFieldSet(this, _targetElement, targetElement);
        }
        const feedbackElementId = this.dataset.feedbackFor;
        if (feedbackElementId !== undefined) {
            const feedbackElement = document.getElementById(feedbackElementId);
            if (feedbackElement === null) {
                throw new Error(`Element: #${feedbackElementId} can not found.`);
            }
            __classPrivateFieldSet(this, _feedbackElement, feedbackElement);
        }
        this.addEventListener('click', this._clickEvent, { passive: true });
    }
    disconnectedCallback() {
        this.removeEventListener('click', this._clickEvent);
    }
    /**
     * ボタン押下時の処理
     */
    async _clickEvent() {
        const writeText = __classPrivateFieldGet(this, _writeText) !== undefined ? __classPrivateFieldGet(this, _writeText) : this._getContent(__classPrivateFieldGet(this, _targetElement)); // data-text と data-target-for が両方指定されている場合は前者を優先する
        await navigator.clipboard.writeText(writeText);
        if (__classPrivateFieldGet(this, _feedbackElement) !== null) {
            __classPrivateFieldGet(this, _feedbackElement).hidden = false;
        }
        else {
            console.info('Clipboard write successfully.', writeText);
        }
    }
    /**
     * HTMLElement のコンテンツ (Node.textContent など) を取得する
     *
     * @param {HTMLElement} element - HTMLElement
     *
     * @returns {string} Node.textContent の値 (一部要素は `value` などの属性値)
     */
    _getContent(element) {
        const textContent = element.textContent; // ノードが HTMLElement である場合、 Node.textContent の値が null になることはない（空要素は空文字列を返す）
        switch (element.tagName.toLowerCase()) {
            case 'data':
            case 'input':
            case 'select':
            case 'textarea':
            case 'output':
                return element.value;
            case 'meta':
                return element.content;
            case 'pre':
                return textContent;
        }
        return textContent.trim();
    }
}
_writeText = new WeakMap(), _targetElement = new WeakMap(), _feedbackElement = new WeakMap();
//# sourceMappingURL=ButtonClipboard.js.map