import { Component, inject } from '@angular/core';
import { ResourceFilesResponseModel } from '../admin-files/shared/models/resource-files-response.model';
import { LiteratureService } from './literature.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-literature',
  imports: [NgForOf, NgClass, NgIf],
  templateUrl: './literature.component.html',
  styleUrl: './literature.component.scss',
})
export class LiteratureComponent {
  private service: LiteratureService = inject(LiteratureService);
  files: ResourceFilesResponseModel[] = [];
  copy: ResourceFilesResponseModel[] = [];
  types: any[] = [
    { name: 'All', value: 0, selected: true },
    {
      name: 'General',
      value: 1,
      selected: false,
      isOpen:false,
      children: [
        { name: 'Government', value: 2, selected: false },
        { name: 'Ministries', value: 3, selected: false },
        { name: 'Governorate', value: 4, selected: false },
        { name: 'Municipalities', value: 5, selected: false },
        { name: 'Social Services', value: 6, selected: false },
      ],
    },

    { name: 'Laws', value: 7, selected: false },
    { name: 'Library', value: 8, selected: false },
    { name: 'EU (European Union)', value: 9, selected: false },
  ];

  constructor() {
    this.service.component = this;
    this.service.getAll();
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
