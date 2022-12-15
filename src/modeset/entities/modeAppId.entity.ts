import { Service } from 'src/service/entities/service.entity';
import { Session } from 'src/session/entities/session.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModesetList } from './modesetList.entity';

// 별도의 PK가 존재하지 않는 테이블
@Entity('mode_app_id')
export class ModeAppId {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  modeId: string;

  @Column({ nullable: true })
  desc: string;

  // onDelete: 'CASCADE' => test
  @ManyToOne(() => ModesetList, (modeIds) => modeIds.modeAppIdList, {
    eager: true,
  })
  @JoinColumn({ name: 'modeId_fk', referencedColumnName: 'modeId' })
  modeIds: ModesetList;

  @Column({ nullable: true })
  liveAppId: string;

  @Column({ nullable: true })
  modeAppId: string;

  @Column({ nullable: true })
  debug: boolean;

  @Column({ nullable: true })
  session: string;

  @ManyToOne(
    () => Session,
    (publicSessionIds) => publicSessionIds.publicSessionList,
    {
      eager: true,
    },
  )
  @JoinColumn({
    name: 'publicSessionIds_fk',
    referencedColumnName: 'sessionName',
  })
  publicSessionIds: Session;

  @ManyToOne(
    () => Session,
    (privateSessionIds) => privateSessionIds.privateSessionList,
    {
      eager: true,
    },
  )
  @JoinColumn({
    name: 'privateSessionIds_fk',
    referencedColumnName: 'sessionName',
  })
  privateSessionIds: Session;

  @Column({ nullable: true })
  service: string;

  @ManyToOne(
    () => Service,
    (publicServiceIds) => publicServiceIds.publicServiceList,
    {
      eager: true,
    },
  )
  @JoinColumn({
    name: 'publicServiceIds_fk',
    referencedColumnName: 'serviceName',
  })
  publicServiceIds: Service;

  @ManyToOne(
    () => Service,
    (privateServiceIds) => privateServiceIds.privateServiceList,
    {
      eager: true,
    },
  )
  @JoinColumn({
    name: 'privateServiceIds_fk',
    referencedColumnName: 'serviceName',
  })
  privateServiceIds: Service;
}
