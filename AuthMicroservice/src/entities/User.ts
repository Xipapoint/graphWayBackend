import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  // Hashed for more safety
  @Column()
  hashedPassword: string;

  @Column()
  email: string;

  // Only one role is able
  @Column({ default: 'USER' })
  role: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
