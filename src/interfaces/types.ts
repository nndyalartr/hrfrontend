interface ApiParams{
    type:string,
    getApiEnabled:boolean
}
export interface Events extends ApiParams{
    date:string,
    name:string,
    shift:string,
    eventType:string,

}