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

  @OneToMany(() => ModeAppId, (modeId) => modeId.modeId)
  @PrimaryColumn()
  modeId: string;

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
