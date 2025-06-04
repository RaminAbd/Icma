import { FileModel } from '../../../../core/models/File.model';

export class EditorialsResponseModel {
  id: string;
  createdAt: any;
  name: string;
  description: string;
  writerName: string;
  writerImage: FileModel = new FileModel();
  image: FileModel = new FileModel();
  timeDiff:string
}
