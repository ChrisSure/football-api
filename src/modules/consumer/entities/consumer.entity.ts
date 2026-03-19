import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Index,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { EntityStatus } from '../../../core/db/enums';

@Entity('consumers')
@Index('idx_consumers_status', ['status'])
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  key: string;

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

  @ManyToMany(() => Project, (project) => project.consumers)
  projects: Project[];
}
