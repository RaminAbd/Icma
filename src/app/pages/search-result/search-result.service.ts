import { inject, Injectable } from '@angular/core';
import { SearchResultComponent } from './search-result.component';
import { TranslateService } from '@ngx-translate/core';
import {ResourceFilesApiService} from '../admin-files/shared/services/resource-files.api.service';
import {OrganizationsApiService} from '../admin-organizations/shared/services/organizations.api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  component: SearchResultComponent;
  private service:ResourceFilesApiService = inject(ResourceFilesApiService)
  private translate:TranslateService = inject(TranslateService);
  private orgService: OrganizationsApiService = inject(OrganizationsApiService);
  constructor() {}

  getFiles(){
    this.service.GetAllByLang(this.service.serviceUrl, this.translate.currentLang).subscribe(resp=>{
      this.component.copy = resp.data.map((file:any)=>({
        image:file.image,
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
          image:item.image,
          title:item.name,
          type:2,
          typeDescription:'Organizations',
          link:item.link
        }));
        this.component.searchText = this.component.text;
        this.component.getSearchResult();
      });
  }
}
