import { Session } from 'src/session/entities/session.entity';
import { Service } from 'src/service/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ModesetList } from './modesetList.entity';
import { LiveAppId } from 'src/liveapp/entities/LiveAppId.entity';

@Entity('mode_app_id')
export class ModeAppId {
  @PrimaryColumn({ primary: false })
  id: number;

  @Column()
  modeId: string;

  @ManyToOne(() => ModesetList, (liveAppId) => liveAppId.liveAppIds, {
    onDelete: 'SET NULL',
  })
  liveAppId: LiveAppId;

  @Column()
  modeAppId: string;

  @Column()
  debug: boolean;

  @OneToOne(() => Session, { onDelete: 'SET NULL' })
  @JoinColumn()
  sessionName: Session;

  @OneToOne(() => Service, { onDelete: 'SET NULL' })
  @JoinColumn()
  serviceName: Service;
}
