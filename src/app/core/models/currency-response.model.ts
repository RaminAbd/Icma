import { CurrencyItemModel } from './currency-item.model';

export class CurrencyResponseModel {
  usd: CurrencyItemModel = new CurrencyItemModel();
  eur: CurrencyItemModel = new CurrencyItemModel();
  azn: CurrencyItemModel = new CurrencyItemModel();
  cny: CurrencyItemModel = new CurrencyItemModel();
  rub: CurrencyItemModel = new CurrencyItemModel();
  try: CurrencyItemModel = new CurrencyItemModel();
}
