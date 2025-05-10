import {Component, inject} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-guest-header',
  imports: [
    TranslatePipe,
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './guest-header.component.html',
  styleUrl: './guest-header.component.scss',
  animations: [
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
  private translate: TranslateService = inject(TranslateService)
  selectedLang:string = 'en-Us';
  selectLang(lang: string) {
    this.selectedLang = lang;
    localStorage.setItem('systemLanguage', lang);
    this.translate.use(lang);
  }
  isHidden = false;
  showMenu: boolean = false;

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
}
