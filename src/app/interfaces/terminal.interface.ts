import { Observable, Subject } from 'rxjs';

export interface TerminalConfiguration {
  reconnectShell$?: Subject<void>;
  preInit?(): Observable<void>;
  customReconnectAction?(): void;
  connectionData: TerminalConnectionData;
}

export interface TerminalConnectionData {
  vmId?: number;
  podInfo?: {
    chartReleaseName: string;
    containerId: string;
    command: string;
  };
}
