import React, { useCallback } from "react";
import MUIPagination from "@mui/material/Pagination";
import { TBlog, TPaginateDetail } from "@/global/types";
import { useCRouter } from "@/hooks/useCRouter";
import { useTheme } from "@/containers/Providers/ThemeProvider";

export interface IPagination {
  paginateDetail: TPaginateDetail;
}

const Pagination = (props: IPagination) => {
  const { paginateDetail } = props;

  const router = useCRouter();
  const { theme } = useTheme();

  const handlePaginate = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      router.pushHere({ page: page });
    },
    [paginateDetail]
  );

  return paginateDetail.totalPages > 1 ? (
    <div className="flex justify-center items-center">
      <MUIPagination
        page={paginateDetail.page}
        count={paginateDetail.totalPages}
        onChange={handlePaginate}
        hidePrevButton={!paginateDetail.hasPrevPage}
        hideNextButton={!paginateDetail.hasNextPage}
        variant="outlined"
        shape="rounded"
        className="mt-10 bg-transparent dark:bg-gray-dark py-1 px-5 rounded-md dark:shadow"
        color={theme === "light" ? "standard" : "primary"}
      />
    </div>
  ) : null;
};

export default Pagination;
