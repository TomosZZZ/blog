import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import {
  FaChevronRight,
  FaChevronLeft,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import React from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const goToPage = (page: number) => {
    table.setPageIndex(page - 1);
  };

  const baseBtn =
    "h-8 w-8 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-200 transform";
  const activeBtn =
    "bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-700/30 hover:-translate-y-0.5";
  const inactiveBtn =
    "bg-zinc-800 text-gray-200 hover:bg-zinc-700 border border-zinc-700 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-700/20";
  const iconBtn =
    "bg-zinc-800 text-gray-200 hover:bg-zinc-700 border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-700/20";

  let visiblePages: number[] = [];

  if (totalPages <= 6) {
    visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (endPage - startPage < 4) {
      if (startPage === 1) endPage = Math.min(5, totalPages);
      else if (endPage === totalPages) startPage = Math.max(totalPages - 4, 1);
    }

    visiblePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      <button
        className={`${baseBtn} ${iconBtn}`}
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      >
        <FaAngleDoubleLeft size={14} />
      </button>

      <button
        className={`${baseBtn} ${iconBtn}`}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <FaChevronLeft size={14} />
      </button>

      {totalPages > 6 && visiblePages[0] > 1 && (
        <>
          <button
            className={`${baseBtn} ${inactiveBtn}`}
            onClick={() => goToPage(1)}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`${baseBtn} ${
            page === currentPage ? activeBtn : inactiveBtn
          } ${page === currentPage ? "translate-y-[-2px]" : ""}`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      {totalPages > 6 && visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-gray-400">...</span>
          )}
          <button
            className={`${baseBtn} ${inactiveBtn}`}
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={`${baseBtn} ${iconBtn}`}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <FaChevronRight size={14} />
      </button>

      <button
        className={`${baseBtn} ${iconBtn}`}
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        <FaAngleDoubleRight size={14} />
      </button>
    </div>
  );
};
