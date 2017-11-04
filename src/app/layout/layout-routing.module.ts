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
            { path: 'list-job', loadChildren: './job/list-job/list-job-module.module#ListJobModule' },
            { path: 'jobcreation', loadChildren: './job/jobcreation/jobcreation.module#JobcreationModule' },
            { path: 'job-step2', loadChildren: './job/job-step2/job-step2-module.module#JobStep2Module' },
            { path: 'job-step3', loadChildren: './job/job-step3/job-step3-module.module#JobStep3Module' },
            { path: 'job-step4', loadChildren: './job/job-step4/job-step4-module.module#JobStep4Module' },
            { path: 'job-step5', loadChildren: './job/job-step-5/job-step5-module.module#JobStep5Module' },
            { path: 'job-step6', loadChildren: './job/job-step6/job-step6.module#JobStep6Module' },
            { path: 'schedulling', loadChildren:'./job/schedulling/schedulling.module#SchedullingModule'},
            { path: 'extract-control', loadChildren:'./job/extract-control/extract-control-module.module#ExtractControlModule'},
            { path: 'ondemand-job', loadChildren:'./job/ondemand-job/ondemand-job-module.module#OndemandJobModule'},
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
