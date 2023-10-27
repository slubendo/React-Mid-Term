"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { createExpense } from "./actions";
import { Category } from "@/db/schema/categories";

export default function ExpenseForm({
  categories,
}: {
  categories: Category[]
}) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const buttonDisabled = !date || !description || !amount;

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    let newValue;
    if( e.target.value == 'food') {
      newValue = 1
    } else if ( e.target.value == 'clothe') {
      newValue = 2
    }else if ( e.target.value == 'furniture') {
      newValue = 3
    }
    if (newValue !== undefined) {
      setSelectedCategory(newValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      setLoading(true);
      setSuccessMsg("");
    }


    const result = await createExpense(amount, description, date, selectedCategory)
    setLoading(false);
    setSuccessMsg("Expense added");

    if (result?.error) {
      alert(result.error)
    }
    // send to server and save in database
    setDate("");
    setDescription("");
    setAmount(0);
    setCategoryId(0);
  };


  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}
      >
        <div>
          <input
            type="date"
            id="date"
            placeholder="Date"
            required
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <select className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
            value={selectedCategory}
              onChange={handleChange}
            >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
            id="description"
            placeholder="Expense Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
          />
        </div>
        <div>
          <input
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
            id="amount"
            placeholder="Amount Spent"
            required
            type="number"
            onChange={(e) => setAmount(+e.target.value)}
            value={amount}
          />
        </div>

        <button
          className={cn(
            "w-full bg-indigo-500 dark:bg-indigo-700 text-white p-3 rounded-xl shadow hover:bg-indigo-700 dark:hover:bg-indigo-800",
            buttonDisabled && "opacity-50 pointer-events-none",
            !buttonDisabled && "hover:bg-slate-200"
          )}
          type="submit"
          disabled={buttonDisabled}
        >
          Add Expense
        </button>
      </form>
    </div>

    // {loading ? (<LoadingBookings></LoadingBookings>) : (<Bookings></Bookings>)}

  );
}