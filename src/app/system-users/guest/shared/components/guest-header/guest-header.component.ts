import {Component, Inject, inject, Renderer2, RendererFactory2} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {DOCUMENT, NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {debounceTime, Subject} from 'rxjs';
import {GuestHeaderService} from './guest-header.service';
import {ResourceFilesResponseModel} from '../../../../../pages/admin-files/shared/models/resource-files-response.model';
import {
  OrganizationsResponseModel
} from '../../../../../pages/admin-organizations/shared/models/organizations-response.model';

@Component({
  selector: 'app-guest-header',
  imports: [TranslatePipe, NgClass, RouterLink, RouterLinkActive, FormsModule, NgIf, SlicePipe, NgForOf],
  templateUrl: './guest-header.component.html',
  styleUrl: './guest-header.component.scss',
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('500ms ease-in-out')),
    ]),
    trigger('switchAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '400ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
    trigger('menuExpand', [
      state(
        'open',
        style({
          width: '*',
          visibility: 'visible',
          display: 'block',
        })
      ),
      state(
        'closed',
        style({
          width: '0px',
          visibility: 'hidden',
        })
      ),
      transition('open <=> closed', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class GuestHeaderComponent {
  private translate: TranslateService = inject(TranslateService);
  private service: GuestHeaderService = inject(GuestHeaderService);

  selectedLang: string = 'en-Us';
  selectLang(lang: string) {
    this.selectedLang = lang;
    localStorage.setItem('systemLanguage', lang);
    this.translate.use(lang);
  }
  isHidden = false;
  showMenu: boolean = false;
  searchText: string = '';
  searchTextChanged: Subject<string> = new Subject<string>();
  showSearch = false;
  showEmpty = false;
  searchLoading = false;

  private renderer: Renderer2;

  searchResult:any[]=[]

  copy:ResourceFilesResponseModel[]=[];
  orgCopy: OrganizationsResponseModel[] = [];
  constructor(
    private router: Router,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.service.component=this;
    this.service.getFiles()
    this.service.getAllOrganizations()


    this.searchTextChanged.pipe(debounceTime(500)).subscribe(() => {
      this.getSearchResult();
    });
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
    var questPages = document.querySelector('.burger') as Element;
    var body = document.querySelector('body') as Element;
    if (this.showMenu) {
      questPages.classList.add('active');
      body.classList.add('blocked');
    } else {
      questPages.classList.remove('active');
      body.classList.remove('blocked');
    }
  }

  closeBurger() {
    this.showMenu = false;
    var questPages = document.querySelector('.burger') as Element;
    var body = document.querySelector('body') as Element;
    questPages.classList.remove('active');
    body.classList.remove('blocked');
  }

  onAnimationDone() {
    if (!this.showMenu) {
      this.isHidden = true;
    }
  }

  openSearch() {
    this.showSearch = true;
    this.renderer.addClass(this.document.body, 'blocked');
  }

  onSearchChange(): void {
    this.searchTextChanged.next(this.searchText);
    this.searchLoading = true;
    console.log(this.searchText);
  }

  getSearchResult() {
    if (this.searchText.length > 0) {

      const allArrays:any = [this.copy, this.orgCopy];
      console.log(allArrays);
      this.searchResult = allArrays
        .flatMap((arr:any) =>
          arr.filter((item:any) =>
            item.title.toLowerCase().includes(this.searchText.toLowerCase())
          )
        )
        .slice(0, 5);

      console.log(this.searchResult);
      this.showEmpty = this.searchResult.length === 0;
    } else {
      this.searchResult = [];
      this.showEmpty = false;
    }
    this.searchLoading = false;
  }

  closeSearch() {
    this.showSearch = false;
    this.renderer.removeClass(this.document.body, 'blocked');
  }

  resetSearch() {
    this.searchResult = [];
    this.showEmpty = false;
    this.searchLoading = false;
    this.searchText = '';
    this.closeSearch();
  }

  goToSearchResult() {
    this.router.navigate(['/search/', this.searchText]);
  }

  getItem(item: any) {
    console.log(item);
    window.open(item.link, '_blank', 'noopener,noreferrer');

    this.resetSearch()
  }
}
