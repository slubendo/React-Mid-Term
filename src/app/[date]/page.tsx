import { db, eq, desc } from "@/db"; // Import eq and desc
import { expense as expenseTable } from "@/db/schema/expenses";
import { categories as categoriesTable } from "@/db/schema/categories";

export default async function Home({params }: {params: {id: number}}) {
    let expenses; // Declare the expenses variable outside the try-catch block

    try {
        expenses = await db.select({
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
            .where(expenseTable, eq(expenseTable.date, params))
            .innerJoin(categoriesTable, eq(expenseTable.categoryId, categoriesTable.id))
            .orderBy(desc(expenseTable.createdAt)); // Assign the value to the existing expenses variable
    } catch (err) {
        console.log(err);
    }
return(
<div >

        { expenses?.map((row) => (
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

        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Total Expenses</h2>
            <p className="text-lg font-bold">{sum?.toString()}</p>
        </div>
</div >
);
}