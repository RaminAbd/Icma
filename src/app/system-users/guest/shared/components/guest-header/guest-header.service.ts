import {inject, Injectable} from '@angular/core';
import {GuestHeaderComponent} from './guest-header.component';
import {ResourceFilesApiService} from '../../../../../pages/admin-files/shared/services/resource-files.api.service';
import {TranslateService} from '@ngx-translate/core';
import {
  OrganizationsApiService
} from '../../../../../pages/admin-organizations/shared/services/organizations.api.service';

@Injectable({
  providedIn: 'root'
})
export class GuestHeaderService {
  component:GuestHeaderComponent
  private service:ResourceFilesApiService = inject(ResourceFilesApiService)
  private translate:TranslateService = inject(TranslateService);
  private orgService: OrganizationsApiService = inject(OrganizationsApiService);
  constructor() { }

  getFiles(){
    this.service.GetAllByLang(this.service.serviceUrl, this.translate.currentLang).subscribe(resp=>{
      this.component.copy = resp.data.map((file:any)=>({
        title:file.description,
        type:1,
        typeDescription:'Literature',
        link:file.pdf
      }))
    })
  }

  getAllOrganizations() {
    this.orgService
      .GetAllByLang(this.orgService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        console.log(resp);
        this.component.orgCopy = structuredClone(resp.data).map((item:any)=>({
          title:item.name,
          type:2,
          typeDescription:'Organizations',
          link:item.link
        }));
      });
  }
}
