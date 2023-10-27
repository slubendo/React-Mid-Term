export default function SubmitExpense() {
  return (
    <div>
      <form className="space-y-5">
        <div>
          <input
            type="date"
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <select className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0">
            <option value="1">Food</option>
            <option value="2">Transportation</option>
            <option value="3">Entertainment</option>
            <option value="4">Housing</option>
            <option value="5">Other</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Amount"
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
          />
        </div>

        <button
          type="submit"
          className={"w-full bg-indigo-500 dark:bg-indigo-700 text-white p-3 rounded-xl shadow hover:bg-indigo-700 dark:hover:bg-indigo-800"}
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
