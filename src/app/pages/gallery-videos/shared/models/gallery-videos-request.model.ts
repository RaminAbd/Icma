import {MultilingualNameModel} from '../../../../core/models/multilingual-name.model';
import {FileModel} from '../../../../core/models/File.model';

export class GalleryVideosRequestModel {
  id: string;
  createdAt: string;
  title: MultilingualNameModel = new MultilingualNameModel();
  description: MultilingualNameModel = new MultilingualNameModel();
  image: FileModel = new FileModel();
  videoUrl: string;
  resourceType:number;
}
