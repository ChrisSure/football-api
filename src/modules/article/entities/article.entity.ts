import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Source } from '../../source/entities/source.entity';
import { ArticleStatus } from '../../../core/db/enums';

@Entity('articles')
@Index('idx_articles_status', ['status'])
@Index('idx_articles_project_id', ['project'])
@Index('idx_articles_source_id', ['source'])
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1024 })
  title: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.NEW,
  })
  status: ArticleStatus;

  @CreateDateColumn({ type: 'datetime' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated: Date;

  @ManyToOne(() => Project, (project) => project.articles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Source, (source) => source.articles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'source_id' })
  source: Source;
}
