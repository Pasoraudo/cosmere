import {NgModule} from '@angular/core';
import {LayoutComponent} from 'app/layout/layout.component';
import {ClassicLayoutModule} from 'app/layout/layouts/vertical/classic/classic.module';
import {SharedModule} from 'app/ui/shared/components/shared.module';

const layoutModules = [
    ClassicLayoutModule,
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
