
// Where is the order_id needed is when we can add things 

// AddComponent(component_type, order_id_before, order_id_after)
    // 1)  need to shift all the after components by 1 (unless component_id_after == -1)
        // order_id == component_id_before+1
        // for each order_id 
    // 2)  generate new id in database 
    // 3)  submit to database 

// RemoveComponent(component_type, )
export const defaultPages = {
    0: "Home",
    1: "Quick Note",
    2: "Task List",
    3: "Journal"
}