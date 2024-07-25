import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const userSchema = mysqlTable("user", {
  id: varchar("id", { length: 50 })
    .primaryKey()
    .unique()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
