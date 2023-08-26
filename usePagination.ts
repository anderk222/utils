import { useState } from 'react';
export function usePagination(initial: PaginationArgs): UsePagination {

    const [pagination, setPagination] = useState(initial);

    return {
        pagination,
        ...pagination,
        back,
        next,
        determinate
    };

    function back(callback: simpleFunction) {

        setPagination((pagination) => {

            const page = pagination.page;

            if (!page || page == 1) return pagination;

            callback(page - 1);

            return { ...pagination, page: (page - 1) }
        });

    };

    function next(callback: simpleFunction) {

        setPagination((pagination) => {

            const page = pagination.page + 1;

            const totalPages = pagination.total / pagination.limit + 1;
            if (!totalPages) return pagination;

            if (totalPages <= page) return { ...pagination, page: Math.round(totalPages) };


            callback(page);

            return { ...pagination, page: (page ) }
        });


    };

    function determinate(n: number, callBack?: simpleFunction) {
        setPagination((pagination) => {

            if (!n || n == 1) return pagination;

            const totalPages = pagination.total / pagination.limit + 1;

            if (!totalPages) return pagination;

            if (totalPages <= n) return { ...pagination, page: Math.round(totalPages) };

            if (callBack) callBack(n);

            return { ...pagination, page: n };

        });

    };
};

type PaginationArgs = {
    limit: number;
    page: number;
    total: number;
}

export type UsePagination = PaginationArgs & {

    back: (callback: simpleFunction) => void;
    next: (callback: simpleFunction) => void;
    determinate: (n: number, callback?: simpleFunction) => void;
    pagination: PaginationArgs;

}

type simpleFunction = (page: number) => void
