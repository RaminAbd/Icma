import { Component, inject } from '@angular/core';
import { GovernmentAgenciesService } from './government-agencies.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsResponseModel } from '../admin-organizations/shared/models/organizations-response.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-government-agencies',
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './government-agencies.component.html',
  styleUrl: './government-agencies.component.scss',
})
export class GovernmentAgenciesComponent {
  private service: GovernmentAgenciesService = inject(
    GovernmentAgenciesService
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  organizations: OrganizationsResponseModel[] = [];
  type = this.route.snapshot.paramMap.get('type') as string;
  copy: OrganizationsResponseModel[] = [];
  types: any[] = [
    { name: 'Nazirlik', value: 1, selected: true },
    { name: 'Quberniya', value: 2, selected: false },
    { name: 'Bələdiyyələr', value: 3, selected: false },
    { name: 'Ədliyyə evləri', value: 4, selected: false },
    { name: 'Sosial xidmətlər', value: 5, selected: false },
    { name: 'Polis', value: 6, selected: false },
    { name: 'Başqa', value: 7, selected: false },
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
