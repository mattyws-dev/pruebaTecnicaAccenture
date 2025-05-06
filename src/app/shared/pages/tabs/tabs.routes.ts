import { Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

export const routes:Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path:'',
                redirectTo: '/tabs/pendientes',
                pathMatch: 'full' 
            },
            {
                path: 'pendientes',
                loadChildren: () => import('../../../modules/tareas/pages/pendientes/pendientes.routes').then((m)=>m.routes)
            },
            {
                path: 'completadas',
                loadChildren: () => import('../../../modules/tareas/pages/completadas/completadas.routes').then((m)=>m.routes)
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/pendientes',
        pathMatch: 'full'
    }
]