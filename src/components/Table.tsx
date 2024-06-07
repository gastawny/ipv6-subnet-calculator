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
import { ScrollArea } from "@/components/ui/scroll-area";
import { memo } from "react";

function MemoizedTable({ data }: { data: any }) {
  console.log(data);

  return (
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
          {data.map((d: any, i: number) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{d?.paymentStatus}</TableCell>
              <TableCell>{d?.paymentMethod}</TableCell>
              <TableCell className="text-right">{d?.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export const TableMemo = memo(MemoizedTable);
