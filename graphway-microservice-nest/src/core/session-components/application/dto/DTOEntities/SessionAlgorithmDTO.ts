import { ApiProperty } from '@nestjs/swagger';
import { SessionAlgorithm } from 'src/core/session-components/domain/entities/SessionAlgorithm';
import { ImageBlobType } from 'src/core/session-components/domain/types/ImageType';

export class SessionAlgorithmDTO {
  @ApiProperty({
    example: `${crypto.randomUUID()}`,
    description: 'The unique identifier of the session Algorithm',
  })
  id: string;

  @ApiProperty({
    example: 'Algorithm Title',
    description: 'The title of the session mode',
  })
  title: string;

  @ApiProperty({
    example: 'This is a description of the session Algorithm',
    description: 'The description of the session Algorithm',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image associated with the session Algorithm',
  })
  image: ImageBlobType;

  @ApiProperty({
    example: `${crypto.randomUUID()}`,
    description:
      'The unique identifiers of the session structures that are associated with the session Algorithm',
  })
  sessionStructureIds: string[];

  static fromDomain(sessionAlgorithm: SessionAlgorithm): SessionAlgorithmDTO {
    return {
      id: sessionAlgorithm.getId(),
      title: sessionAlgorithm.getTitle(),
      description: sessionAlgorithm.getDescription(),
      image: sessionAlgorithm.getImagePath(),
      sessionStructureIds: sessionAlgorithm.getSessionStructureId(),
    };
  }
}
