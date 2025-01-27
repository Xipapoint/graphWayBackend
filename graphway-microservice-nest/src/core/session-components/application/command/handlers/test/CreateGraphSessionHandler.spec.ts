import { Test, TestingModule } from '@nestjs/testing';
import { CreateGraphSessionHandler } from '../CreateGraphSessionHandler';
import { CreateGraphSessionCommand } from '../../CreateGraphSessionCommand';
import { GraphSessionFactory } from 'src/session/domain/entities/factories/GraphSessionFactory';
import { GraphSessionRepository } from 'src/session/domain/entities/repositories/GraphSessionRepository';
import { InjectionToken } from '../../../InjectToken';
import { GraphSession } from 'src/session/domain/entities/GraphSession';

describe('CreateGraphSessionHandler', () => {
    let handler: CreateGraphSessionHandler;
    let graphSessionFactory: GraphSessionFactory;
    let graphSessionRepository: GraphSessionRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateGraphSessionHandler,
                {
                    provide: InjectionToken.GRAPH_SESSION_REPOSITORY,
                    useValue: {
                        save: jest.fn(),
                    },
                },
                {
                    provide: GraphSessionFactory,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        handler = module.get<CreateGraphSessionHandler>(CreateGraphSessionHandler);
        graphSessionFactory = module.get<GraphSessionFactory>(GraphSessionFactory);
        graphSessionRepository = module.get<GraphSessionRepository>(InjectionToken.GRAPH_SESSION_REPOSITORY);
    });

    it('should be defined', () => {
        expect(handler).toBeDefined();
    });

    it('should create and save a graph session', async () => {
        const command = new CreateGraphSessionCommand(
            crypto.randomUUID(),
            'some-title',
            Buffer.from('some-image-blob'),
            1,
            2,
            3
        );
        const graphSession = {
            commit: jest.fn(),
        } as Partial<GraphSession> as GraphSession;
    
        jest.spyOn(graphSessionFactory, 'create').mockReturnValue(graphSession);
        await handler.execute(command);

        expect(graphSessionFactory.create).toHaveBeenCalledWith(expect.objectContaining({
            id: expect.any(String),
            ...command,
        }));
        expect(graphSessionRepository.save).toHaveBeenCalledWith(graphSession);
        expect(graphSession.commit).toHaveBeenCalled();
    });
});