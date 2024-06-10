"use client";

import { TableMemo } from "@/components/Table";
import { Input } from "@/components/ui/input";
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

import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [subnetOptions, setSubnetOptions] = useState<any>([]);
  const [block, setBlock] = useState("fd00::/8");
  const [subnet, setSubnet] = useState({ value: "", label: "" });
  const [data, setData] = useState([] as any);

  const changeSubRedeOptions = useCallback(() => {
    const num = Number(block.split("/")[1]);

    const arr = [];

    for (let i = 64; i >= num; i--) {
      arr.push({
        value: 64 - i,
        label: `/${64 - i + num} (${Math.pow(2, 64 - i)} subnets)`,
      });
    }

    setSubnetOptions(arr);
    setSubnet({ value: "", label: "" });
  }, [block]);

  useEffect(() => changeSubRedeOptions(), [changeSubRedeOptions]);

  async function handleClick(v: string) {
    setSubnet(subnetOptions.find((x: any) => x.value === v));
    setData(
      await (await fetch(`/api/subnet?block=${block}&nSubnets=${v}`)).json()
    );
  }

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full py-3 2xl:py-10">
      <h1 className="text-3xl 2xl:text-4xl font-light tracking-wider">
        IPv6 Subnet Calculator
      </h1>
      <div className="flex justify-center items-center h-auto w-full">
        <div className="flex flex-col gap-5 2xl:gap-8 border-slate-800 border rounded-md p-4 2xl:p-6 w-3/4 2xl:w-3/5">
          <div className="flex gap-8">
            <div className="flex flex-1 flex-col gap-2 items-start">
              <Label>Network address block</Label>
              <Input value={block} onChange={(e) => setBlock(e.target.value)} />
            </div>
            <div className="flex flex-1 flex-col gap-2 items-start">
              <Label>Number of Subnets</Label>
              <Select
                onValueChange={(v) => handleClick(v)}
                value={subnet.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma sub-rede" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Subnets</SelectLabel>
                    {subnetOptions.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="text-xl text-slate-200 mb-2 2xl:mb-4">
              Subnet Details
            </h2>
            {data && <TableMemo data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}
