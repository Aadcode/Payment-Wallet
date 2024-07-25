"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import React, { useEffect, useState } from "react";
import { RecentSales } from "../@/components/ui/recent-sales";

const Transactions = () => {
  return (
    <div className="m-6">
      <div className="min-h-full">
        <Card className="h-full overflow-hidden">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="h-screen overflow-auto">
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
