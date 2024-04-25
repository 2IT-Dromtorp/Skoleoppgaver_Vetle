import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { Equipment, User } from "../Types";
import { useQuery } from "@tanstack/react-query";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/Alert-dialog";

import { Button } from "@/components/ui/Button";
import { PutRequest, ReturnEquipment } from "@/hooks/UseApi";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { checkRoles } from "@/lib/utils";

export function DataTable() {
    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });
    const { data: equipment, refetch } = useQuery<Equipment[]>({
        queryKey: ["equipment"],
    });

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    async function handleReturn(id: string) {
        await ReturnEquipment(id);
        await refetch();
    }

    const columnHelper = createColumnHelper<Equipment>();
    const columns = [
        columnHelper.accessor("_id", {
            header: "Equipment id",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("name", {
            header: "Equipment name",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("available", {
            header: "Available",
            cell: (info) => info.getValue().toString(),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => (
                <>
                    {!checkRoles(["student"], user?.roles || []) ? (
                        <>
                            {info.row.original.burrower && (
                                <>
                                    <p>
                                        Equipment burrowed by{" "}
                                        {info.row.original.burrower.firstName}{" "}
                                        {info.row.original.burrower.lastName}
                                    </p>
                                    <Button
                                        onClick={() =>
                                            handleReturn(info.row.original._id)
                                        }
                                    >
                                        Return
                                    </Button>
                                </>
                            )}
                        </>
                    ) : (
                        <AlertDialog>
                            <AlertDialogTrigger
                                asChild
                                disabled={
                                    !info.row.original.available ||
                                    (user &&
                                        info.row.original.burrowRequesters.includes(
                                            user._id
                                        ))
                                }
                            >
                                <Button>Request</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        A request for {info.row.original.name}{" "}
                                        will be sent for {user?.loginName}!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            await PutRequest(
                                                info.row.original._id
                                            );
                                            await refetch();
                                        }}
                                    >
                                        Request
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </>
            ),
        }),
    ];
    const table = useReactTable({
        data: equipment ? equipment : [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    return (
        <div>
            <div className="rounded-md border bg-popover">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft />
                </Button>
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft />
                </Button>
                <p>
                    {pagination.pageIndex + 1}/{table.getPageCount()}
                </p>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight />
                </Button>
                <Button
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight />
                </Button>
                <Select
                    onValueChange={(e: any) => {
                        table.setPageSize(Number(e));
                    }}
                >
                    <SelectTrigger className="w-20">
                        <SelectValue placeholder={pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem
                                key={pageSize}
                                value={pageSize.toString()}
                            >
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
