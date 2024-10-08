import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { mockAuth } from 'app/core/testing/utils/mock-auth.utils';
import { ServiceName } from 'app/enums/service-name.enum';
import { ServiceStatus } from 'app/enums/service-status.enum';
import { Service } from 'app/interfaces/service.interface';
import { ServiceExtraActionsComponent } from 'app/pages/sharing/components/shares-dashboard/service-extra-actions/service-extra-actions.component';

describe('ServiceExtraActionsComponent', () => {
  let spectator: Spectator<ServiceExtraActionsComponent>;
  let loader: HarnessLoader;
  let menu: MatMenuHarness;

  const createComponent = createComponentFactory({
    component: ServiceExtraActionsComponent,
    providers: [
      mockAuth(),
    ],
  });

  async function setupTest(service: Service): Promise<void> {
    spectator = createComponent({
      props: {
        service,
      },
    });
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    menu = await loader.getHarness(MatMenuHarness);
  }

  it('show a menu with available actions for NFS', async () => {
    await setupTest({
      id: 1,
      service: ServiceName.Nfs,
      state: ServiceStatus.Stopped,
      enable: false,
    } as Service);

    expect(menu).toExist();
    await menu.open();

    const items = await menu.getItems();
    expect(items).toHaveLength(3);
    expect(await items[0].getText()).toBe('Turn On Service');
    expect(await items[1].getText()).toBe('Config Service');
    expect(await items[2].getText()).toBe('NFS Sessions');
  });

  it('show a menu with available actions for SMB', async () => {
    await setupTest({
      id: 1,
      service: ServiceName.Cifs,
      state: ServiceStatus.Running,
      enable: false,
    } as Service);

    expect(menu).toExist();
    await menu.open();

    const items = await menu.getItems();
    expect(items).toHaveLength(4);
    expect(await items[0].getText()).toBe('Turn Off Service');
    expect(await items[1].getText()).toBe('Config Service');
    expect(await items[2].getText()).toBe('SMB Sessions');
    expect(await items[3].getText()).toBe('Audit Logs');
  });
});
