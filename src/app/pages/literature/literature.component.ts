import { Component, inject } from '@angular/core';
import { ResourceFilesResponseModel } from '../admin-files/shared/models/resource-files-response.model';
import { LiteratureService } from './literature.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-literature',
  imports: [NgForOf, NgClass, NgIf, TranslatePipe],
  templateUrl: './literature.component.html',
  styleUrl: './literature.component.scss',
})
export class LiteratureComponent {
  private service: LiteratureService = inject(LiteratureService);
  files: ResourceFilesResponseModel[] = [];
  copy: ResourceFilesResponseModel[] = [];
  types: any[] = [
    {name:'Qanun', value:1, selected: true},
    {name:'Sənədlər', value:2, selected: false},
    {name:'Oxu materiali', value:3, selected: false},
    {name:'Aİ (Avropa İttifaqı)', value:4, selected: false},
  ];
  showMobMenu:boolean = false;

  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.checkWindowSize()
    window.addEventListener('resize', () => {
      this.checkWindowSize();
    });
  }
  isMobile:boolean = false;
  checkWindowSize(){
    this.isMobile = window.innerWidth <= 769;
  }
  select(item: any) {
    console.log(item, this.copy)
    this.types.forEach(type => {
      type.selected = false
      if(item.value !== type.value){
        if(type.children){
          type.children.forEach((type:any) => type.selected = false);
        }
      }
    });
    item.selected = true;
    if(item.value===0){
      this.files = structuredClone(this.copy)
      console.log(this.files);
    }
    if(!item.children && item.value !==0){
      this.files = structuredClone(this.copy).filter(file => file.resourceType===item.value);
    }

    if(item.children && item.value ===1){
      this.files = structuredClone(this.copy).filter(file => file.resourceType >=1 && file.resourceType <= 6);
    }

    console.log('nwe')
  }

  selectChild(e:any,item: any, child: any) {
    e.stopPropagation()
    item.children.forEach((type:any) => type.selected = false);
    child.selected = true;
    this.files = structuredClone(this.copy).filter(file => file.resourceType === child.value);
    console.log(child.value)

  }

  toggleChildren(item:any){
    item.isOpen = !item.isOpen;

  }
}
