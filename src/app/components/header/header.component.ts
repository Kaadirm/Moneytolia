import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SvgIconComponent,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username: string | null = null;

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    // Call a method in your AuthService to get the username
    this.username = this.AuthService.getUsername();
  }
}
