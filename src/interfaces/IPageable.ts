import IPageSort from "./IPageSort";

interface IPageable {
    pageNumber: number;
    pageSize: number;
    sort: IPageSort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export default IPageable;