import {
  Component, ChangeDetectionStrategy, computed, input,
} from '@angular/core';
import { WidgetResourcesService } from 'app/pages/dashboard/services/widget-resources.service';
import { WidgetComponent } from 'app/pages/dashboard/types/widget-component.interface';
import { SlotSize } from 'app/pages/dashboard/types/widget.interface';
import { WidgetAppSettings } from 'app/pages/dashboard/widgets/apps/widget-app/widget-app.definition';

@Component({
  selector: 'ix-widget-app-network',
  templateUrl: './widget-app-network.component.html',
  styleUrls: [
    '../widget-app/widget-app.component.scss',
    './widget-app-network.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetAppNetworkComponent implements WidgetComponent<WidgetAppSettings> {
  size = input.required<SlotSize>();
  settings = input.required<WidgetAppSettings>();

  appName = computed(() => this.settings().appName);
  app = computed(() => this.resources.getApp(this.appName()));
  job = computed(() => this.resources.getAppStatusUpdates(this.appName()));
  stats = computed(() => this.resources.getAppStats(this.appName()));

  constructor(private resources: WidgetResourcesService) {}
}
