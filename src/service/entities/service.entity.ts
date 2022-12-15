import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(
    () => ModeAppId,
    (publicServiceList) => publicServiceList.publicServiceIds,
  )
  publicServiceList: ModeAppId[];

  @OneToMany(
    () => ModeAppId,
    (privateServiceList) => privateServiceList.privateServiceIds,
  )
  privateServiceList: ModeAppId[];

  @Column()
  network: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  port: string;

  @Column({ nullable: true })
  inspectorPort: string;

  @Column({ nullable: true })
  createSub: string;

  @CreateDateColumn()
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({ default: 0 })
  refCnt: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
