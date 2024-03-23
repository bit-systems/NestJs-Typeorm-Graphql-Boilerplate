import { DefaultStatus, UserRole } from '@src/libs/core/utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  countryCode: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ type: 'enum', enum: UserRole })
  role: string;

  @Column({
    type: 'enum',
    enum: DefaultStatus,
    default: DefaultStatus.IN_ACTIVE,
  })
  status: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
