import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ModesetList {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  modeId: string;

  @Column()
  modeName: string;

  @Column()
  desc: string;

  @Column({ nullable: true })
  createSub: string;

  @Column({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  @Column({ nullable: true })
  updateDate: Date;

  @Column({ default: false })
  delete: boolean;

  @Column({ default: 0 })
  refCnt: number;
}
