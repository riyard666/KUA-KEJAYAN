import { useEffect, useState} from "react";
import type {NewsModel} from "@/model/news.model.tsx";
import {toast} from "sonner";
import NewsColumn from "@/components/NewsComponent/NewsColumn.tsx";
import {
    type ColumnFiltersState,
    getCoreRowModel, getPaginationRowModel, getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState
} from "@tanstack/react-table";
import {NewsTable} from "@/components/NewsComponent/NewsTable.tsx";
import {NewsPagination} from "@/components/NewsComponent/NewsPagination.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function  News() {
    const [data, setData] = useState<NewsModel[]>([]);
    const [sorting, setSorting] = useState<SortingState>([])
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            "https://script.google.com/macros/s/AKfycbzvVcygmNEShLz3iFBto7XhWtwcJCJ-C_3gspBOk2VPT-m-L_en_SEjg7vGIpT96bYy/exec"
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setTotalItems(data.length);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetch:", err);
                toast.error("Gagal memuat berita");
                setLoading(false);
            });
    }, [setLoading]);

    const columns = NewsColumn()

    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        pageCount: Math.ceil(totalItems / pagination.pageSize),
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <>
            <Button className="bg-emerald-700 hover:bg-emerald-600 mb-3" onClick={() => navigate('/admin/news-form')}>
                <Plus/> Tambah Berita
            </Button>
            <NewsTable table={table} columnsLength={columns.length} loading={loading}/>
            <NewsPagination table={table} />
        </>
    )
}