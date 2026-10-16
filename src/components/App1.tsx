import { useCallback, useEffect, useState } from 'react';
import ODataStore from 'devextreme/data/odata/store';

import DataGrid, {
  Column,
  DataGridTypes,
  Editing,
  Pager,
  Paging,
  SearchPanel,
  Selection
} from 'devextreme-react/data-grid';
import CallApi, { CallApiphp } from './sample/Services/Apicall';
import './sample/css/App1.css';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder'; 
// import StarIcon from '@mui/icons-material/Star'; 
import Checkbox from '@mui/material/Checkbox';
import { getAccessTokenLogin, loginIfNeeded } from '../auth/tokenService';
 
 
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const pageSizes = [10, 25, 50, 100];
const YellowStarIcon = styled(StarIcon)({
  color: 'yellow',
});
const dataSourceOptions = {
  store: new ODataStore({
    version: 2,
    url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
    key: 'Id',
    beforeSend(request:any) {
      const year = new Date().getFullYear() - 1;
      request.params.startDate = `${year}-05-10`;
      request.params.endDate = `${year}-5-15`;
    },
  }),
};
let folderData:any;
let fevData:any;
let clientData:any;
const App1 = () => {
  const [folders, setFolders] = useState([]); // State to hold folders data
  const [collapsed, setCollapsed] = useState(true);
  const [showH1, setShowH1] = useState([]); // State to control visibility
  const [showEmployeeInfo, setShowEmployeeInfo] = useState(false);
  const [selectedRowPicture, setSelectedRowPicture] = useState('');
  const [selectedRowNotes, setSelectedRowNotes] = useState('');
  const [checked, setChecked] = useState(false);
  const [templateData, setTemplateData] = useState<any>(null);
  // const handleCheckboxChange = () => {
  //   setChecked(!checked); // Toggle the checked state
  //   console.log('Checkbox checked:', !checked); // Log the checked status to the console
  // };
// interface CheckedRows {
//   [key: string]: boolean; // Assuming the keys are string identifiers and the values are booleans
// }


// const [checkedRows, setCheckedRows] =  useState<CheckedRows>({}); // Object to track checked status of each row

// const handleCheckboxChange = (rowData:any) => {
//   const newRowData = { ...checkedRows };
//   newRowData[rowData.id] = !newRowData[rowData.id]; // Toggle checked status for the clicked row
//   setCheckedRows(newRowData);
//   console.log('Checked rows:', newRowData);
// };
interface CheckedRows {
  [key: string]: boolean; // Define the type for the keys as string and values as boolean
}

// Then in your component:
const [checkedRows, setCheckedRows] = useState<CheckedRows>({}); // Initialize as an empty object

const handleCheckboxChange = (rowData: any) => {
  setCheckedRows(prevRows => {
    const newRowData: CheckedRows = {};
    
    // Toggle the clicked row
    newRowData[rowData.id] = !prevRows[rowData.id];

    // Uncheck all other rows
    Object.keys(prevRows).forEach(key => {
      if (key !== rowData.id) {
        newRowData[key] = false;
      }
    });

    console.log('Checked rows:', newRowData);
    return newRowData;
  });
};








  const onSelectionChanged = useCallback(({ selectedRowsData }: DataGridTypes.SelectionChangedEvent) => {
    const data = selectedRowsData[0];

    setShowEmployeeInfo(!!data);
    setSelectedRowNotes(data && data.Notes);
    setSelectedRowPicture(data && data.Picture);
   
   
     

  
    console.log('Selected Row Data:', data);
  }, []);
  const onContentReady = useCallback((e: DataGridTypes.ContentReadyEvent) => {
    if (collapsed) {
      e.component.expandRow(['EnviroCare']);
      setCollapsed(false);
    }
  }, [collapsed]);
  useEffect(() => {
    // Call the function to fetch folders data
    const agrno = localStorage.getItem('agrno');
    const email = localStorage.getItem('email');
    const pass = localStorage.getItem('pass');
    if (agrno && email && pass) {
      Json_GetAllSupplierList();
      Json_GetToFavourites();
    } else {
      console.warn("User data not ready yet");
    }
    // getAccessToken();
    // const init = async () => {
    //   await getAccessToken();
    // }
    // init();
    const init = async () => {
            try {
              await loginIfNeeded();      // 🔐 ensure login
              const token = await getAccessTokenLogin(); // 🔑 then token
              console.log(token, "app1MycientgetAccessTokenLogin token");
              setTemplateData(token);
            } catch (e) {
              console.error("Auth failed", e);
            }
          };
          init();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render
  const getTeamsDetailsByTeamId = (MTeamId:any) => {
    
    try{
      let requestBody = {
        teamId:MTeamId
      };
      
      CallApiphp(requestBody, "getTeamsDetailsByTeamId", function (res: any) {
        if (res && res.data && res.data.webUrl) {
          let jsondata = res.data;
          console.log(jsondata.webUrl, "getTeamsDetailsByTeamId");
          window.open(jsondata.webUrl);

        } else {
          // Handle error if needed
        }
      });
    } catch(e){
       console.log(e);
    }
    };
  const Json_GetToFavourites = () => {
    let passdata:any = localStorage.getItem('pass');
    let requestBody = {
      agrno: localStorage.getItem('agrno'), 
      Email: localStorage.getItem('email'), 
      password: passdata
    };
    
    CallApi(requestBody, "Json_GetToFavourites", function (res: any) {
      if (res) {
        console.log(res, "Json_GetToFavourites");
        let str = JSON.parse(JSON.stringify(res));
        let json = str?.d ? JSON.parse(str.d) : null;
        if (!json?.Table) {
          console.warn("Json_GetToFavourites: no Table in response", res);
          return;
        }
        const filteredArray =  json.Table.filter((obj:any) => obj.OriginatorNo !== '');
        fevData = filteredArray;
    
        setShowH1(filteredArray);
       console.log(json,"Json_GetToFavourites11",showH1);
      } else {
        // Handle error if needed
      }
    });
    };
  const Json_GetAllSupplierList = () => {
let passdata:any = localStorage.getItem('pass');
let requestBody = {
  agrno: localStorage.getItem('agrno'), 
  Email: localStorage.getItem('email'), 
  password: passdata
};

CallApi(requestBody, "Json_GetAllSupplierList", function (res: any) {
  if (res) {
    console.log(res, "response11");
    let str = JSON.parse(JSON.stringify(res));
    let json = str?.d ? JSON.parse(str.d) : null;
    if (!json?.Table) {
      console.warn("Json_GetAllSupplierList: no Table in response", res);
      return;
    }

    // folderData = json.Table
    const filteredArray =  json.Table.filter((obj:any) => obj.OriginatorNo !== '');

  folderData = filteredArray;
  console.log(folderData,"Json_GetAllSupplierList",fevData);
  const uniqueData = filteredArray.filter((item:any, index:any, self:any) =>
    index === self.findIndex((obj:any) =>
        obj.OriginatorNo === item.OriginatorNo 
    )
);
const filteredData = uniqueData.filter((item:any) => item.MTeamId !== null);

console.log(filteredData,"uniqueData");

//   const filteredFolderData = folderData.filter((folderItem:any) => {
//     return !fevData.some((fevItem:any) => fevItem.OriginatorNo === folderItem.OriginatorNo);
// });
// console.log(filteredFolderData,"filteredFolderData");
// console.log(filteredFolderData);

  setFolders(filteredData);
  

//   const filteredFolderData = json.Table.forEach((folderItem:any) => {
//     // Check if there is any item in fevData with matching OriginatorNo and ProjectId
//     console.log(folderItem,"folderItem");

//     const matchFound = fevData.some((fevItem:any) => {
//         return fevItem.OriginatorNo === folderItem.OriginatorNo && fevItem.ProjectId === folderItem.ProjectId;
//     });
//     console.log(folderItem,"folderItem_data")
//     // Return false to filter out the folderItem if a match is found, otherwise return true to keep it
//     return !matchFound;
// });
// // folderData = filteredFolderData;
// console.log(filteredFolderData,"filteredFolderData");


// console.log(filterData,"filterData")


  } else {
    // Handle error if needed
  }
});
};
const checkedData = (rowdata:{},e:any) => {
  console.log(rowdata,"eventget",e);
  if (e.target.checked) {
      console.log(true,"handleChange_true",e);
      Json_AddToFavourite(rowdata);
      
  } else {
      console.log(false,"handleChange_false");
      Json_RemoveToFavourite(rowdata);
  }
};
const renderOptionsColumn = (rowData: any) => {
  return (
    <div>
       {/* <EditIcon onClick={() => handleDelete(rowData)}>Edit</EditIcon>
      <DeleteIcon onClick={() => handleEdit(rowData)}>Delete</DeleteIcon> */}
      {/* <StarIcon color="success" onClick={() => Json_AddToFavourite(rowData)}>Rate</StarIcon> */}
      {/* <Checkbox className='text-yellow' 
                            {...label} 
                            icon={<StarBorderIcon />} 
                            checkedIcon={<StarIcon />} 
                        /> */}
                           <Checkbox
        className='text-yellow'
        icon={<StarBorderIcon />}
        checkedIcon={<StarIcon />}
        onChange={(e)=>{checkedData(rowData,e)}}
      />

    </div>
  );
};
const Json_AddToFavourite = (rowData: any) => {
  // Handle edit action
  console.log(rowData,'Edit:', "Json_AddToFavourite");
  let objdata = rowData.data;

  let passdata:any = localStorage.getItem('pass');
  
  let requestBody = {
    agrno:	localStorage.getItem('agrno'), 
    Email:	localStorage.getItem('email'),
    password:	passdata,
    ProjectID:objdata.ProjectId ? objdata.ProjectId : "",	
    OrgNo:objdata.OriginatorNo ? objdata.OriginatorNo : ""
  };
  CallApi(requestBody, "Json_AddToFavourite", function (res: any) {
    if (res) {
      console.log(res, "response11");
    }
  });
};
const Json_RemoveToFavourite = (rowData: any) => {
  // Handle edit action
  console.log('Edit:', "Json_RemoveToFavourite");
  console.log(rowData,'Edit:', "Json_RemoveToFavourite");
  let objdata = rowData.data;

  let passdata:any = localStorage.getItem('pass');
  
  let requestBody = {
    agrno:	localStorage.getItem('agrno'), 
    Email:	localStorage.getItem('email'),
    password:	passdata,
    ProjectID:objdata.ProjectId ? objdata.ProjectId : "",	
    OrgNo:objdata.OriginatorNo ? objdata.OriginatorNo : ""
  };
  CallApi(requestBody, "Json_RemoveToFavourite", function (res: any) {
    if (res) {
      console.log(res, "response11");
    }
  });
};
// const getAccessToken = async () => {
//   // let request = {
//   //   "clientId": "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
//   //   "clientSecret": "REDACTED_SECRET_ROTATE_ME",
//   //   "tenantId": "00175dea-da9a-4dfa-8dd0-7f96eb63ace0"
//   // }
//   // CallApiphp(request, "getAccessToken", function (res: any) {
//   //   if (res) {
//   //     console.log(res.token, "getAccessToken");
//       // getUsersMSTeam(res.token);
//       const token = await getAccessTokenLogin(); // 🔥 auto refresh
//       console.log(token, "App1getAccessTokenLogin_token");
//       setTemplateData(token);
//     // } else {
//     // }
//   // });
// }
const handleDelete = (e:any) => {
  // Handle row deletion here
  console.log('Row_deletedssss:', e.data);
  let passdata: any = localStorage.getItem("pass");

  let requestBody = {
    agrno: localStorage.getItem("agrno"),
    Email: localStorage.getItem("email"),
    password: passdata,
    teamId:e.data.MTeamId,
    clientId:e.data.OriginatorNo ? e.data.OriginatorNo : "",
    accessToken:templateData
    };
    CallApiphp(requestBody, "removeClientsTeam", function (res: any) {
      if (res) {
       
        console.log(res, "removeClientsTeam");
        
      } else {
        // Handle error if needed
      }
    });
};
const handleRowDoubleClick=(e:any)=> {
  // Access the double-clicked row data
  const rowData = e.data;
  //const data = selectedRowsData[0];
  console.log("Row double-clicked:", rowData);
  if(rowData.MTeamId){
       getTeamsDetailsByTeamId(rowData.MTeamId ? rowData.MTeamId : "" );
     }
  // Do something with the rowData
 
}

  return (
    <><div>
      {/* <Client/> */}
    </div><DataGrid
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
      columnMinWidth={100}
      columnAutoWidth={true}
      onRowRemoved={handleDelete}

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
          
        <Column
          dataField="OriginatorNo"
          caption="Client ID"
          // alignment="right"
         />
        <Column
          dataField="Company Name"
          caption="Client Name"
          // alignment="right"
          />
           <Column
          dataField="Contact Number"
          caption="Option"
          cellRender={renderOptionsColumn}
          />
           {/* <Column
          dataField="Mobile Number"
          caption="Mobile Number"/>
           <Column
          dataField="Address Line 1"
          caption="Address Line 1"/>
           <Column
          dataField="Address Line 2"
          caption="Address Line 2"/>
           <Column
          dataField="Address Line 3"
          caption="Address Line 3"/>
           <Column
          dataField="Town"
          caption="Town"/>
           <Column
          dataField="County"
          caption="County"/>
           <Column
          dataField="Postcode"
          caption="Postcode"/>
           <Column
          dataField="Country"
          caption="Country"/>
           <Column
          dataField="Active Status"
          caption="Active Status"/>
           <Column
          dataField="Business"
          caption="Business" width="600"/>
           <Column
          dataField="Source"
          caption="Source"/>
           <Column
          dataField="Status"
          caption="Status"/>
           <Column
          dataField="First Name"
          caption="First Name"/>

<Column
          dataField="Last Name"
          caption="Last Name"/>
           <Column
          dataField="Title"
          caption="Title"/>
           <Column
          dataField="E-Mail"
          caption="E-Mail"/>
         <Column
          dataField="Manager"
          caption="Manager"/> */}

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid></>
  );
};

export default App1;
