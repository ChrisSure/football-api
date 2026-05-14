import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Article } from '../../article/entities/article.entity';
import { EntityStatus } from '../../../core/db/enums';

@Entity('sources')
@Index('idx_sources_status', ['status'])
export class Source {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 512 })
  url: string;

  @Column({ type: 'varchar', length: 50 })
  key: string;

  @Column({
    type: 'enum',
    enum: EntityStatus,
    default: EntityStatus.NEW,
  })
  status: EntityStatus;

  @Column({ name: 'project_id' })
  projectId: number;

  @CreateDateColumn({ type: 'datetime' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated: Date;

  @ManyToOne(() => Project, (project) => project.sources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToMany(() => Article, (article) => article.source)
  articles: Article[];
}
