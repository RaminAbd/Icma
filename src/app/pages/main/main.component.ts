import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgComponentOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  role: string;
  navigationBarComponent: any = NavigationBarComponent;
  headerComponent: any = HeaderComponent;
  private storage: StorageService = inject(StorageService);
  constructor() {
    var resp = this.storage.getObject('authResponse');
    this.role = resp.role;
  }
}
