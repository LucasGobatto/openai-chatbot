import { LogsManager } from './logs.manager.js';
import { MessagesManager } from './messages.manager.js';

export class DatabaseManager {
  static logs = LogsManager;
  static messages = MessagesManager;
}
