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
  return (
    <ScrollArea className="h-[22rem] 2xl:h-[28rem]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Subnet ID</TableHead>
            <TableHead>Subnet Address </TableHead>
            <TableHead>Host Address Range </TableHead>
            <TableHead>Notation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d: any, i: number) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{d.subnetID}</TableCell>
              <TableCell>{d.subnetAddress}</TableCell>
              <TableCell>
                {d.hostAddressRange.start} - {d.hostAddressRange.end}
              </TableCell>
              <TableCell>{d.notation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export const TableMemo = memo(MemoizedTable);
