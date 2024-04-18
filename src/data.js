// import moment from 'moment'

export const API_KEY = "AIzaSyBFkI0By61mD98ref3Lv1Iya2RPhyC-ars";



export const valueConverter = (value)=>{
if(value>=1000000){
    return Math.floor(value/1000000)+"M"

}
else if(value>=1000){
    return Math.floor(value/1000)+"K"

}
else{
    return value
}
}

// export const publishedDate = moment(item.snippet.publishedAt);





