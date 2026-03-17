import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../modules/user/entities/user.entity';
import { Project } from '../../../modules/project/entities/project.entity';
import { Source } from '../entities/source.entity';
import { Consumer } from '../entities/consumer.entity';
import { EntityStatus } from '../enums';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Source)
    private sourceRepository: Repository<Source>,
    @InjectRepository(Consumer)
    private consumerRepository: Repository<Consumer>,
  ) {}

  async seed() {
    console.log('Starting database seeding...');

    const users = await this.seedUsers();
    const projects = await this.seedProjects();
    const sources = await this.seedSources();
    const consumers = await this.seedConsumers();

    await this.linkUsersToProjects(users, projects);
    await this.linkProjectsToSources(projects, sources);
    await this.linkProjectsToConsumers(projects, consumers);

    console.log('Database seeding completed successfully!');
  }

  private async seedUsers(): Promise<User[]> {
    console.log('Seeding users...');
    const hashedPassword = await bcrypt.hash('admin', 10);
    const usersData = [
      {
        name: 'admin',
        password: hashedPassword,
        status: EntityStatus.ACTIVE,
      },
    ];

    const users = await this.userRepository.save(usersData);
    console.log(`Seeded ${users.length} users`);
    return users;
  }

  private async seedProjects(): Promise<Project[]> {
    console.log('Seeding projects...');
    const projectsData = [
      {
        title: 'xFootball Project',
        description:
          'A comprehensive news aggregation platform for xFootball content',
        status: EntityStatus.ACTIVE,
      },
      {
        title: 'News Project',
        description: 'Real-time analytics and statistics for news',
        status: EntityStatus.ACTIVE,
      },
    ];

    const projects = await this.projectRepository.save(projectsData);
    console.log(`Seeded ${projects.length} projects`);
    return projects;
  }

  private async seedSources(): Promise<Source[]> {
    console.log('Seeding sources...');
    const sourcesData = [
      {
        title: 'Football UA',
        url: 'https://football.ua/',
        key: 'football',
        status: EntityStatus.ACTIVE,
      },
      {
        title: 'Tribal Football',
        url: 'https://www.tribalfootball.com/',
        key: 'tribal',
        status: EntityStatus.ACTIVE,
      },
      {
        title: 'Goal',
        url: 'https://www.goal.com/en/news',
        key: 'goal',
        status: EntityStatus.ACTIVE,
      },
      {
        title: 'BBC',
        url: 'https://www.bbc.com/sport/football/transfers',
        key: 'bbc',
        status: EntityStatus.ACTIVE,
      },
      {
        title: 'Talk Sport',
        url: 'https://talksport.com/football/',
        key: 'talk',
        status: EntityStatus.ACTIVE,
      },
    ];

    const sources = await this.sourceRepository.save(sourcesData);
    console.log(`Seeded ${sources.length} sources`);
    return sources;
  }

  private async seedConsumers(): Promise<Consumer[]> {
    console.log('Seeding consumers...');
    const consumersData = [
      {
        title: 'Telegram',
        key: 'telegram',
        status: EntityStatus.ACTIVE,
      },
    ];

    const consumers = await this.consumerRepository.save(consumersData);
    console.log(`Seeded ${consumers.length} consumers`);
    return consumers;
  }

  private async linkUsersToProjects(
    users: User[],
    projects: Project[],
  ): Promise<void> {
    console.log('Linking users to projects...');
    projects[0].users = [users[0]];
    projects[1].users = [users[0]];

    await this.projectRepository.save(projects);
    console.log('Users linked to projects');
  }

  private async linkProjectsToSources(
    projects: Project[],
    sources: Source[],
  ): Promise<void> {
    console.log('Linking projects to sources...');
    projects[0].sources = [
      sources[0],
      sources[1],
      sources[2],
      sources[3],
      sources[4],
    ];

    await this.projectRepository.save(projects);
    console.log('Projects linked to sources');
  }

  private async linkProjectsToConsumers(
    projects: Project[],
    consumers: Consumer[],
  ): Promise<void> {
    console.log('Linking projects to consumers...');
    projects[0].consumers = [consumers[0]];
    projects[1].consumers = [consumers[0]];

    await this.projectRepository.save(projects);
    console.log('Projects linked to consumers');
  }
}
