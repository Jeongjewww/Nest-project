import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('session_server')
@Unique(['sessionName'])
export class Session {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  sessionName: string;

  @Column({ nullable: true })
  privateIp: string;

  @Column({ nullable: true })
  privatePort: number;

  @Column({ nullable: true })
  publicIp: string;

  @Column({ nullable: true })
  publicPort: number;

  @Column({ nullable: true })
  createSub: string;

  @CreateDateColumn({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  @UpdateDateColumn({ nullable: true })
  updateDate: Date;

  @Column({ default: 0 })
  refCnt: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
