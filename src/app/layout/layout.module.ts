import {NgModule} from '@angular/core';
import {ClassicLayoutModule} from './layouts/vertical/classic/classic.module';
import {LayoutComponent} from './layout.component';
import {SharedModule} from '../ui/shared/components/shared.module';

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
