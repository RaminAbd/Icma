import { Component, inject } from '@angular/core';
import { OrganizationsResponseModel } from '../admin-organizations/shared/models/organizations-response.model';
import { OrganizationsService } from './organizations.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-organizations',
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent {
  private service: OrganizationsService = inject(OrganizationsService);
  organizations: OrganizationsResponseModel[] = [];
  copy: OrganizationsResponseModel[] = [];
  types: any[] = [
    { name: 'All', value: 1 , selected: true },
    { name: 'Community Organizations', value: 1, selected: false  },
    { name: 'Media', value: 2 , selected: false },
    { name: 'Foreign Organizations', value: 3 , selected: false },
  ];
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }

  select(item: any) {
    console.log(item, this.copy);
    this.types.forEach((type) => {
      type.selected = false;
      if (item.value !== type.value) {
        if (type.children) {
          type.children.forEach((type: any) => (type.selected = false));
        }
      }
    });
    item.selected = true;
    if (item.value === 0) {
      this.organizations = structuredClone(this.copy);
    } else {
      this.organizations = structuredClone(this.copy).filter(
        (file) => file.resourceType === item.value
      );
    }
  }

}
