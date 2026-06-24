import ReactPaginateImport, { type ReactPaginateProps } from "react-paginate";
const ReactPaginate = (
  "default" in ReactPaginateImport &&
  typeof ReactPaginateImport.default === "function"
    ? ReactPaginateImport.default
    : ReactPaginateImport
) as ComponentType<ReactPaginateProps>;
import css from "../Pagination/Pagination.module.css";
import type { ComponentType } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
    />
  );
}
