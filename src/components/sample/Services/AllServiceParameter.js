import { API } from "./API_Class";

export class AllServiceParamerter extends API {
  constructor(APIUrl, agrno, Email, password) {
    super(APIUrl);
    var Obj = {};
    Obj.agrno = agrno;
    Obj.Email = Email;
    Obj.password = password;
    this.MainObj = Obj;
  }

  CreateNewServiceParamObject(name, value, mainBool) {
    var ParamName = "Param_" + name;
    var Obj = this.MainObj;
    if (mainBool) {
      this[ParamName] = { ...Obj, ...value };
    } else if (value) {
      this[ParamName] = value;
    } else {
      this[ParamName] = Obj;
    }
  }
}