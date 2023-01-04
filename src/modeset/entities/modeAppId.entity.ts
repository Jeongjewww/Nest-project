import { LiveAppId } from 'src/liveapp/entities/LiveAppId.entity';
import { Service } from 'src/service/entities/service.entity';
import { Session } from 'src/session/entities/session.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 별도의 PK가 존재하지 않는 테이블
@Entity('mode_app_id')
export class ModeAppId {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  modeId: string;

  @Column({ nullable: true })
  desc: string;

  // @ManyToOne(() => ModesetList, (modeIds) => modeIds.modeAppIdList, {
  //   eager: true,
  //   onDelete: "CASCADE",
  // })
  // @JoinColumn({ name: "modeId_fk", referencedColumnName: "modeId" })
  // modeIds: ModesetList;

  @Column({ nullable: true })
  liveAppId: string;

  @ManyToOne(() => LiveAppId, (liveApps) => liveApps.liveApp, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'liveApp_fk' })
  liveApps: LiveAppId;

  @Column({ nullable: true })
  modeAppId: string;

  @Column({ nullable: true })
  debug: boolean;

  @Column({ nullable: true })
  publicSession: string;

  @Column({ nullable: true })
  privateSession: string;

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
  publicService: string;

  @Column({ nullable: true })
  privateService: string;

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

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
