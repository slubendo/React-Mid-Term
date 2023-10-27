  'use server'

  import { db, eq } from "@/db";
  import { expense } from "@/db/schema/expenses";
  import { categories } from "@/db/schema/categories";
  import { revalidatePath } from "next/cache"

  export async function createExpense(amount: number, description: string, date: string, categoryId:number) {

    const amountAsString = amount.toString();

    console.log({
      amount,
      description,
      date,
      categoryId,
    });

    if (!description || !amount || !date) {
      return { error: "Please fill the entire form" };
    }

    // connect to the database
    const result = await db.insert(expense).values({ amount: amountAsString, description, date, categoryId }).returning();
    console.log({ result });
    // redirect
    // revalidate
    revalidatePath("/")
  }

  export async function deleteExpense(id: number) {
    console.log(id);
    await db.delete(expense).where(eq(expense.id, id));
    // redirect
    // revalidate
    revalidatePath("/")
  }
