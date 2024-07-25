import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback } from "./avatar"; // Assuming avatar components are imported correctly
import { useSession } from "next-auth/react";

export function RecentSales() {
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const session = useSession();

  useEffect(() => {
    axios.get("/api/alltransactions").then((res) => {
      const data = res.data.allTransactions;
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-8">
      {transactions.map((transaction: any) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {session.data?.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.name}
            </p>
            <p className="text-sm text-muted-foreground">{transaction.type}</p>
          </div>
          <div className="ml-auto font-medium">
            +RS.{transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
