"use client";
import { Button } from "../@/components/ui/button";
import { Center } from "@repo/ui/center";
import { Input } from "../@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
            <CardDescription>Send Money in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Mobile No.</Label>
                  <Input
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    id="name"
                    placeholder="Mobile No.Of Reciever"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Amount</Label>
                  <Input
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    id="name"
                    placeholder="Amount to be Sent"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => {
                p2pTransfer(number, Number(amount));
              }}
            >
              Send
            </Button>
          </CardFooter>
        </Card>

        {/* <Card title="Send">
          <div className="min-w-72 pt-2">
            <Label>Number</Label>
            <Input
              placeholder="Number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <Label>Amount</Label>
            <Input
              placeholder={"Amount"}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await p2pTransfer(number, Number(amount) * 100);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card> */}
      </Center>
    </div>
  );
}
