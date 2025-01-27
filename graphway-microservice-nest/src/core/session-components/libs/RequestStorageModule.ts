import { InternalServerErrorException } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

class Storage {
  constructor(
    readonly requestId = crypto.randomUUID().toString(),
    readonly transactionDepth = 0,
  ) {}
}

interface RequestStorageModule {
  reset: () => void;
  resetTransactionDepth: () => void;
  increaseTransactionDepth: () => void;
  decreaseTransactionDepth: () => void;
  setRequestId: (requestId: string) => void;
}

class RequestStorageImplement implements RequestStorageModule {
  private readonly storage = new AsyncLocalStorage<Storage>();

  reset(): void {
    this.storage.enterWith(new Storage());
  }

  resetTransactionDepth(): void {
    const storage = this.getStorage();
    this.storage.enterWith({ ...storage, transactionDepth: 0 });
  }

  increaseTransactionDepth(): void {
    const storage = this.getStorage();
    this.storage.enterWith({
      ...storage,
      transactionDepth: storage.transactionDepth + 1,
    });
  }

  decreaseTransactionDepth(): void {
    const storage = this.getStorage();
    this.storage.enterWith({
      ...storage,
      transactionDepth: storage.transactionDepth - 1,
    });
  }

  setRequestId(requestId: string): void {
    const storage = this.getStorage();
    this.storage.enterWith({ ...storage, requestId });
  }

  getStorage(): Storage {
    const storage = this.storage.getStore();
    if (!storage)
      throw new InternalServerErrorException('RequestStorage is not found');
    return storage;
  }
}

export const RequestStorageModule = new RequestStorageImplement();
