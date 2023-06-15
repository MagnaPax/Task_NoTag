import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  brand_id: number;

  @Column()
  brand_name: string;
}
