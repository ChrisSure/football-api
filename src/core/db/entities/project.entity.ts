import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../../../modules/user/entities/user.entity';
import { Source } from './source.entity';
import { Consumer } from './consumer.entity';
import { Article } from './article.entity';
import { EntityStatus } from '../enums';

@Entity('projects')
@Index('idx_projects_status', ['status'])
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  description: string;

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

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];

  @ManyToMany(() => Source, (source) => source.projects)
  @JoinTable({
    name: 'projects_sources',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'source_id', referencedColumnName: 'id' },
  })
  sources: Source[];

  @ManyToMany(() => Consumer, (consumer) => consumer.projects)
  @JoinTable({
    name: 'projects_consumers',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'consumer_id', referencedColumnName: 'id' },
  })
  consumers: Consumer[];

  @OneToMany(() => Article, (article) => article.project)
  articles: Article[];
}
