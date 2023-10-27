export default async function LoadingExpenses() {
    return (
        <div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Expenses</h2>
                <div>
                    {new Array(3).fill(0).map((item, index) => (
                        <div key={index} className="bg-gray-300 dark:bg-gray-900 p-4 rounded-xl shadow-md mb-4 flex justify-between items-center">
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Total Expenses</h2>
                <p className="text-lg font-bold">Loading ...</p>
            </div>
        </div>
    );
}