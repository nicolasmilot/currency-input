import { CurrencyInput } from "../src/currencyInput/CurrencyInput";

const inputOne = document.getElementById("input-one");
if (inputOne) {
  console.log("Input One is: ", inputOne);
  new CurrencyInput(inputOne as HTMLInputElement);
}
