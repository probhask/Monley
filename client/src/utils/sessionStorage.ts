
export const checkSessionStorage = (key:string) => {
    if (sessionStorage.getItem('monleySession')) {
        const ss = JSON.parse(sessionStorage.getItem('monleySession') as string)[key];
        
    // console.log(ss,typeof ss,key);
    if (ss ) {
        return ss;
    }
    else {
        return false;
    }
    } else {
        return false
    }
}
export const removeSession = () => {
    sessionStorage.clear()
    sessionStorage.removeItem('monleySession');
}
export const setSessionStorage =<T> (key: string, value: T) => {
    // console.log("key and value", key, value);
    const ssValue = JSON.parse(sessionStorage.getItem('monleySession') as string);
    // console.log("before set", ssValue);
    if(ssValue)
    {
     ssValue[key] = value;
    // console.log("after set", ssValue);
    sessionStorage.setItem('monleySession',JSON.stringify(ssValue));
    } else {
        const data={[key]:value}
        sessionStorage.setItem('monleySession',JSON.stringify(data))
    }
    
}

export const setFilterSession = (filetrObj: object):void=> {
    sessionStorage.setItem("monleyFilter", JSON.stringify(filetrObj))
}
export const getFilterSession = ():object|null => {
    const filter = sessionStorage.getItem("monleyFilter");
    const parseFilter = JSON.parse(filter as string);
    return parseFilter||null;
}
export const getFilterSessionByKey = <T>(key: string): T|null => {
    if (key) {
        const item = JSON.parse(sessionStorage.getItem("monleyFilter") as string)[key] || null;
        return item ;
    }
    return null
}
export const resetFilterSession = ():void => {
    sessionStorage.setItem('monleyFilter',JSON.stringify({ category:"all",
        order:"asec",
        gender:"all",
        minPrice:400,
        maxPrice:5000,}));
}