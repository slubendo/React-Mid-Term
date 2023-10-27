[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/zOkIRljK)
# Instructions

You are building this expense app:

https://expenses-complete-q4s8s0mky-sa-m.vercel.app/

It doesn't have to look exactly the same, but make it look nice.

This project currently has a small amount of code in it but nothing is functional. It's just some hard coded placeholder JSX, you'll need to implement everything.

## Database

### Setup the Drizzle Schema

https://www.nexttonone.lol/setup-drizzle

Create the drizzle schema for `Expenses` and `Categories` tables.

- An expense contains an `id`, `amount`, `description`, `date`, and `categoryId`.
- A Category contains an `id` and a `name`.

**ERD:**
https://link.excalidraw.com/readonly/EkDyKUN9XGYAJOSIIRq5?darkMode=true

<iframe src="https://link.excalidraw.com/readonly/EkDyKUN9XGYAJOSIIRq5?darkMode=true" width="100%" height="100%" style="border: none;"></iframe>

Users will be able to create new expenses that are associated with a single category, but the categories will be pre-populated in the database.

**Notes:**

- amount should use the `numeric` type to handle money correctly. `numeric("amount", { precision: 10, scale: 2 })`.
- Date will only contain the date value (day, month, year), not the entire timestamp. `date("date")`.
- categoryId will need a foreign key constarint to the categories table.

### Environment Variables

I've already made a database for you. Your database `name` and `username` are both your username in d2l. Your password is `a_secure_password_1`
So if your username is `johndoe` then your database name is `johndoe`, your username is `johndoe` and your password is `a_secure_password_1`.

```sh
MIGRATION_DATABASE_URL='postgres://johndoe:a_secure_password_1@ep-summer-scene-99893336.ap-southeast-1.aws.neon.tech/johndoe?sslmode=verify-full'
DATABASE_URL='postgres://johndoe:a_secure_password_1@ep-summer-scene-99893336.ap-southeast-1.aws.neon.tech/johndoe'
```

Copy and paste those urls into your `.env.local` file and do a find and replace to replace all `johndoe` with your D2L username.

### Push

You should be able to view your database in drizzle studio. If you do, you'll notice no tables yet.

Push the schema to your database https://www.nexttonone.lol/setup-drizzle#push

### Add Data

Use drizzle studio to add some custom categories, then add some expenses that are associated with those categories. You don't have to add many, just enough to test your app.

---

## View Expenses

When the page loads, select all the expenses from the database and display them in a list. Make sure you join the expenses table to the categories table so you can display the category name instead of the category id.

---

## Create Expense

### Create Expense Form Categories

You will need to query the categories from the database and display them in the select field. It will look something like this:

**parent server component**

```tsx
const categories = select().from(categories)

// ...

<CreateExpenseForm categories={categories}>
```

**CreateExpenseForm client component**

```tsx
"use client"
import { useState } from "react"

export default function CreateExpenseForm({
  categories,
}: {
  categories: Category[]
}) {

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  return (
    //...

  <select
    value={selectedCategory}
    onChange={handleChange}
  >
    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>

```

### Create Expense Server Action

When the user submits the form, the expense should be added to the database. To achieve this, you will need to create a server action that inserts the expense into the database, then call that server action from the client form component. Here are the requirements:

- Submitting the form should call the server action and pass all the form data to the server
- The client component should got into a loading state while the server action is running
- When the server succesfully creates the expense, the page should revalidate to show the new expense in the list **and** the form should reset to its initial state
- On error, the client should display the error message and the form should not reset
- Use server and client side validation to ensure that an expense description contains at least 3 characters.

---

## Delete Expense

When the user clicks the delete button, the expense should be deleted from the database. To achieve this, you will need to create a server action that deletes the expense from the database, then call that server action from the client component. Here are the requirements:

- Clicking the delete button should call the server action and pass the expense id to the server
- The client delete button should got into a loading state while the server action is running
- When the server succesfully deletes the expense, the page should revalidate to remove the expense from the list
- On error, the client should display the error message.

## Suspense

The form and the list of expenses both depend on a database query before they can be displayed. Use suspense to display a loading indicator while the queries are running. There should be two suspense boundaries, one for the form and one for the list of expenses. Something like this:

```tsx
<Suspense fallback={<CreateExpenseFormSkeleton />}>
  <CreateExpenseForm />
</Suspense>
<Suspense fallback={<ExpenseListSkeleton />}>
  <ExpenseList />
</Suspense>
```

`CreateExpenseForm` and `ExpenseList` will both need to be async server components that perform the database queries. You may need to wrap your existing components to make this work.

You get part marks for implementing suspense and the rest of the marks for implementing a skeleton for each suspsense boundary.

## View By Date

Implement a way of viewing expenses by date. You can do this however you want, but here's one way:

https://expenses-complete-5tym2pe6j-sa-m.vercel.app/

You can query for date equality using a JavaScript date object like this:

```ts
.where(eq(expensesTable.date, date.toISOString().split("T")[0]))
```

---

## Rubric

| Criteria                                                     | Points  | Comments |
| ------------------------------------------------------------ | ------- | -------- |
| Drizzle Schema Setup                                         | 10      |          |
| View Expenses                                                | 15      |          |
| Create Expense Form Categories                               | 10      |          |
| Create Expense Form Submission                               | 20      |          |
| Delete Expense                                               | 10      |          |
| Suspense                                                     | 10      |          |
| View By Date                                                 | 15      |          |
| code quality, css style, appropriate number of commits, etc. | 10      |          |
| **Total**                                                    | **100** |          |
