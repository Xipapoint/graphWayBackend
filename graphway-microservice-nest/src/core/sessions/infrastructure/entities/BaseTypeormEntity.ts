import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseTypeormEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
