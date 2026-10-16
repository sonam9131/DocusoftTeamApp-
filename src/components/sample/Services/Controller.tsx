
import CallApi from "./Apicall";

const getFolder=(obj:any,callback:any)=>{
    CallApi(obj,"Json_GetFolderData",function(res:any){
        console.log("Json_GetFolderData",res);
        callback(res)
     })
}

const Json_GetFolders=(obj:any,callback:any)=>{
    CallApi(obj,"Json_GetFolders",function(res:any){
        console.log("Json_GetFolders",res);
        callback(res)
     })
}

const Json_GetConfiguration=(obj:any,callback:any)=>{
  CallApi(obj,"Json_GetConfiguration",function(res:any){
      console.log("Json_GetConfiguration",res);
      callback(res)
   })
}


const Json_AddClient=(obj:any,callback:any)=>{
  CallApi(obj,"Json_AddClient",function(res:any){
      console.log("Json_AddClient",res);
      callback(res)
   })
}

const Json_GetClientsByFolder=(obj:any,callback:any)=>{
  CallApi(obj,"Json_GetClientsByFolder",function(res:any){
      console.log("Json_GetClientsByFolder",res);
      callback(res)
   })
}

const Json_GetAgreementList=(obj:any,callback:any)=>{
    CallApi(obj,"Json_GetAgreementList",function(res:any){
        console.log("Json_GetAgreementList",res);
        callback(res)
     })
}
const Json_GetAllSupplierList=(obj:any,callback:any)=>{
  CallApi(obj,"Json_GetAllSupplierList",function(res:any){
      console.log("Json_GetAllSupplierList",res);
      callback(res)
   })
}
const Json_GetAccessToken=(obj:any,callback:any)=>{
    CallApi(obj,"Json_GetAccessToken",function(res:any){
        console.log("Json_GetAccessToken",res);
        callback(res)
     })
}
const Json_AddToFavourite=(obj:any,callback:any)=>{
  CallApi(obj,"Json_GetAccessToken",function(res:any){
      console.log("Json_GetAccessToken",res);
      callback(res)
   })
}
const Json_GetToFavourites=(obj:any,callback:any)=>{
  CallApi(obj,"Json_GetAccessToken",function(res:any){
      console.log("Json_GetAccessToken",res);
      callback(res)
   })
}
const Json_GetCCodeClientsByFolder=(obj:any,callback:any)=>{
  CallApi(obj,"Json_GetAccessToken",function(res:any){
      console.log("Json_GetAccessToken",res);
      callback(res)
   })
}
const Json_RemoveToFavourite=(obj:any,callback:any)=>{
  CallApi(obj,"Json_GetAccessToken",function(res:any){
      console.log("Json_GetAccessToken",res);
      callback(res)
   })
}

const getUsersMSTeam=(obj:any,callback:any)=>{
  CallApi(obj,"getUsersMSTeam",function(res:any){
      console.log("getUsersMSTeam",res);
      callback(res)
   })
}
const Json_getMSTeamsTabList=(obj:any,callback:any)=>{
  CallApi(obj,"Json_getMSTeamsTabList",function(res:any){
      console.log("Json_getMSTeamsTabList",res);
      callback(res)
   })
}
const getMSTeamsTemplatesList=(obj:any,callback:any)=>{
  CallApi(obj,"getMSTeamsTemplatesList",function(res:any){
      console.log("getMSTeamsTemplatesList",res);
      callback(res)
   })
}
const deleteMSTeamsTemplateById=(obj:any,callback:any)=>{
  CallApi(obj,"deleteMSTeamsTemplateById",function(res:any){
      console.log("deleteMSTeamsTemplateById",res);
      callback(res)
   })
}
const updateMSTeamsTemplate=(obj:any,callback:any)=>{
  CallApi(obj,"updateMSTeamsTemplate",function(res:any){
      console.log("updateMSTeamsTemplate",res);
      callback(res)
   })
}
const getMSTeamsTemplatesDetailsById=(obj:any,callback:any)=>{
  CallApi(obj,"getMSTeamsTemplatesDetailsById",function(res:any){
      console.log("getMSTeamsTemplatesDetailsById",res);
      callback(res)
   })
}
export default getFolder;
export {
    Json_GetFolders,
    Json_GetAgreementList,
    Json_GetAccessToken,
    Json_GetConfiguration,
    Json_AddClient,
    Json_GetClientsByFolder,
    Json_AddToFavourite,
    Json_GetToFavourites,
    Json_RemoveToFavourite,
    Json_GetCCodeClientsByFolder,
    getUsersMSTeam,
    Json_getMSTeamsTabList,
    getMSTeamsTemplatesList,
    deleteMSTeamsTemplateById,
    updateMSTeamsTemplate,
    getMSTeamsTemplatesDetailsById
}
