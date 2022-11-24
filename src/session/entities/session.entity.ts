import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  serverName: string;

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

  @Column({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateSub: string;

  @Column({ nullable: true })
  updateDate: Date;

  @Column({ default: false })
  delete: boolean;

  // @Column({ default: 0 })
  // refCnt: number;
}
