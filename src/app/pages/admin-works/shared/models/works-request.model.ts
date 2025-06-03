import {MultilingualNameModel} from '../../../../core/models/multilingual-name.model';
import {FileModel} from '../../../../core/models/File.model';

export class WorksRequestModel {
  id: string;
  title: MultilingualNameModel = new MultilingualNameModel();
  description: MultilingualNameModel = new MultilingualNameModel();
  image: FileModel = new FileModel();
}
