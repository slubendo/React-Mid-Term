"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { createExpense } from "./actions";
import { Category } from "@/db/schema/categories";

export default function LoadingExpenseForm() {




    return (
        <div>
            {new Array(3).fill(0).map((item, index) => (
                <div key={index} className="bg-gray-300 dark:bg-gray-900 p-4 rounded-xl shadow-md mb-4 flex justify-between items-center">
                </div>
            ))}

            <div className="w-full bg-indigo-500 dark:bg-indigo-700 text-white p-3 rounded-xl shadow hover:bg-indigo-700 dark:hover:bg-indigo-800 opacity-50 pointer-events-none">
                Add Expense
            </div>
        </div >
    );
}