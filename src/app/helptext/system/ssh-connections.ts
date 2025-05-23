import { marker as T } from '@biesbjerg/ngx-translate-extract-marker';

export const helptextSshConnections = {
  setupMethodTooltip: T('How to configure the connection:<br><br> \
 <i>Manual</i> requires configuring authentication on the remote system. \
 This can include copying SSH keys and modifying the <i>root</i> user \
 account on that system.<br><br> \
 <i>Semi-automatic</i> only works when configuring an SSH connection \
 with a remote TrueNAS system. This method uses the URL and login \
 credentials of the remote system to connect and exchange SSH keys.'),

  hostTooltip: T('Hostname or IP address of the remote system.'),

  usernameTooltip: T('Username on the remote system which will be used to login <b>via SSH</b>.'),

  sudoTooltip: T('Checking this option will lead to <i>/usr/sbin/zfs</i> being allowed to be executed using sudo without password.\
    If not checked, <i>zfs allow</i> must be used to grant non-user permissions to perform ZFS tasks. Mounting ZFS filesystems by non-root still would not be possible due to Linux restrictions.'),

  privateKeyTooltip: T('Choose a saved SSH Keypair or select \
 <i>Generate New</i> to create a new keypair and use it for this \
 connection.'),

  remoteHostKeyTooltip: T('Remote system SSH key for this system to \
 authenticate the connection. When all other fields are properly \
 configured, click <b>DISCOVER REMOTE HOST KEY</b> to query the remote \
 system and automatically populate this field.'),

  connectTimeoutTooltip: T('Time (in seconds) before the system \
 stops attempting to establish a connection with the remote system.'),

  urlTooltip: T('Hostname or IP address of the remote system. A \
 valid URL scheme is required. Example: \
 <b>https://<i>10.231.3.76</i></b>'),

  passwordTooltip: T('User account password for logging in to the remote system.'),

  adminUsernameTooltip: T('Username on the remote system to log in <b>via Web UI</b> to setup connection.'),

  otpTooltip: T('One-Time Password if two factor authentication is enabled.'),
};
