import { ModeAppId } from 'src/modeset/entities/modeAppId.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class LiveAppId {
  @PrimaryColumn()
  liveAppId: string;

  @Column()
  publicUrl: string;

  @Column()
  privateUrl: string;

  @Column({ default: 0 })
  refCnt: number;

  @OneToOne(() => ModeAppId)
  @JoinColumn()
  modeAppId: ModeAppId;
}
