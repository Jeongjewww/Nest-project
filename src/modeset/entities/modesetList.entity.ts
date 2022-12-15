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
import { ModeAppId } from './modeAppId.entity';

@Entity('modeset_list')
@Unique(['modeId'])
export class ModesetList {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  modeId: string;

  @Column()
  modeName: string;

  @Column({ nullable: true })
  createSub: string;

  @CreateDateColumn()
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({ default: 0 })
  activation: boolean;

  @Column({ default: 0 })
  refCnt: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => ModeAppId, (modeAppIdList) => modeAppIdList.modeId)
  modeAppIdList: ModeAppId[];
}
