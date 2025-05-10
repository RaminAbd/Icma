import { Injectable } from '@angular/core';
import {CategoriesResponseModel} from '../../pages/categories/shared/models/categories-response.model';

@Injectable({
  providedIn: 'root',
})
export class SystemCategoriesService {
  private categories:CategoriesResponseModel[] = [
    {
      id: '0c376b74-eb86-4009-909e-c4fe18f4a691',
      name: 'Culture',
    },
    {
      id: 'a407193b-b700-4f04-97d1-225e7144face',
      name: 'Ecology',
    },
    {
      id: 'a38fc216-2a09-4a06-8171-52ec98239481',
      name: 'Economics',
    },
    {
      id: '0192afe7-c65a-4138-8381-1daba3aaab63',
      name: 'Health',
    },
    {
      id: '66849cf4-96bc-44b9-92c7-93d3c69be7bb',
      name: 'Politics',
    },
    {
      id: 'b52e04ec-0915-4579-805e-2d3b759631b0',
      name: 'Social',
    },
    {
      id: 'a48f38ba-338f-46fb-b24c-87e3f9803e75',
      name: 'Sports',
    },
    {
      id: '17fb620f-9a00-417d-9a37-4c3ce832e763',
      name: 'World',
    },
  ];
  constructor() {}

  getAllCategories() {
    return this.categories;
  }

  getCategoryIdByName(name: string) {
    let cat = this.categories.find((category) => category.name === name);
    return cat ? cat.id : '';
  }
}
