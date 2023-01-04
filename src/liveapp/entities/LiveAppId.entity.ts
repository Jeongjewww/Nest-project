import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['liveAppId'])
export class LiveAppId {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  desc: string;

  @Column()
  liveAppId: string;

  @OneToMany(() => ModeAppId, (liveApp) => liveApp.liveApps, {
    cascade: true,
  })
  liveApp: ModeAppId;

  @Column({ nullable: true })
  publicUrl: string;

  @Column({ nullable: true })
  privateUrl: string;

  @Column({ default: 0 })
  refCnt: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
