import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('modeset_json')
export class ModesetJson {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('simple-array')
  json: string[];
}
