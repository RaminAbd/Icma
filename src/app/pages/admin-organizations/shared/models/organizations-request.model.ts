import {MultilingualNameModel} from '../../../../core/models/multilingual-name.model';

export class OrganizationsRequestModel {
  id?: any;
  name: MultilingualNameModel = new MultilingualNameModel();
  description: MultilingualNameModel = new MultilingualNameModel();
  phoneNumber?: any;
  link?: any;
  resourceType: number;
}
