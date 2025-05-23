import {
  ChangeDetectionStrategy, Component, input, output,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { AddListItemEvent, DeleteListItemEvent, DynamicFormSchema } from 'app/interfaces/dynamic-form-schema.interface';
import { IxFieldsetComponent } from 'app/modules/forms/ix-forms/components/ix-fieldset/ix-fieldset.component';
import { IxDynamicFormItemComponent } from './ix-dynamic-form-item/ix-dynamic-form-item.component';

@UntilDestroy()
@Component({
  selector: 'ix-dynamic-form',
  styleUrls: ['./ix-dynamic-form.component.scss'],
  templateUrl: './ix-dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IxFieldsetComponent,
    IxDynamicFormItemComponent,
    TranslateModule,
  ],
})

export class IxDynamicFormComponent {
  readonly dynamicForm = input.required<UntypedFormGroup>();
  readonly dynamicSection = input.required<DynamicFormSchema[]>();
  readonly isEditMode = input<boolean>();

  readonly addListItem = output<AddListItemEvent>();
  readonly deleteListItem = output<DeleteListItemEvent>();

  addControlNext(event: AddListItemEvent): void {
    this.addListItem.emit(event);
  }

  removeControlNext(event: DeleteListItemEvent): void {
    this.deleteListItem.emit(event);
  }
}
