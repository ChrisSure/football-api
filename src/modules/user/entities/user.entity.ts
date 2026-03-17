import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Project } from '../../../core/db/entities/project.entity';
import { EntityStatus } from '../../../core/db/enums';

@Entity('users')
@Index('idx_users_status', ['status'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: EntityStatus,
    default: EntityStatus.NEW,
  })
  status: EntityStatus;

  @CreateDateColumn({ type: 'datetime' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated: Date;

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({
    name: 'users_projects',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'project_id', referencedColumnName: 'id' },
  })
  projects: Project[];
}
