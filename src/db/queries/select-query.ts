import { db, eq, desc } from "@/db"; // Import eq and desc
import { expense as expenseTable} from "@/db/schema/expenses";
import { categories as categoriesTable} from "@/db/schema/categories";

export const selectQuery = db.select({
    category: {
      id: categoriesTable.id,
      name: categoriesTable.name,
    },
    id: expenseTable.id,
    amount: expenseTable.amount,
    description: expenseTable.description,
    date: expenseTable.date,
    categoryId: expenseTable.categoryId,
    createdAt: expenseTable.createdAt,
  })
  .from(expenseTable)
  .innerJoin(categoriesTable, eq(expenseTable.categoryId, categoriesTable.id))
  .orderBy(desc(expenseTable.createdAt))


export async function selected() {
    return await selectQuery
}

// type User = Awaited<ReturnType<typeof selected()>>[0]
