import { Component, inject, OnDestroy } from '@angular/core';
import { SearchResultService } from './search-result.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DatePicker } from 'primeng/datepicker';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { ResourceFilesResponseModel } from '../admin-files/shared/models/resource-files-response.model';
import { OrganizationsResponseModel } from '../admin-organizations/shared/models/organizations-response.model';

@Component({
  selector: 'app-search-result',
  imports: [
    NgForOf,
    RouterLink,
    FormsModule,
    DropdownModule,
    DatePicker,
    NgIf,
    TranslatePipe,
  ],
  templateUrl: './search-result.component.html',
  standalone: true,
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnDestroy {
  private service: SearchResultService = inject(SearchResultService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  text: string = this.route.snapshot.paramMap.get('text') as string;
  showEmpty: boolean = false;
  private routeSub!: Subscription;
  searchLoading: boolean = false;
  searchText: string;
  searchResult: any[] = [];
  copy: ResourceFilesResponseModel[] = [];
  orgCopy: OrganizationsResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.text = params.get('text') as string;
      this.searchText = structuredClone(this.text);
      this.getSearchResult();
    });


    this.service.getFiles();
    this.service.getAllOrganizations();

  }

  getSearchResult() {
    const allArrays: any = [this.copy, this.orgCopy];
    console.log(allArrays);

    // Filter by search text
    if (this.searchText && this.searchText.trim().length > 0) {
      const query = this.searchText.toLowerCase();
      this.searchResult = allArrays
        .flatMap((arr: any) =>
          arr.filter((item: any) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        )

      console.log(this.searchResult);
    }

    // Empty state
    this.showEmpty = this.searchResult.length === 0;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  clear() {
    this.searchText = '';
    this.searchResult = structuredClone(
      [this.copy, this.orgCopy].flatMap((item: any) => ({
        image: item.image,
        title:item.title,
        type:item.type,
        typeDescription:item.typeDescription,
        link:item.link
      }))
    );
  }

  getItem(item: any) {
    console.log(item);
    window.open(item.link, '_blank', 'noopener,noreferrer');
  }
}
