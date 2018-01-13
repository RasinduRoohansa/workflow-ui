import {Routes} from '@angular/router';

import {UserAdminComponent} from "./registry/user.component";
import {RoleAdminComponent} from "./registry/role.component";
import {AdminComponent} from "./admin.component";
import {PrivilegesComponent} from "./privileges/privileges.component";

export const AdminRoutes: Routes = [

    {
        path: '',
        children: [{
            path: 'home',
            component: AdminComponent
        }, {
            path: 'user',
            component: UserAdminComponent
        }, {
            path: 'role',
            component: RoleAdminComponent
        }, {
            path: 'privileges',
            component: PrivilegesComponent
        }]
    }
];
