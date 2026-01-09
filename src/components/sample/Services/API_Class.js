import $ from "jquery";
export class API {
  constructor(APIURL) {
    this.APIURL = APIURL;
  }
  Call(data, methosName, callback) {
    //console.log('data:  ', data,methosName);

    var FullAPIURl = this.APIURL + methosName;

    if (data !== "") {
      $.ajax({
        type: "POST",
        url: FullAPIURl,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
          callback(msg);
        },
        error: function (e) {
          ////////////////////alert(e.statusText + " failed");
          console.log("Network Error !\n Please check your data connection ! Try again");
          callback(e);
        },
      });
    } else {
      ////////////////////alert("else");
      $.ajax({
        type: "POST",
        url: FullAPIURl,
        data: "{}",
        // contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
          callback(msg);
        },
        error: function (e) {
          console.log("Network Error !\n Please check your data connection ! Try again");
        },
      });
    }
  }

  mgsConst(txt, cls) {
    var htmlt = '<div class="alert alert-info" role="alert">' + txt + "</div>";
    $("." + cls).html(htmlt); //also show a success message
    $("." + cls)
      .delay(1000)
      .fadeOut("slow");
  }

  CallAPI(data, APIURL, methosName, callback) {
    //console.log('data:  ', data,methosName);
    var lhost = location.host;
    var prt = location.protocol;
    var FullAPIURl = prt + "//" + lhost + "/" + APIURL + methosName;
    console.log("FullAPIURl", FullAPIURl);
    if (data !== "") {
      $.ajax({
        type: "POST",
        url: FullAPIURl,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
          callback(msg);
        },
        error: function (e) {
          ////////////////////alert(e.statusText + " failed");
          console.log("Network Error !\n Please check your data connection ! Try again");
        },
      });
    } else {
      ////////////////////alert("else");
      $.ajax({
        type: "POST",
        url: FullAPIURl,
        data: "{}",
        // contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
          callback(msg);
        },
        error: function (e) {
          console.log("Network Error !\n Please check your data connection ! Try again");
        },
      });
    }
  }
}