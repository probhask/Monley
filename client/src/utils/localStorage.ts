export const checkLocalStorage = (key?: string) => {
    if (localStorage.getItem('monleyUser')) {
         let ls;
    if (key) {
        ls=JSON.parse(localStorage.getItem('monleyUser')as string )[key] ;
    }
    else {
        ls = JSON.parse(localStorage.getItem('monleyUser') as string);
    }
    // console.log(key,ls);
    if (ls) {
        return ls;
    }
    else{
        return false;
    }
    } else {
        return undefined
    }
   

}