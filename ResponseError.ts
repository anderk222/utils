/*
It's a class to get message from failed http request, 
suposing body error response is : { "message" : "not founf" }
*/

class ResponseErrors {


    static getMessageError(error : any) : string{

      if(error?.status == 403) return "No tienes los permisos necesarios ❌";    


        const message = error.error?.message 
        ? error.error.message
        : error.name;

        return message + " ❌";


    }


}

export default ResponseErrors;
