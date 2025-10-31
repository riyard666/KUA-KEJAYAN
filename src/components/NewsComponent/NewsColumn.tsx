import type {ColumnDef} from "@tanstack/react-table";
import type {NewsModel} from "@/model/news.model.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown} from "lucide-react";
import {FormatDate} from "@/utils/format.ts";

export const  NewsColumn = ():ColumnDef<NewsModel> [] => {
    return (
        [
            {
                accessorKey: "judul",
                header: "Judul",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("judul")}</div>
                ),
            },
            {
                accessorKey: "penulis",
                header: "Nama Penulis",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("penulis")}</div>
                ),
            },
            {
                accessorKey: "tanggal",
                header: ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Tanggal Pembuatan
                            <ArrowUpDown />
                        </Button>
                    )
                },
                cell: ({ row }) => <div className="lowercase">{FormatDate(row.original.tanggal)}</div>,
            },

        ]
    )
}

export default NewsColumn;