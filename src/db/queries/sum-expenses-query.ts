import { db, eq, desc } from "@/db"; // Import eq and desc
import { sql } from "drizzle-orm";
import { expense as expenseTable } from "@/db/schema/expenses";
import { categories as categoriesTable } from "@/db/schema/categories";

export const sumExpenseQuery = db.select({
    amount: sql<number>`sum(${expenseTable.amount})`,
  })
  .from(expenseTable)

export async function sumExpense() {
    return  sumExpenseQuery? await sumExpenseQuery : "undefined"
}