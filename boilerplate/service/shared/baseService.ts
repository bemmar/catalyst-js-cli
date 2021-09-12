import Model from "../../model/model";

export default class BaseService {
    constructor() {

    }

    get<TRequest, TResponse>(request: TRequest): TResponse {
        return null;
    }
}