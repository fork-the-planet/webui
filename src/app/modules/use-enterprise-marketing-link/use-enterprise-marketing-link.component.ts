import {
  Component, ChangeDetectionStrategy, computed,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TestDirective } from 'app/modules/test-id/test.directive';

@Component({
  selector: 'ix-use-enterprise-marketing-link',
  templateUrl: './use-enterprise-marketing-link.component.html',
  styleUrls: ['./use-enterprise-marketing-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TestDirective,
    TranslateModule,
  ],
})
export class UseEnterpriseMarketingLinkComponent {
  protected readonly targetUrl = 'https://truenas.com/explore-truenas-enterprise/';

  messages = [
    this.translate.instant('Optimize Your Storage'),
    this.translate.instant('More Performance, More Protection'),
    this.translate.instant('Boost Performance & Support'),
    this.translate.instant('Unlock High Performance Solutions'),
    this.translate.instant('Expert Support When You Need It'),
    this.translate.instant('5 Nines of Uptime with HA'),
  ];

  currentMessage = computed(() => this.getTodaysMessage());
  currentMessageHref = computed(() => `${this.targetUrl}?m=${this.hashMessage(this.currentMessage())}`);

  constructor(
    private translate: TranslateService,
  ) {}

  getTodaysMessage(): string {
    const today = new Date().toDateString();
    const lastShownDate = localStorage.getItem('marketingMessageLastShownDate');
    const lastMessageHash = localStorage.getItem('marketingMessageLastHash');

    if (lastShownDate !== today) {
      const nextMessage = this.getNextMessage(lastMessageHash);

      localStorage.setItem('marketingMessageLastShownDate', today);
      localStorage.setItem('marketingMessageLastHash', this.hashMessage(nextMessage));

      return nextMessage;
    }

    return this.getCurrentMessage(lastMessageHash);
  }

  getNextMessage(lastMessageHash: string | null): string {
    const lastIndex = this.messages.findIndex((message) => this.hashMessage(message) === lastMessageHash);
    const nextIndex = lastIndex >= 0 ? (lastIndex + 1) % this.messages.length : 0;
    return this.messages[nextIndex];
  }

  getCurrentMessage(lastMessageHash: string | null): string {
    const currentIndex = this.messages.findIndex((message) => this.hashMessage(message) === lastMessageHash);
    return currentIndex >= 0 ? this.messages[currentIndex] : this.messages[0];
  }

  hashMessage(message: string): string {
    return btoa(encodeURIComponent(message));
  }
}
