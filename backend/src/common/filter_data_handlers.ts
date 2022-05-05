type DataModel<T> = Pick<T, Exclude<keyof T, 'dtime'>>;

export function FilterData<T>(array : T[]) : DataModel<T>[]{
    if (array.some(el => el === null)) {
        return [];
    }
    const data = array.filter((el : T) => !el.hasOwnProperty("dtime"))
    return data;
}