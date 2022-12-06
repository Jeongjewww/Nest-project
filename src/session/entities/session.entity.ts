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

@Entity('session_server')
@Unique(['sessionName'])
export class Session {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  sessionName: string;

  @Column({ nullable: true })
  privateIp: string;

  @Column({ nullable: true })
  privatePort: number;

  @Column({ nullable: true })
  publicIp: string;

  @Column({ nullable: true })
  publicPort: number;

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
