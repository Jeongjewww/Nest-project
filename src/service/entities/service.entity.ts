import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service_server')
@Unique(['serviceName'])
export class Service {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  serviceName: string;

  @Column()
  network: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  port: number;

  @Column({ nullable: true })
  inspectorPort: number;

  @Column({ nullable: true })
  createSub: string;

  @CreateDateColumn({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  @UpdateDateColumn({ nullable: true })
  updateDate: Date;

  @Column({ default: false })
  delete: boolean;

  @Column({ default: 0 })
  refCnt: number;
}
