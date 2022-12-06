import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class LiveAppId {
  @PrimaryColumn()
  // @OneToOne(() => ModeAppId)
  liveAppId: string;

  @Column()
  publicUrl: string;

  @Column()
  privateUrl: string;

  @Column({ default: 0 })
  refCnt: number;

  @Column()
  modeAppId: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
