// import { CurrencyHelper } from "../helpers/CurrencyHelper";

const unfocusedInputType = "text";
const focusedInputType = "number";

const defaultOptions = {
  currency: "USD",
  locale: "en-US",
};

export interface CurrencyInputOptions {
  locale?: string;
  currency?: string;
}

export class CurrencyInput {
  private _inputElement: HTMLInputElement;
  private _options: CurrencyInputOptions;

  private _amount?: number;
  private _numberOfDecimals: number = 2;

  constructor(inputElement: HTMLInputElement, options: CurrencyInputOptions = {}) {
    this._inputElement = inputElement;
    this._options = {
      ...defaultOptions,
      ...options,
    };

    this.handleOnFocusIn = this.handleOnFocusIn.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);

    this.initializeInput();
  }

  private initializeInput() {
    this.injectStyle();
    this._inputElement.type = unfocusedInputType;
    this._inputElement.value = this.formatAmountToCurrency();

    this._inputElement.addEventListener("focus", this.handleOnFocusIn);
    this._inputElement.addEventListener("blur", this.handleOnBlur);
    this._inputElement.addEventListener("input", this.handleOnInput);
  }

  private injectStyle() {
    const style = document.createElement("style");
    style.id = "currency-input-style";
    style.textContent = `
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type=number] {
        -moz-appearance: textfield;
      }
    `;
    document.head.appendChild(style);
  }

  private handleOnFocusIn(event: Event) {
    this._inputElement.type = focusedInputType;
    this._inputElement.min = "0";
    this._inputElement.step = "0.01";

    this._inputElement.value = this.formatAmountToString();
  }

  private handleOnBlur(event: Event) {
    this._inputElement.type = unfocusedInputType;
    this._inputElement.removeAttribute("min");
    this._inputElement.removeAttribute("step");
    this._inputElement.value = this.formatAmountToCurrency();
  }

  private handleOnInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this._amount = this.formatAmount(target.value);
  }

  private formatAmountToCurrency() {
    if (!this._amount) return "";

    return new Intl.NumberFormat(this._options.locale, { style: "currency", currency: this._options.currency }).format(this._amount);
  }

  private formatAmount(value?: string) {
    if (!value) return undefined;

    return parseFloat(value);
  }

  private formatAmountToString() {
    if (!this._amount) return "";

    return parseFloat(this._amount.toString()).toFixed(this._numberOfDecimals);
  }
}
