import {MultilingualNameModel} from '../../../../core/models/multilingual-name.model';
import {FileModel} from '../../../../core/models/File.model';

export class ResourceFilesRequestModel {
  id: string;
  description: MultilingualNameModel=new MultilingualNameModel();
  image: FileModel=new FileModel();
  pdf:  FileModel=new FileModel();
  resourceType: number;
}
