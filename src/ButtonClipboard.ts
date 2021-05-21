/**
 * Clipboard write text button
 */
export default class ClipboardButton extends HTMLButtonElement {
	#writeText: string | undefined;
	#targetElement: HTMLElement | null = null;
	#feedbackElement: HTMLElement | null = null;

	constructor() {
		super();

		this.type = 'button';
	}

	connectedCallback(): void {
		const writeText = this.dataset.text;
		const targetElementId = this.dataset.targetFor;
		if (writeText === undefined && targetElementId === undefined) {
			throw new Error('Attribute: `data-text` or `data-target-for` is not set.');
		}

		if (writeText !== undefined) {
			this.#writeText = writeText;
		}

		if (targetElementId !== undefined) {
			const targetElement = document.getElementById(targetElementId);
			if (targetElement === null) {
				throw new Error(`Element: #${targetElementId} can not found.`);
			}

			this.#targetElement = targetElement;
		}

		const feedbackElementId = this.dataset.feedbackFor;
		if (feedbackElementId !== undefined) {
			const feedbackElement = document.getElementById(feedbackElementId);
			if (feedbackElement === null) {
				throw new Error(`Element: #${feedbackElementId} can not found.`);
			}

			this.#feedbackElement = feedbackElement;
		}

		this.addEventListener('click', this._clickEvent, { passive: true });
	}

	disconnectedCallback(): void {
		this.removeEventListener('click', this._clickEvent);
	}

	/**
	 * ボタン押下時の処理
	 */
	private async _clickEvent() {
		const writeText = this.#writeText !== undefined ? <string>this.#writeText : this._getContent(<HTMLElement>this.#targetElement); // data-text と data-target-for が両方指定されている場合は前者を優先する

		await navigator.clipboard.writeText(writeText);

		if (this.#feedbackElement !== null) {
			this.#feedbackElement.hidden = false;
		} else {
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
	private _getContent(element: HTMLElement): string {
		const textContent = <string>element.textContent; // ノードが HTMLElement である場合、 Node.textContent の値が null になることはない（空要素は空文字列を返す）

		switch (element.tagName.toLowerCase()) {
			case 'data':
			case 'input':
			case 'select':
			case 'textarea':
			case 'output':
				return (<HTMLDataElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLOutputElement>element).value;
			case 'meta':
				return (<HTMLMetaElement>element).content;
			case 'pre':
				return textContent;
		}

		return textContent.trim();
	}
}
