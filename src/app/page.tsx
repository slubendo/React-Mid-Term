import SubmitExpense from "./submit-expense";
import Expenses from "./expenses";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500 z-0"></div>
      <main className="flex justify-center w-full bg-transparent overflow-x-hidden relative z-10">
        <div className="bg-white dark:bg-black rounded-xl shadow-xl w-96 p-6 my-10">
          <h1 className="text-4xl font-bold mb-4">Expense Tracker</h1>

          <SubmitExpense />

          <Expenses />

        </div>
      </main>
    </>
  );
}
