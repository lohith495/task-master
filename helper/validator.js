class Validator{
    static validateTaskInfo(taskInfo){
        if(taskInfo.hasOwnProperty("id")){
            return{
                "status" : false,
                "message" : "Id should be auto-generated, shouldn't be provided by user"
            };
        }
        else if(taskInfo.hasOwnProperty("title") && taskInfo.hasOwnProperty("description") 
        && taskInfo.hasOwnProperty("completed") && typeof taskInfo.completed == "boolean"){
            return{
                "status" : true,
                "message" : "Validated Successfully"
            };
        }
        else{
            return{
                "status" : false,
                "message" : "Missing/incorrect required parameters in task info, make sure you provide them all correctly"
            };
        }
    }
}
module.exports = Validator;