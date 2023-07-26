import { Club } from 'src/club/club.entity';
import { UserPreferences } from '../userprefs/userprefs.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => UserPreferences, (preferences) => preferences.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  preferences: UserPreferences[];

  @OneToMany(() => Club, (clubs) => clubs.owner)
  @JoinColumn()
  clubs: Club;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
