import { DevicesManager } from './devices.manager.js';
import { MessagesManager } from './messages.manager.js';

export class DatabaseManager {
  static messages = MessagesManager;
  static devices = DevicesManager;
}
