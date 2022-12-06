import { CONFIGURABLE_MODULE_ID } from '@nestjs/common/module-utils/constants';
import { LiveAppId } from 'src/liveapp/entities/LiveAppId.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

// 별도의 PK가 존재하지 않는 테이블
@Entity('mode_app_id')
export class ModeAppId {
  @PrimaryColumn({ primary: false })
  id: number;

  @Column()
  modeId: string;

  // ModeAppId - liveAppId (6) || ModesetList - modeId (1)
  // @ManyToOne(() => LiveAppId, modeIds => )
  // modeIds: LiveAppId[];

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
