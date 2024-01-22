import { baseService } from "./baseServices";

export class RateService extends baseService {
    constructor(){
        super()
    }

    setRate = (data)=>{
        return this.post(`/rate`,data)
    }
    getTotalRate = (id)=>{
        return this.get(`/rate/${id}`)
    }
    getYourRate = (id)=>{
        return this.get(`/rate/user/${id}`)
    }
    
}

export const rateService = new RateService()