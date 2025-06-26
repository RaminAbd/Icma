import { Component, inject } from '@angular/core';
import { OrganizationsResponseModel } from '../admin-organizations/shared/models/organizations-response.model';
import { OrganizationsService } from './organizations.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-organizations',
  imports: [NgForOf, NgIf, NgClass, TranslatePipe],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent {
  private service: OrganizationsService = inject(OrganizationsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  organizations: OrganizationsResponseModel[] = [];
  type = this.route.snapshot.paramMap.get('type') as string;
  copy: OrganizationsResponseModel[] = [];
  types: any[] = [
    { name: 'Media', value: 1, selected: true },
    { name: 'İcma təşkilatları', value: 2, selected: false },
    { name: 'Mərkəzi təşkilatlar', value: 3, selected: false },
    { name: 'Beynəlxalq təşkilatlar', value: 4, selected: false },
    { name: 'Veriliş', value: 5, selected: false },
  ];
  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.checkWindowSize();
    window.addEventListener('resize', () => {
      this.checkWindowSize();
    });
  }
  showMobMenu: boolean = false;
  isMobile: boolean = false;
  checkWindowSize() {
    this.isMobile = window.innerWidth <= 769;
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
