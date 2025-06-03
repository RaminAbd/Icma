import { FileModel } from '../../../../core/models/File.model';

export class GalleryPhotosRequestModel {
  id: string;
  image: FileModel = new FileModel();
}
