import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  country: string;

  @OneToOne(() => User, (user) => user.preferences, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
