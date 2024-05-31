import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    {
        path: "",
        redirectTo: "campaign-list",
        pathMatch: "full"
    },
    {
        path: "",
        canActivateChild: [authGuard],
        children: [
            { path: "campaign-list", component: CampaignListComponent },
            // { path: "campaign-create", component: CampaignListComponent }
        ]
    }
];
