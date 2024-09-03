// import { BaseMessage } from "./requestTypes";

// export interface UserQueueMessage extends BaseMessage {
//     queue: 'userQueue';
//   }
  
//   export interface NotificationQueueMessage extends BaseMessage {
//     queue: 'notificationQueue';
//   }


import { ServiceMessage } from "./requestTypes";

type QueueMapping = {
    checkUserExists: string;

};
  
  type Queue<T extends ServiceMessage> = { queue: QueueMapping[T['serviceType']] };
  
export function addQueueToMessage<T extends ServiceMessage>(message: T): Queue<T> {
    const queueMapping: QueueMapping = {
      checkUserExists: 'userQueue',
    };
  
    return {
      queue: queueMapping[message.serviceType],
    };
}