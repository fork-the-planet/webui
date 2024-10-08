import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { helptextSharingIscsi } from 'app/helptext/sharing';
import { IscsiWizardComponent } from 'app/pages/sharing/iscsi/iscsi-wizard/iscsi-wizard.component';

@UntilDestroy()
@Component({
  selector: 'ix-initiator-wizard-step',
  templateUrl: './initiator-wizard-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitiatorWizardStepComponent {
  form = input<IscsiWizardComponent['form']['controls']['initiator']>();

  readonly helptextSharingIscsi = helptextSharingIscsi;
}
