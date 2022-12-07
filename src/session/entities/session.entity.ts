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

  @OneToOne(() => ModeAppId)
  @Column()
  sessionName: string;

  @Column({ nullable: true })
  privateIp: string;

  @Column({ nullable: true })
  privatePort: string;

  @Column({ nullable: true })
  publicIp: string;

  @Column({ nullable: true })
  publicPort: string;

  @Column({ nullable: true })
  createSub: string;

  @CreateDateColumn()
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  // mariadb 5.x 버전의 경우, CURRENT_TIMESTAMP는 하나의 칼럼만 지원
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
