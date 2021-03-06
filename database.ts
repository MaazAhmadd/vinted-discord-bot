const { config } = require("dotenv");
config();
import {
  Entity,
  Column,
  createConnection,
  Connection,
  PrimaryGeneratedColumn,
} from "typeorm";

export const initialize = () =>
  createConnection({
    type: "postgres",
    // url: process.env.DATABASE_URl,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: [Subscription],
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column({
    length: 32,
  })
  channelId!: string;

  @Column()
  isActive!: boolean;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
  })
  latestItemDate!: Date;

  @Column({
    type: "timestamp with time zone",
  })
  createdAt!: Date;
}
