import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { ObjectType, Field } from 'type-graphql';
import { Block } from './Block';

@ObjectType()
@Entity('channels')
export class Channel extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => User)
  @ManyToOne(() => User, user => user.channels, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  user: User;

  @Field(() => [Block])
  @OneToMany(() => Block, block => block.channel)
  blocks: Block[]


}
