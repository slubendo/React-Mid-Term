import DeleteExpense from "./delete-expense";
import { useState } from "react";
import { selected } from "@/db/queries/select-query";
import { sumExpense } from "@/db/queries/sum-expenses-query";

export default async function Expenses() {
  let expenses; // Declare the expenses variable outside the try-catch block
  let sum;

  try {
    expenses = await selected(); // Assign the value to the existing expenses variable
  } catch (err) {
    console.log(err);
  }

  try {
    sum = await sumExpense(); // Assign the value to the existing expenses variable
  } catch (err) {
    console.log(err);
  }


  const [date, setDate] = useState("");



  return (
    <div>
      <div className="mt-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Expenses</h2>
          <h2 className="mb-2">View Expense by date</h2>
          <form action={`/${date}`}>
            <input
              type="date"
              id="date"
              placeholder="Date"
              required
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
            />
            <button type="submit">Expense by date</button>
          </form>

        </div>

        {expenses?.map((row) => (
          <div key={row.id}>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{row.description}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {row.date}
                </p>
              </div>
              <div className="flex gap-x-4 h-full items-center text-right">
                <div>
                  <p className="text-lg font-bold">{row.amount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {row.category.name} {/* Assuming category is an object with a 'name' property */}
                  </p>
                </div>
                <DeleteExpense id={row.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Total Expenses</h2>
        <p className="text-lg font-bold">{sum?.toString()}</p>
      </div>
    </div>
  );
}
