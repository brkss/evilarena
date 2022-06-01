import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, ManyToMany, JoinTable} from 'typeorm';
import {  ObjectType, Field} from 'type-graphql';
import {Channel} from './Chanel';

@ObjectType()
@Entity('blocks')
export class Block extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({nullable: true})
  @Column({nullable: true})
  name?: string;

  @Field({nullable: true})
  @Column({nullable: true})
  txt?: string;

  @Field({nullable: true})
  @Column({nullable: true})
  image?: string;

  @Field({nullable: true})
  @Column({nullable: true})
  link?: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;


  @Field(() => [Channel])
  @ManyToMany(() => Channel)
  @JoinTable()
  channel: [Channel]
  /*
  @ManyToOne(() => Channel, channel => channel.blocks, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  channel: Channel
  */
}


