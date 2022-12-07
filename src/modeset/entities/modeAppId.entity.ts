import { Session } from 'src/session/entities/session.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ModesetList } from './modesetList.entity';

// 별도의 PK가 존재하지 않는 테이블
@Entity('mode_app_id')
export class ModeAppId {
  @PrimaryColumn({ primary: false })
  id: number;

  @ManyToOne(() => ModesetList, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'modeId_fk',
    referencedColumnName: 'modeId',
  })
  modeId: string;

  // mode_app_id의 liveAppId가 live_app_id를 참조하는 FK
  // @OneToOne(() => LiveAppId, { onDelete: 'SET NULL' })
  // @JoinColumn({
  //   name: 'liveAppId_fk',
  //   referencedColumnName: 'liveAppId',
  // })
  // liveAppId: LiveAppId;

  @Column()
  liveAppId: string;

  @Column()
  modeAppId: string;

  @Column()
  debug: boolean;

  @Column()
  sessionName: string;

  @Column()
  serviceName: string;

  // join하지 않고 페이지에서 repository를 불러오는 방식은?
  // // session_server의 sessionName 칼럼을 참조
  // @OneToOne(() => Session, { onDelete: 'SET NULL' })
  // @JoinColumn({
  //   name: 'sessionName_fk',
  //   referencedColumnName: 'sessionName',
  // })
  // sessionName: Session;

  // // service_server의 serviceName 칼럼을 참조
  // @OneToOne(() => Service, { onDelete: 'SET NULL' })
  // @JoinColumn({
  //   name: 'sessionName_fk',
  //   referencedColumnName: 'serviceName',
  // })
  // serviceName: Service;
}
