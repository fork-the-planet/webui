import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { RequiresRolesDirective } from 'app/directives/requires-roles/requires-roles.directive';
import { UiSearchDirective } from 'app/directives/ui-search.directive';
import { Role } from 'app/enums/role.enum';
import { helptextTopbar } from 'app/helptext/topbar';
import { DialogService } from 'app/modules/dialog/dialog.service';
import { IxIconComponent } from 'app/modules/ix-icon/ix-icon.component';
import { powerMenuElements } from 'app/modules/layout/topbar/power-menu/power-menu.elements';
import { TestDirective } from 'app/modules/test-id/test.directive';

@UntilDestroy()
@Component({
  selector: 'ix-power-menu',
  templateUrl: './power-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconButton,
    MatTooltip,
    MatMenuTrigger,
    IxIconComponent,
    MatMenu,
    MatMenuItem,
    TranslateModule,
    RequiresRolesDirective,
    UiSearchDirective,
    TestDirective,
  ],
})
export class PowerMenuComponent {
  protected readonly tooltips = helptextTopbar.mat_tooltips;
  protected readonly requiredRoles = [Role.FullAdmin];
  protected searchableElements = powerMenuElements;

  constructor(
    private translate: TranslateService,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  onReboot(): void {
    this.dialogService.confirm({
      title: this.translate.instant('Restart'),
      message: this.translate.instant('Restart the system?'),
      buttonText: this.translate.instant('Restart'),
    }).pipe(
      filter(Boolean),
      untilDestroyed(this),
    ).subscribe(() => {
      this.router.navigate(['/system-tasks/reboot'], { skipLocationChange: true });
    });
  }

  onShutdown(): void {
    this.dialogService.confirm({
      title: this.translate.instant('Shut down'),
      message: this.translate.instant('Shut down the system?'),
      buttonText: this.translate.instant('Shut Down'),
    }).pipe(
      filter(Boolean),
      untilDestroyed(this),
    ).subscribe(() => {
      this.router.navigate(['/system-tasks/shutdown'], { skipLocationChange: true });
    });
  }
}
