import { ICommandHandler, IEventHandler } from '@nestjs/cqrs';
import { writeConnection } from './DatabaseModule';
import { RequestStorageModule } from './RequestStorageModule';

export function Transactional() {
  return (
    target: ICommandHandler | IEventHandler,
    key: string,
    descriptor: PropertyDescriptor,
  ): void => {
    const originalMethod = descriptor.value as (...args) => Promise<unknown>;
    descriptor.value = new Proxy(originalMethod, {
      apply: async (proxyTarget, thisArg, args) => {
        if (writeConnection.isTransactionActive)
          RequestStorageModule.increaseTransactionDepth();
        if (!writeConnection.isTransactionActive) {
          RequestStorageModule.resetTransactionDepth();
          await writeConnection.startTransaction();
        }
        try {
          const result = await proxyTarget.apply(thisArg, args);

          if (
            writeConnection.isTransactionActive &&
            RequestStorageModule.getStorage().transactionDepth <= 0
          )
            await writeConnection.commitTransaction();
          if (
            writeConnection.isTransactionActive &&
            0 < RequestStorageModule.getStorage().transactionDepth
          )
            RequestStorageModule.decreaseTransactionDepth();
          return result;
        } catch (error) {
          if (
            writeConnection.isTransactionActive &&
            RequestStorageModule.getStorage().transactionDepth <= 0
          )
            await writeConnection.rollbackTransaction();
          if (
            writeConnection.isTransactionActive &&
            0 < RequestStorageModule.getStorage().transactionDepth
          )
            RequestStorageModule.decreaseTransactionDepth();
          throw error;
        }
      },
    });
  };
}
