import {
  Column,
  CreateDateColumn,
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

  @Column()
  modeName: string;

  @Column()
  desc: string;

  @OneToMany(() => ModeAppId, (liveAppId) => liveAppId.modeAppId)
  liveAppIds: ModeAppId[];

  @Column({ nullable: true })
  createSub: string;

  @CreateDateColumn({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  @UpdateDateColumn({ nullable: true })
  updateDate: Date;

  @Column({ default: 0 })
  activation: boolean;

  @Column({ default: false })
  delete: boolean;

  @Column({ default: 0 })
  refCnt: number;
}
