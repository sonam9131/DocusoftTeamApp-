import {AllServiceParamerter} from "./AllServiceParameter";

export class AllService extends AllServiceParamerter {
  constructor(agrno, Email, password, APIUrl) {
    super(APIUrl, agrno, Email, password);
  }

  CallNewService(MethodName, callBack) {
    //console.log("returnValue", MethodName, callBack);
    var ParamName = "Param_" + MethodName;
    var data = JSON.stringify(this[ParamName]);
    // console.log("returnValue", data);
    //console.log("this",MethodName, this[ParamName]);
    super.Call(data, MethodName, function (returnValue) {
      var str = JSON.parse(JSON.stringify(returnValue));

      //console.log("this1",MethodName, returnValue);

      if (str != "" && str.d != "0") {
        return callBack(true, str.d);
      } else {
        return callBack(false, []);
      }
    });
  }
}