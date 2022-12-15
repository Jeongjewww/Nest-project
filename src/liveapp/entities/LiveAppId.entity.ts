import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['liveAppId'])
export class LiveAppId {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  desc: string;

  @Column()
  liveAppId: string;

  @Column()
  publicUrl: string;

  @Column()
  privateUrl: string;

  @Column({ default: 0 })
  refCnt: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
