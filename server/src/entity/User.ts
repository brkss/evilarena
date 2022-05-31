import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Channel } from './Chanel';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field(() => [Channel])
  @OneToMany(() => Channel, channel => channel.user)
  channels: Channel[]
}
