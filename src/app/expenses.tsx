import DeleteExpense from "./delete-expense";

export default async function Expenses() {
  return (
    <>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Expenses</h2>
        <div>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Description</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2023-10-27
              </p>
            </div>
            <div className="flex gap-x-4 h-full items-center text-right">
              <div>
                <p className="text-lg font-bold">$100</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Category
                </p>
              </div>
              <DeleteExpense />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Total Expenses</h2>
        <p className="text-lg font-bold">$100</p>
      </div>
    </>
  );
}
