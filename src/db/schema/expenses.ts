import {
  serial,
  text,
  pgTable,
  date,
  numeric,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const expense = pgTable("expense", {
  id: serial("id").primaryKey(),
  amount: numeric("amount", { precision: 10, scale: 2 }), // validate email format
  description: text("description").notNull(), // name is 3 characters to 50 Check
  date: date("date").notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
