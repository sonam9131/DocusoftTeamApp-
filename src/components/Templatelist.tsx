import React, { useCallback, useEffect, useState } from "react";
import ODataStore from "devextreme/data/odata/store";

import DataGrid, {
  Column,
  DataGridTypes,
  Editing,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Selection,
} from "devextreme-react/data-grid";
import DiscountCell from "./DiscountCell";
import { Client } from "./sample/Client";
import CallApi, { CallApiphp } from "./sample/Services/Apicall";
import './sample/css/App1.css';
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarIcon from '@mui/icons-material/Star';
import Checkbox from "@mui/material/Checkbox";
import EditAdmin from "./EditAdmin";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const pageSizes = [10, 25, 50, 100];
const YellowStarIcon = styled(StarIcon)({
  color: "yellow",
});
const dataSourceOptions = {
  store: new ODataStore({
    version: 2,
    url: "https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes",
    key: "Id",
    beforeSend(request: any) {
      const year = new Date().getFullYear() - 1;
      request.params.startDate = `${year}-05-10`;
      request.params.endDate = `${year}-5-15`;
    },
  }),
};
let folderData: any;
let fevData: any;
let clientData: any;
const Templatelist = (props:any) => {
  const {setIsviblebutton}=props;
    console.log(props,"templateprops")
  const [folders, setFolders] = useState([]); // State to hold folders data
  const [collapsed, setCollapsed] = useState(true);
  const [showH1, setShowH1] = useState([]); // State to control visibility
  const [showEmployeeInfo, setShowEmployeeInfo] = useState(false);
  const [selectedRowPicture, setSelectedRowPicture] = useState("");
  const [selectedRowNotes, setSelectedRowNotes] = useState("");
  const [checked, setChecked] = useState(false);

  


  interface CheckedRows {
    [key: string]: boolean; // Define the type for the keys as string and values as boolean
  }

  const [checkedRows, setCheckedRows] = useState<CheckedRows>({}); // Initialize as an empty object

  
  const onSelectionChanged = useCallback(
    ({ selectedRowsData }: DataGridTypes.SelectionChangedEvent) => {
      const data = selectedRowsData[0];

      setShowEmployeeInfo(!!data);
      setSelectedRowNotes(data && data.Notes);
      setSelectedRowPicture(data && data.Picture);

      console.log("Selected Row Data:", data);
    },
    []
  );
  const onContentReady = useCallback(
    (e: DataGridTypes.ContentReadyEvent) => {
      if (collapsed) {
        e.component.expandRow(["EnviroCare"]);
        setCollapsed(false);
      }
    },
    [collapsed]
  );
  useEffect(() => {
    // Call the function to fetch folders data
    getMSTeamsTemplatesList();
    Json_GetToFavourites();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render
  const getTeamsDetailsByTeamId = (MTeamId: any) => {
    try {
      let requestBody = {
        teamId: MTeamId,
      };

      CallApiphp(requestBody, "getTeamsDetailsByTeamId", function (res: any) {
        if (res) {
          let jsondata = res.data;
          console.log(jsondata.webUrl, "getTeamsDetailsByTeamId");
          window.open(jsondata.webUrl);
        } else {
          // Handle error if needed
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const Json_GetToFavourites = () => {
    let passdata: any = localStorage.getItem("pass");
    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("email"),
      password: passdata,
    };

    CallApi(requestBody, "Json_GetToFavourites", function (res: any) {
      if (res) {
        console.log(res, "Json_GetToFavourites");
        let str = JSON.parse(JSON.stringify(res));
        let json = JSON.parse(str.d);

        const filteredArray = json.Table.filter(
          (obj: any) => obj.OriginatorNo !== ""
        );
        fevData = filteredArray;

        setShowH1(filteredArray);
        console.log(json, "Json_GetToFavourites11", showH1);
      } else {
        // Handle error if needed
      }
    });
  };
//   const Json_GetAllSupplierList = () => {
//     let passdata: any = localStorage.getItem("pass");
//     let requestBody = {
//       agrno: localStorage.getItem("agrno"),
//       Email: localStorage.getItem("email"),
//       password: passdata,
//     };

//     CallApi(requestBody, "Json_GetAllSupplierList", function (res: any) {
//       if (res) {
//         console.log(res, "response11");
//         let str = JSON.parse(JSON.stringify(res));
//         let json = JSON.parse(str.d);

//         // folderData = json.Table
//         const filteredArray = json.Table.filter(
//           (obj: any) => obj.OriginatorNo !== ""
//         );

//         folderData = filteredArray;
//         console.log(folderData, "Json_GetAllSupplierList", fevData);
//         const uniqueData = filteredArray.filter(
//           (item: any, index: any, self: any) =>
//             index ===
//             self.findIndex((obj: any) => obj.OriginatorNo === item.OriginatorNo)
//         );
//         const filteredData = uniqueData.filter(
//           (item: any) => item.MTeamId !== null
//         );

//         console.log(filteredData, "uniqueData");

       

//         setFolders(filteredData);
//       } else {
//         // Handle error if needed
//       }
//     });
//   };
const getMSTeamsTemplatesList = () => {
        let passdata: any = localStorage.getItem("pass");
    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      strEmail: localStorage.getItem("email"),
      password: passdata,
    };

    CallApiphp(requestBody, "getMSTeamsTemplatesList", function (res: any) {
      if (res) {
        console.log(res, "getMSTeamsTemplatesList");
        // setTeams(res.data);
        setFolders(res.data);
      } else {
      }
    });
  };
  const checkedData = (rowdata: {}, e: any) => {
    console.log(rowdata, "eventget", e);
    if (e.target.checked) {
      console.log(true, "handleChange_true", e);
      Json_AddToFavourite(rowdata);
    } else {
      console.log(false, "handleChange_false");
      Json_RemoveToFavourite(rowdata);
    }
  };
  const renderOptionsColumn = (rowData: any) => {
    return (
      <div>
       
        <Checkbox
          className="text-yellow"
          icon={<StarBorderIcon />}
          checkedIcon={<StarIcon />}
          onChange={(e) => {
            checkedData(rowData, e);
          }}
        />
      </div>
    );
  };
  const Json_AddToFavourite = (rowData: any) => {
    // Handle edit action
    console.log(rowData, "Edit:", "Json_AddToFavourite");
    let objdata = rowData.data;

    let passdata: any = localStorage.getItem("pass");

    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("email"),
      password: passdata,
      ProjectID: objdata.ProjectId ? objdata.ProjectId : "",
      OrgNo: objdata.OriginatorNo ? objdata.OriginatorNo : "",
    };
    CallApi(requestBody, "Json_AddToFavourite", function (res: any) {
      if (res) {
        console.log(res, "response11");
      }
    });
  };
  const Json_RemoveToFavourite = (rowData: any) => {
    // Handle edit action
    console.log("Edit:", "Json_RemoveToFavourite");
    console.log(rowData, "Edit:", "Json_RemoveToFavourite");
    let objdata = rowData.data;

    let passdata: any = localStorage.getItem("pass");

    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("email"),
      password: passdata,
      ProjectID: objdata.ProjectId ? objdata.ProjectId : "",
      OrgNo: objdata.OriginatorNo ? objdata.OriginatorNo : "",
    };
    CallApi(requestBody, "Json_RemoveToFavourite", function (res: any) {
      if (res) {
        console.log(res, "response11");
      }
    });
  };

  const handleRowDoubleClick = (e: any) => {
    // Access the double-clicked row data
    const rowData = e.data;
    //const data = selectedRowsData[0];
    console.log("Row double-clicked:", rowData);
    if (rowData.MTeamId) {
      getTeamsDetailsByTeamId(rowData.MTeamId ? rowData.MTeamId : "");
    }
    // Do something with the rowData
  };

  const handleDelete = (e:any) => {
    // Handle row deletion here
    console.log('Row_deleted:', e.data);
    let passdata: any = localStorage.getItem("pass");

    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("email"),
      password: passdata,
      TemplateId:e.data.TemplateId
      };
      CallApiphp(requestBody, "deleteMSTeamsTemplateById", function (res: any) {
        if (res) {
         
          console.log(res, "deleteMSTeamsTemplateById");
          
        } else {
          // Handle error if needed
        }
      });
  };
  const handleUpdate = (e:any) => {
    // Handle row deletion here
    console.log('Row_Updated:', e.data);
    let passdata: any = localStorage.getItem("pass");
    
    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      strEmail: localStorage.getItem("email"),
      password: passdata,
      Name:e.data.Name,
      TemplateData:[],
      TemplateSettings:[],
      TemplateId:e.data.TemplateId,
      Status:"active"
      };
      CallApiphp(requestBody, "updateMSTeamsTemplate", function (res: any) {
        if (res) {
        
          console.log(res, "updateMSTeamsTemplate");
          
        } else {
          // Handle error if needed
        }
      });
  };
  const [showInput, setShowInput] = useState<any>("");

  const [showComponent,setShowcomponent] =useState(false);
  const [templatesettings, setTemplatesettings] = useState<any>(null);
  const [templatedata, setTemplatedata] = useState<any>(null);
  const [templateID, setTemplateID] = useState<any>(null);
  const handleRowClick = (e:any) => {
    setIsviblebutton(false)
   console.log(e, "handleRowClick");
   let passdata: any = localStorage.getItem("pass");

    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      strEmail: localStorage.getItem("email"),
      password: passdata,
      TemplateId:e.data.TemplateId
      };
      setTemplateID(e.data.TemplateId);
      CallApiphp(requestBody, "getMSTeamsTemplatesDetailsById", function (res: any) {
        if (res) {
         
          console.log(res, "getMSTeamsTemplatesDetailsById");
          setShowInput(res.data[0]);
          let jsondata = res.data[0];
          let templateSetting = JSON.parse(jsondata.TemplateSettings);
          console.log(templateSetting, "templatesettings");
          setTemplatesettings(templateSetting);
          let json = JSON.parse(jsondata.TemplateData);
          console.log(json, "jsondata");
          setTemplatedata(json);
          // setTemplate(json);
        } else {
          // Handle error if needed
        }
      });
   setShowcomponent(true);
  }
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const CreateTemplate =() => {
    setShowCreateTemplate(!showCreateTemplate);
  }
  return (
    <>
    {showComponent ? (
 <div><EditAdmin showInput={showInput} templatesettings={templatesettings} templatedata={templatedata} templateID={templateID}/></div>
    ):(
      <>
      {/* <Button
            variant="contained"
            onClick={CreateTemplate}
          >
            Create Template
          </Button> */}
          <DataGrid
            dataSource={folders}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            width="100%"
            onContentReady={onContentReady}
            onSelectionChanged={onSelectionChanged}
            onRowDblClick={handleRowDoubleClick}
            className="custom-data-grid" // Add a custom class name
            allowColumnResizing={true}
            // columnMinWidth={100}
            columnAutoWidth={true}
            onRowRemoved={handleDelete}
            onRowUpdated={handleUpdate}
            onRowClick={handleRowClick}
          >
              <Selection mode="single" />
              <SearchPanel visible={true} highlightCaseSensitive={true} />

              {/* <Column dataField="Product" groupIndex={0} /> */}

              <Editing
                mode="row"
                // allowUpdating={true}
                allowDeleting={true}
                // allowAdding={true} 
                />
              {/* <Column
    caption="S No."
    cellRender={({ data }) => data.rowIndex + 1} // Add 1 to start serial number from 1
    /> */}

              <Column
                dataField="Name"
                caption="Template Name " />

              <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
              <Paging defaultPageSize={10} />
            </DataGrid></>
    )}
    
     
     
        
    </>
  );
};

export default Templatelist;
