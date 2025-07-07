export class CurrencyHelper {
  static formatAmountToCurrency(amount: number, currency: string, language: string) {
    return new Intl.NumberFormat(language, { style: "currency", currency: currency }).format(amount ?? "");
  }

  static getCurrencyNumberOfDecimals(currencyCode: string) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    });

    const options = formatter.resolvedOptions();
    return options.minimumFractionDigits;
  }

  static formatAmount(amount: string, numberOfDecimals: number) {
    console.log({ numberOfDecimals });
    return amount && !!parseFloat(amount) ? parseFloat(amount).toFixed(numberOfDecimals) : "0";
  }

  static getCurrencyMinimalValue(numberOfDecimals: number) {
    return Math.pow(10, numberOfDecimals * -1);
  }
}
