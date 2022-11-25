import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  serviceName: string;

  @Column()
  network: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  port: number;

  @Column({ nullable: true })
  inspectorPort: number;

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
