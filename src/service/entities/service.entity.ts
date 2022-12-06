import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
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

  @CreateDateColumn()
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  // })
  @UpdateDateColumn()
  updateDate: Date;

  @Column({ default: 0 })
  refCnt: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
