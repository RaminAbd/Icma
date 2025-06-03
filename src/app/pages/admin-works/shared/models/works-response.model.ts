import {FileModel} from '../../../../core/models/File.model';

export class WorksResponseModel {
  id: string;
  title: string;
  description: string;
  image: FileModel = new FileModel();
}
