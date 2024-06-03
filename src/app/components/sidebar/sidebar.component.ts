import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, afterNextRender, AfterRenderPhase } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
interface SideBar {
  href: string;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    SvgIconComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  openSideMenu: boolean = true;
  openSubmenu: { [key: number]: boolean } = {};
  navbar: SideBar[] = [
    { href: '/campaign-list', text: 'Kampanya listeleme', icon: '../../../assets/dashboard-icon.svg' },
    { href: '/campaign-create', text: 'Kampanya oluşturma', icon: '../../../assets/create-icon.svg' },
    // Add more items here
  ];



  constructor(private router: Router, private authService: AuthService) { }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   if (event.target.innerWidth <= 640) {
  //     this.openSideMenu = false;
  //   } else {
  //     this.openSideMenu = true;
  //   }
  // }
  afterNextRender() {
    if (window && window.innerWidth <= 640) {
      this.openSideMenu = false;
    } else { this.openSideMenu = true; }
    { phase: AfterRenderPhase.EarlyRead };
  }

  toggleSideMenu() {
    this.openSideMenu = !this.openSideMenu;
  }

  toggleSubmenu(index: number) {
    this.openSubmenu[index] = !this.openSubmenu[index];
  }

  isPathActive(path: string): boolean {
    return this.router.url === path;

  }

  logout() {
    this.authService.removeAuthToken();
    this.router.navigate(['/login']);
  }
}
