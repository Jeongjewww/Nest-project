import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ModeAppId } from './modeAppId.entity';

@Entity('modeset_list')
@Unique(['modeId'])
export class ModesetList {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  modeId: string;

  // @PrimaryColumn()
  // @OneToMany(() => ModeAppId, modeId => modeId.modeIds)
  // modeId: ModeAppId;

  @Column()
  modeName: string;

  @Column()
  desc: string;

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
  activation: boolean;

  @Column({ default: false })
  delete: boolean;

  @Column({ default: 0 })
  refCnt: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
