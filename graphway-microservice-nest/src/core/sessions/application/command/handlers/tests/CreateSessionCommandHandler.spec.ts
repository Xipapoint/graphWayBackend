import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GraphSessionFactory } from '../../../../domain/factories/GraphSessionFactory';
import { GraphSessionRepository } from '../../../../domain/repositories/GraphSessionRepository';
import { InjectionToken } from '../../../InjectionToken';
import { CreateGraphSessionHandler } from '../CreateSessionCommandHandler';
import { CreateGraphSessionCommand } from '../../CreateSessionCommand';

jest.mock('../../../../libs/Transactional', () => ({
  Transactional: () => () => undefined,
}));

describe('CreateGraphSessionHandler', () => {
  let handler: CreateGraphSessionHandler;
  let repository: GraphSessionRepository;
  let factory: GraphSessionFactory;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: InjectionToken.GRAPH_SESSION_REPOSITORY,
      useValue: {},
    };
    const factoryProvider: Provider = {
      provide: GraphSessionFactory,
      useValue: {},
    };
    const providers: Provider[] = [
      CreateGraphSessionHandler,
      repoProvider,
      factoryProvider,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateGraphSessionHandler);
    repository = testModule.get(InjectionToken.GRAPH_SESSION_REPOSITORY);
    factory = testModule.get(GraphSessionFactory);
  });

  describe('execute', () => {
    it('should execute OpenAccountCommand', async () => {
      const account = { createdGraphSession: jest.fn(), commit: jest.fn() };

      factory.create = jest.fn().mockReturnValue(account);

      repository.save = jest.fn().mockResolvedValue(undefined);

      const command = new CreateGraphSessionCommand(
        Buffer.from(new ArrayBuffer(0)),
        crypto.randomUUID(),
        crypto.randomUUID(),
        crypto.randomUUID(),
        crypto.randomUUID(),
        crypto.randomUUID(),
        crypto.randomUUID(),
      );

      await expect(handler.execute(command)).resolves.toBeUndefined();

      expect(factory.create).toHaveBeenCalledWith({
        id: expect.any(String),
        title: expect.any(String),
        ...command,
      });
      expect(account.createdGraphSession).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(account);
      expect(account.commit).toHaveBeenCalledTimes(1);
    });
  });
});
