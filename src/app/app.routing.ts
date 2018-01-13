import {Routes} from '@angular/router';

import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AuthGuard} from "./configuration/AuthGuard";
import {DashboardLayoutComponent} from "./layouts/dashboard/dashboard-layout.component";
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {AdminAuthGuard} from "./configuration/AdminAuthGuard";

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: 'admin',
            loadChildren: './admin/admin.module#AdminModule',
            canActivate: [AdminAuthGuard]
        }]
    }
];
