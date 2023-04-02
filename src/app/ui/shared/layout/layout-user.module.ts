import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {LayoutUserComponent} from './layout-user.component';
import {ClassicLayoutModule} from '../../../layout/layouts/vertical/classic/classic.module';

const layoutModules = [
];

@NgModule({
    declarations: [
        LayoutUserComponent
    ],
    imports: [
        SharedModule,
        ...layoutModules,
        ClassicLayoutModule
    ],
    exports     : [
        LayoutUserComponent,
        ...layoutModules
    ]
})
export class LayoutUserModule
{
}
