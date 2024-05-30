import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "campaign-list", component: CampaignListComponent },
];
