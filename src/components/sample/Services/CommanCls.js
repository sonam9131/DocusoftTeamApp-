import { AllService } from "./AllService";
import $ from "jquery";

export class CommanCLS extends AllService {
  constructor(agrno, Email, password, APIUrl) {
    super(agrno, Email, password, APIUrl);
    this.DuFoldermap = new Map();
    this.DuSectionmap = new Map();
    this.DuClientmap = new Map();
  }
  //get all contact by folderid
  Json_GetAccessToken(callBack) {
    super.CreateNewServiceParamObject("Json_GetAccessToken");
    super.CallNewService("Json_GetAccessToken", async function (status, Data) {
      if (status) {
        if ((await Data) != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        console.log("status", status);
        //return callBack(false, []);
       
      }
    });
  }
  Json_getViewerToken(callBack) {
    super.CreateNewServiceParamObject("Json_getViewerToken");
    super.CallNewService("Json_getViewerToken", async function (status, Data) {
      if (status) {
        if ((await Data) != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        console.log("status", status);
        //return callBack(false, []);
       
      }
    });
  }
  //Json_GetFolderData
  Json_GetFolderData(o, callBack) {
    super.CreateNewServiceParamObject("Json_GetFolderData", o, true);
    super.CallNewService("Json_GetFolderData", async function (status, Data) {
      if (status) {
        if ((await Data) != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        console.log("status", status);
      }
    });
  }

  CreatFolderOption(AllFolder, DefaultFolder) {
    //console.log("DefultFolder: ", DefultFolder);
    //console.log("AllFolder: ", AllFolder);
    $("#DU_Folder").empty();
    $(".DU_Folder").empty();
    this.DuFoldermap.clear();

    $("#DU_Folder").append(`<option selected>Select Folder</option>`);
    $(".DU_Folder").append(`<option selected>Select Folder</option>`);
    for (var i = 0; i < AllFolder.length; i++) {
      // console.log("AllFolder: ", AllFolder[i].Folder);
      this.DuFoldermap.set(AllFolder[i].FolderID, AllFolder[i].Folder);
      $("#DU_Folder").append('<option   value="' + AllFolder[i].FolderID + '">' + AllFolder[i].Folder + "</option>");
      $(".DU_Folder").append('<option   value="' + AllFolder[i].FolderID + '">' + AllFolder[i].Folder + "</option>");
 
    }
    //console.log("Map123", DuFoldermap);

    $("#DefultFolder").val(DefaultFolder);
    $("#DU_Folder").val(DefaultFolder);
    $(".DU_Folder").val(DefaultFolder);
    if (DefaultFolder != "-1" && DefaultFolder != "" && DefaultFolder != "undefined" && DefaultFolder != null) {
      console.log("DefaultFolder333",DefaultFolder);
      Json_GetUDF(DefaultFolder);
    }
  }

  CreatSections(AllSections, DefaultSections) {
    $("#DU_Section").empty();
    $("#DU_Section").append('<option selected="">Select Section</option>');
    $(".DU_Section").empty();
    $(".DU_Section").append('<option selected="">Select Section</option>');
    var section1 = "";
    var subsection = [];
    this.DuSectionmap.clear();
    for (var i = 0; i < AllSections.length; i++) {
      //  if (DuSectionmap.has(AllSections[i].SecID) != true) {
      this.DuSectionmap.set(AllSections[i].SecID, AllSections[i].Sec);
      if (AllSections[i].SubSecID != null) {
        if (AllSections[i].SecID != section1) {
          $("#DU_Section").append('<option   value="' + AllSections[i].SecID + '">' + AllSections[i].Sec + "</option>");
          section1 = AllSections[i].SecID;
          $(".DU_Section").append('<option   value="' + AllSections[i].SecID + '">' + AllSections[i].Sec + "</option>");
          section1 = AllSections[i].SecID;
       
        }
        var obj = {};
        obj.SubSectionID = AllSections[i].SubSecID;
        obj.SubSection = AllSections[i].SubSec;
        //console.log("SubSectionID", AllSections[i].SubSecID);
        //console.log("SubSection", AllSections[i].SubSec);
        subsection.push(obj);
      } else {
        $("#DU_Section").append('<option   value="' + AllSections[i].SecID + '">' + AllSections[i].Sec + "</option>");
        $(".DU_Section").append('<option   value="' + AllSections[i].SecID + '">' + AllSections[i].Sec + "</option>");
     
      }
      // }
    }
    // $("#DU_Section").val(DefaultSections);
    if (subsection.length > 0) {
      // console.log("subsection", subsection);
      //CreatSubSections(subsection);
    }

    if (DefaultSections != "-1" && DefaultSections != "" && DefaultSections != "undefined" && DefaultSections != null) {
      $("#workflow").show();
      $("#HideCategory").show();
      $("#SubSection").show();
      //Json_GetUserComments();
      //Json_GetSubSections(DefaultSections);
      //////////alert(ProjectId);
      //Json_GetForwardUserList(DefaultSections, ProjectId);
      //Json_GetCategory_Discription(DefaultSections);
    }
    // console.log("Map123", DuSectionmap);
  }

  CreatReference(AllReference, DefaultReference) {
    $("#DU_Reference").empty();
    $("#DU_Reference").append('<option selected>Select Reference</option>');
    
    this.DuClientmap.clear();
    for (var i = 0; i < AllReference.length; i++) {
      this.DuClientmap.set(AllReference[i].ClientID, AllReference[i].Client);
      $("#DU_Reference").append(
        '<option   value="' + AllReference[i].ClientID + '">' + AllReference[i].Client + "</option>"
      );
    }
    //$("#DU_Reference").val(DefaultReference);
    // console.log("Map123", DuClientmap);
  }

  

  SETDate(date) {
    var d = new Date(date);
    var dd = d.getDate();
    var mm = d.getMonth() + 1;

    var yy = d.getFullYear();
    var DateVal;
    if (mm < "10") {
      if (dd < "10") {
        return (DateVal = yy + "/0" + mm + "/0" + dd);
      } else {
        return (DateVal = yy + "/0" + mm + "/" + dd);
      }
    } else {
      return (DateVal = yy + "/" + mm + "/" + dd);
    }
  }

  cuureantDate() {
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth() + 1;

    var yy = d.getFullYear();
    var date;
    if (mm < "10") {
      if (dd < "10") {
        return (date = yy + "-0" + mm + "-0" + dd);
      } else {
        return (date = yy + "-0" + mm + "-" + dd);
      }
    } else {
      return (date = yy + "-" + mm + "-" + dd);
    }
  }

  Json_GetFolders(callBack) {
    super.CreateNewServiceParamObject("Json_GetFolders");
    super.CallNewService("Json_GetFolders", async function (status, Data) {
      if (status) {
        if ((await Data) != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        console.log("status", status);
      }
    });
  }

  Json_GetClientsByFolder(FolderId, callBack) {
    let o = { ProjectId: FolderId };
    super.CreateNewServiceParamObject("Json_GetClientsByFolder", o, true);
    super.CallNewService("Json_GetClientsByFolder", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
  Json_GetUDF(FolderId, callBack) {
    let o = { ProjectId: FolderId };
    super.CreateNewServiceParamObject("Json_GetUDF", o, true);
    super.CallNewService("Json_GetUDF", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
  Json_GetSubSections(obj, callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_GetSubSections", obj, true);
    super.CallNewService("Json_GetSubSections", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
 
  Json_RegisterItem(base64,callBack) {
     // var For_Action_array = [];
    // var For_Information_array = [];
    // var UDF_array = [];
    // $(".FA")
    //   .filter(":checked")
    //   .each(function () {
    //     For_Action_array.push(this.value);
    //   });
    // $(".FI")
    //   .filter(":checked")
    //   .each(function () {
    //     For_Information_array.push(this.value);
    //   });
    // $(".udfVal").each(function () {
    //   udf_id = this.id;
    //   var Udf_val = this.value;
    //   var udf_val = udf_id.substr(3) + ":" + Udf_val.replace(",", ":");
    //   UDF_array.push(udf_val);
    // });

    //console.log("For_Action_array", For_Action_array.join(","));
    //console.log("For_Information_array", For_Information_array.join(","));
    //console.log("UDF_array", UDF_array.join(","));
    var FolderId;


    var docDirection = "Incoming";
    if ($("#FolderName").val() == "Sent") {
      docDirection = "Outgoing";
      //$("#chkbox").prop('checked', false);
    }

    
    
    var clientID = $("#DU_Reference").val();
    var SectionId = $("#DU_Section").val();
    var clientname = this.DuClientmap.get(clientID);
    var CategoryId = ""; //$("#DU_Category").val();
    var SubSection = ""; //$("#DU_SubSection").val();
    var SectionName = this.DuSectionmap.get(parseInt(SectionId));
    var FolderName = this.DuFoldermap.get(parseInt(FolderId));
    //var receiveDate = SETDate($("#DU_ReceivedOn").val());    
    var actionDate = this.SETDate(this.cuureantDate());
    var receiveDate = "1990/01/01";
    if (this.SETDate($("#DU_ReceivedOn").val()) != "NaN/NaN/NaN") {
      receiveDate = this.SETDate($("#DU_ReceivedOn").val());
    }
    console.log(receiveDate,"receiveData");
    var actionByDate = "1900/01/01";
    if (this.SETDate($("#DU_ActionDate").val()) != "NaN/NaN/NaN") {
      actionByDate = this.SETDate($("#DU_ActionDate").val());
    }
    var docViewedDate = this.SETDate(this.cuureantDate());
    var url = Office.context.document.url;

    var fileName = url.substring(url.lastIndexOf("\\") + 1);

  if (typeof fileName != "undefined" && fileName != null && fileName != "") {
       console.log("nodata");
  } else {
     fileName = "myfile.pptx";
  }
    //console.log("DuClientmap.get(key)", DuClientmap.get(clientID));

    //console.log(" DuFoldermap.get(key)", DuFoldermap.get(parseInt(FolderId)));

    //console.log(" DuSectionmap.get(key)", DuSectionmap.get(parseInt(SectionId)));

    var docViewedDate = this.SETDate($("#DU_DocumentDate").val());

    //console.log("For_Action_array", For_Action_array.join(","));
    // console.log("For_Information_array", For_Information_array.join(","));
    // console.log("UDF_array", UDF_array.join(","));
    // let o = {
    //   deptId: "0",
    //   sectionId: SectionId,
    //   folderId: FolderId,
    //   categoryId: CategoryId,
    //   subSectionId: SubSection,
    //   retForMonth: "-1",
    //   deptName: "",
    //   folderName: FolderName,
    //   originatorId: clientID,
    //   senderId: clientID,
    //   sectionName: SectionName,
    //   extDescription: $("#DU_CommentText").val(),
    //   docDirection: docDirection,
    //   description: "",
    //   stickyNote: $("#DU_DescriptionText").val(),
    //   fileName: "",
    //   forActionList: "",
    //   forInformationList: "",
    //   forGroupList: "",
    //   uDFList: "",
    //   sUDFList: "",
    //   clientname: clientname,
    //   receiveDate: receiveDate,
    //   actionByDate: actionByDate,
    //   actionDate: actionDate,
    //   docViewedDate: localStorage.getItem("docdata"),

    //   strtxt64: base64,
    //   EmailMessageId: "",
    // };
    let DU_Folder = $("#DU_Folder").val();
    if(DU_Folder){
      DU_Folder=parseInt($("#DU_Folder").val());
      
   }
   else{
     console.log("elect folder");
    $("#loginerror1").show();
     // Automatically hide the error message after 5000 milliseconds (5 seconds)
  setTimeout(function () {
    $("#loginerror1").hide();
  }, 5000);
     return false;
   }

   let DU_Section = $("#DU_Section").val();
   if(DU_Section){
     DU_Section=parseInt($("#DU_Section").val());
     
  }
  else{
    console.log("elect folder");
   $("#loginerror1").show();
    // Automatically hide the error message after 5000 milliseconds (5 seconds)
  setTimeout(function () {
    $("#loginerror1").hide();
  }, 5000);
    return false;
  }

  let DU_Reference = $("#DU_Reference").val();
  if(DU_Reference){
    DU_Reference=parseInt($("#DU_Reference").val());
    
 }
 else{
   console.log("elect folder");
  $("#loginerror1").show();
   // Automatically hide the error message after 5000 milliseconds (5 seconds)
   setTimeout(function () {
    $("#loginerror1").hide();
  }, 5000);
   return false;
 }
   
    
    let o ={
      "deptId": 0,
      "sectionId": DU_Section,//SectionId,
      "folderId": DU_Folder,//FolderId,
      "categoryId": parseInt($("#DU_category1").val()) ? parseInt($("#DU_category1").val()) : -1,//CategoryId,
      "subSectionId": parseInt($("#DU_Subsection1").val()) ? parseInt($("#DU_Subsection1").val()) : -1,//SubSection,
      "retForMonth": -1,
      "deptName": "",
      "folderName": FolderName ? FolderName : "",
      "originatorId": DU_Reference ? DU_Reference : -1,
      "senderId": DU_Reference ? DU_Reference : -1,
      "sectionName": SectionName ? SectionName : "",
      "extDescription": $("#txtComments1").val() ? $("#txtComments1").val() :"",
      "docDirection": docDirection ? docDirection : "",
      "description": $("#descriptionfol").val() ? $("#descriptionfol").val() : "",
      "priority": "",
      "stickyNote": $("#DU_DescriptionText").val() ? $("#DU_DescriptionText").val() : "",
      "fileName": fileName,
      "forActionList": "",
      "forInformationList": "",
      "forGroupList": "",
      "uDFList": "1:18/19,2:2019,3:,4:",
      "sUDFList": "",
      "clientname": clientname ? clientname : "",
      "receiveDate": receiveDate ? receiveDate : "",
      "actionByDate": actionByDate ? actionByDate : "",
      "actionDate": actionDate ? actionDate : "",
      "docViewedDate": localStorage.getItem("docdata") ? localStorage.getItem("docdata") : "",
      "strb64": base64,
      "strtxt64": "",
      "EmailMessageId": ""
  }
     console.log(o,"ragisteritemdata");
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_RegisterItem", o, true);
    super.CallNewService("Json_RegisterItem", function (status, Data) {
      if (status) {
        
        if (Data != "") {
          console.log(Data,"test  ")
         return callBack(true, Data);
        } else {
        return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }

  Json_GetCategory(obj, callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_GetCategory", obj, true);
    super.CallNewService("Json_GetCategory", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
  Json_GetForwardUserList(obj, callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_GetForwardUserList", obj, true);
    super.CallNewService("Json_GetForwardUserList", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
  Json_GetUserComments(callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_GetUserComments",false);
    super.CallNewService("Json_GetUserComments", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }

  Json_SearchDocById(obj, callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_SearchDocById", obj, true);
    super.CallNewService("Json_SearchDocById", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
  Json_GetUserDescription(obj, callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_GetUserDescription", obj, true);
    super.CallNewService("Json_GetUserDescription", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
  Json_AddToWork(obj, callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_AddToWork", obj, true);
    super.CallNewService("Json_AddToWork", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
  Json_AddAttachment(obj, callBack) {

    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_AddAttachment", obj, true);
    super.CallNewService("Json_AddAttachment", function (status, Data) {
      if (status) {
        if (Data != "") {
          console.log("Upload File ",Data)
         // return callBack(true, Data);
        } else {
          //return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
  Json_GetAttachmentsByItemId(obj, callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_GetAttachmentsByItemId", obj, true);
    super.CallNewService("Json_GetAttachmentsByItemId", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }

  Json_GetAgreementList(obj,callBack) {
    //let o = { ProjectId: FolderId,SectionId: };
    super.CreateNewServiceParamObject("Json_GetAgreementList", obj, false);
    super.CallNewService("Json_GetAgreementList", function (status, Data) {
      if (status) {
        if (Data != "") {
          return callBack(true, Data);
        } else {
          return callBack(false, []);
        }
      } else {
        // console.log("status", status);
      }
    });
  }
} //end Class