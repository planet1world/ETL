import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'connectionmanager', loadChildren: './connectionmanager/connectionmanager.module#ConnectionmanagerModule' },
            { path: 'createconnection', loadChildren: './createconnection/createconnection.module#CreateconnectionrModule' },
            { path: 'property-manager', loadChildren: './property-manager/property-manager.module#PropertyManagerModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordModule' },
            { path: 'create-product', loadChildren: './product/create-product/create-product.module#CreateProductModule' },
            { path: 'modify-product', loadChildren: './product/modify-product/modify-product.module#ModifyProductModule' },
            { path: 'product-step2', loadChildren: './product/product-step2/product-step2.module#Productstep2Module' },
            { path: 'product-step3', loadChildren: './product/product-step3/product-step3.module#Productstep3Module' },
            { path: 'list-product', loadChildren: './product/list-product/list-product.module#ListProductModule' },
            { path: 'tree-view', loadChildren: './product/tree-view/tree-view.module#TreeViewModule' },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
