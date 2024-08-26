import IFoodItem from "./IFoodItem";
import IPageable from "./IPageable";
import IPageSort from "./IPageSort";

interface IPageResponse {
    totalElements: number;
    totalPages: number;
    size: number;
    content: IFoodItem[];
    number: number;
    sort: IPageSort;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    pageable: IPageable;
    empty: boolean;
}

export default IPageResponse;