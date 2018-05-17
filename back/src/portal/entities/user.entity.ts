import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, name: 'nom' })
  nom: string;

  @Column({ length: 255, name: 'prenom' })
  prenom: string;

  @Column({ length: 255, name: 'email' })
  email: string;

  @Column({ length: 128, name: 'hash' })
  hash: string;

  @Column({ name: 'activated' })
  activated: boolean;

  @Column({
    name: 'created_at',
    type: 'date'
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'date'
  })
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'date',
    nullable: true
  })
  deletedAt: Date;
}
