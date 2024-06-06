"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect, useState } from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Home() {
  const [subRedesOptions, setsubRedesOptions] = useState<any>([]);
  const [bloqueio, setBloqueio] = useState("fd00::/8");
  const [subRede, setSubRede] = useState({ value: "", label: "" });
  const [data, setData] = useState({} as any);

  useEffect(() => {
    (async () =>
      setData(
        await (
          await fetch("http://localhost:3000/api/redes?bloqueio=4&nSubRedes=3")
        ).json()
      ))();
  }, []);

  const changeSubRedeOptions = useCallback(() => {
    const num = Number(bloqueio.split("/")[1]);

    const arr = [];

    for (let i = 64; i >= num; i--) {
      arr.push({
        value: 64 - i,
        label: `/${64 - i + num} (${Math.pow(2, 64 - i)} subnets)`,
      });
    }

    setsubRedesOptions(arr);
    setSubRede({ value: "", label: "" });
  }, [bloqueio]);

  useEffect(() => changeSubRedeOptions(), [changeSubRedeOptions]);

  return (
    <>
      <h1 className="absolute top-8 left-1/2 -translate-x-1/2 text-3xl font-light tracking-wider">
        Calculadora IPv6 de sub-rede
      </h1>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-8 border-slate-800 border rounded-md p-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-8">
              <div className="flex flex-col gap-2 items-start">
                <Label>Bloqueio de endereço de rede</Label>
                <Input
                  value={bloqueio}
                  onChange={(e) => setBloqueio(e.target.value)}
                  className="w-80"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <Label>Número de sub-redes</Label>
                <Select
                  onValueChange={(v) =>
                    setSubRede(
                      subRedesOptions.filter((obj: any) => obj.value == v)[0]
                    )
                  }
                  value={subRede.value}
                >
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="Selecione uma sub-rede" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sub-redes</SelectLabel>
                      {subRedesOptions.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button size="lg">Calcular</Button>
          </div>
          <Separator />
          <div>
            <h2 className="text-xl text-slate-200 mb-4">
              Detalhes da sub-rede
            </h2>
            <ScrollArea className="h-[20rem] 2xl:h-[28rem]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Subnet ID</TableHead>
                    <TableHead>Subnet Address </TableHead>
                    <TableHead>Host Address Range </TableHead>
                    <TableHead className="text-right">Notation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, i) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
