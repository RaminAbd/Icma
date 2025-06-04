import { FileModel } from '../../../../core/models/File.model';
import { MultilingualNameModel } from '../../../../core/models/multilingual-name.model';

export class EditorialsRequestModel {
  id: string;
  title: MultilingualNameModel = new MultilingualNameModel();
  description: MultilingualNameModel = new MultilingualNameModel();
  image: FileModel = new FileModel();
  writerId:string
}
