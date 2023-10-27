import SubmitExpense from "./submit-expense";
import Expenses from "./expenses";
import LoadingExpenses from "./loading-expense";
import { Suspense } from "react";
import ExpenseForm from "./create-expense-form";
import { categories, Category } from "@/db/schema/categories";
import { db } from "@/db"; // Import eq and desc
import LoadingExpenseForm from "./loading-expense-form";






export default async function Home() {

  const categoryType: Category[] = await db.select().from(categories).then((results) => {
    // Assuming 'results' is an array of objects with 'id', 'name', and 'createdAt' properties
    return results.map((result) => ({
      id: result.id,
      name: result.name,
      createdAt: result.createdAt,
    }));
  });

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500 z-0"></div>
      <main className="flex justify-center w-full bg-transparent overflow-x-hidden relative z-10">
        <div className="bg-white dark:bg-black rounded-xl shadow-xl w-96 p-6 my-10">
          <h1 className="text-4xl font-bold mb-4">Expense Tracker</h1>


          <Suspense fallback={<LoadingExpenseForm/>}>
            <ExpenseForm categories={categoryType} />
          </Suspense>

          <Suspense fallback={<LoadingExpenses/>}>
            <Expenses/>
          </Suspense>


        </div>
      </main>
    </>
  );
}
