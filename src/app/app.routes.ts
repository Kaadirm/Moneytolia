import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { authGuard } from './guards/auth-guard.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { CampaignCreateComponent } from './pages/campaign-create/campaign-create.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "campaign-list",
        pathMatch: "full"
    },
    {
        path: "",
        component: LayoutComponent,
        canActivateChild: [authGuard],
        children: [
            { path: "campaign-list", component: CampaignListComponent },
            { path: "campaign-create", component: CampaignCreateComponent }
        ]
    },
    // no layout routes
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
];
