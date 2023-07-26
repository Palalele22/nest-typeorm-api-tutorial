import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Club {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(() => User, (user) => user.clubs,)
    @JoinColumn({name: 'owner_id'})
    owner: User;


}