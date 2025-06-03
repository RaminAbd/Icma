import {FileModel} from '../../../../core/models/File.model';

export class GalleryPhotosResponseModel {
  id: string;
  createdAt: string;
  title: string;
  image: FileModel = new FileModel();

}
