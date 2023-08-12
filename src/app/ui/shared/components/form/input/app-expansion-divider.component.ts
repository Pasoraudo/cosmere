import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-expansion-divider',
  template: `
    <div class="flex flex-col items-center cursor-pointer grow">
      <div class="flex flex-row w-full justify-center items-center" (click)="toggleExpanded()">
        <mat-divider class="flex-1"></mat-divider>
        <div class="px-3 text-gray-500">
          <span *ngIf="expanded">{{ expandedText }}</span>
          <span *ngIf="!expanded">{{ closedText }}</span>
        </div>
        <mat-divider class="flex-1"></mat-divider>
      </div>
      <div class="flex flex-col w-full grow mt-1" *ngIf="expanded">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AppExpansionDividerComponent {
  @Input()
  expandedText: string;
  @Input()
  closedText: string;
  expanded: boolean = false;

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
}
