export interface BaseMessage {
  serviceType: string;
}

  
  export interface CheckUserExistsRequestMessage extends BaseMessage {
    serviceType: 'checkUserExists';
    data: {
      id: string
    };
  }
  
  
  export type ServiceMessage = CheckUserExistsRequestMessage
  