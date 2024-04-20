import { LogsManager } from './logs.manager.js';
import { MessagesManager } from './messages.manager.js';
import { DevicesManager } from './devices.manager.js';

export class DatabaseManager {
  static logs = LogsManager;
  static messages = MessagesManager;
  static devices = DevicesManager;
}
