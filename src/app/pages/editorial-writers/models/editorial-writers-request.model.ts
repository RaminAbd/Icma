import {FileModel} from '../../../core/models/File.model';
import {MultilingualNameModel} from '../../../core/models/multilingual-name.model';

export class EditorialWritersRequestModel {
  id:string;
  name:MultilingualNameModel=new MultilingualNameModel();
  image:FileModel=new FileModel();
  biography:MultilingualNameModel=new MultilingualNameModel();
}
