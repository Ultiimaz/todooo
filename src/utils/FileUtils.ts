export function getStorage(){
    let state = localStorage.getItem("tasks");
    if(!state)
        return {};
    
    return JSON.parse(state);
}

export function save(state: any){
    localStorage.setItem("tasks",JSON.stringify(state));
}