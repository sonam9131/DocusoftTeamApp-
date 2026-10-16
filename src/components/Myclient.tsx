import React, { useCallback, useEffect, useState } from 'react';
import ODataStore from 'devextreme/data/odata/store';
import {
  Box,Checkbox

} from "@mui/material";
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
} from 'devextreme-react/data-grid';
import DiscountCell from './DiscountCell';
import { Client } from './sample/Client';
import CallApi, { CallApiphp } from './sample/Services/Apicall';
import './sample/css/App1.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getAccessTokenLogin, loginIfNeeded } from '../auth/tokenService';
// import StarIcon from '@mui/icons-material/Star'; 

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const pageSizes = [10, 25, 50, 100];

const dataSourceOptions = {
  store: new ODataStore({
    version: 2,
    url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
    key: 'Id',
    beforeSend(request: any) {
      const year = new Date().getFullYear() - 1;
      request.params.startDate = `${year}-05-10`;
      request.params.endDate = `${year}-5-15`;
    },
  }),
};
let folderData: any;
let clientData: any;
const Myclient = () => {
  const [folders, setFolders] = useState([]); // State to hold folders data
  const [collapsed, setCollapsed] = useState(true);
  const [showH1, setShowH1] = useState(false); // State to control visibility
  const [showEmployeeInfo, setShowEmployeeInfo] = useState(false);
  const [selectedRowPicture, setSelectedRowPicture] = useState('');
  const [selectedRowNotes, setSelectedRowNotes] = useState('');
  const [selectedData, setSelectedData] = useState({});
  const [checkedRows, setCheckedRows] = useState<any>({});
  const [checked, setChecked] = useState(true);
  const [templateData, setTemplateData] = useState<any>(null);

  const onSelectionChanged = useCallback(({ selectedRowsData }: DataGridTypes.SelectionChangedEvent) => {
    const data = selectedRowsData[0];

    setShowEmployeeInfo(!!data);
    setSelectedRowNotes(data && data.Notes);
    setSelectedRowPicture(data && data.Picture);
    setSelectedData(data);
    clientData = data;
    console.log(clientData, selectedRowPicture, selectedRowNotes, 'Selected Row Data:', data);
    // if(data.MTeamId){
    //   getTeamsDetailsByTeamId(data.MTeamId ? data.MTeamId : "" );
    // } else{
    //   console.log("tamseeee")
    // }

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
          console.log(token, "MycientgetAccessTokenLogin token");
          setTemplateData(token);
        } catch (e) {
          console.error("Auth failed", e);
        }
      };
      init();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render
  const getTeamsDetailsByTeamId = (MTeamId: any) => {

    try {
      let requestBody = {
        teamId: MTeamId
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
    } catch (e) {
      console.log(e);
    }
  };
  const Json_GetToFavourites = () => {
    let passdata: any = localStorage.getItem('pass');
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
        //folderData = json.Table
        // Use reduce to create an object with unique OriginatorNo as keys
        const distinctObjects = json.Table.reduce((acc: any, curr: any) => {
          if (!acc[curr.OriginatorNo]) {
            acc[curr.OriginatorNo] = curr;
          }
          return acc;
        }, {});

        // Convert the object back to an array
        const distinctArray = Object.values(distinctObjects);
        const filteredArray = distinctArray.filter((obj: any) => obj.OriginatorNo !== '');
        console.log(filteredArray, "distinctOriginatorNos");
        folderData = filteredArray;
        const filteredData = folderData.filter((item: any) => item.MTeamId !== null);

        console.log(filteredData, "uniqueData");
        setFolders(filteredData);
        console.log(folderData, json, "Json_GetToFavourites11");
      } else {
        // Handle error if needed
      }
    });
  };
  const [isChecked, setIsChecked] = useState(true);

  const checkedData = (rowdata: any, e: any) => {
    const isChecked: any = checkedRows[rowdata.id] ?? false;
    const updatedCheckedRows = { ...checkedRows, [rowdata.id]: e.target.checked };
    setCheckedRows(updatedCheckedRows);
    console.log(rowdata, "eventget", isChecked);
    if (e.target.checked) {
      console.log(true, "handleChange_true", e);
      Json_AddToFavourite(rowdata);
      // setChecked(true)

    } else {
      setChecked(false)
      console.log(false, "handleChange_false");
      Json_RemoveToFavourite(rowdata);
    }
  };
  const renderOptionsColumn = (rowData: any) => {
    console.log(rowData, "rowData");
    const isChecked = checkedRows[rowData.data.OriginatorNo] ?? true;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCheckedRows = { ...checkedRows, [rowData.data.OriginatorNo]: e.target.checked };
      setCheckedRows(updatedCheckedRows);
      console.log(rowData, "eventget", isChecked);
      if (e.target.checked) {
        console.log(true, "handleChange_true", e);
        Json_AddToFavourite(rowData);
      } else {
        console.log(false, "handleChange_false");
        Json_RemoveToFavourite(rowData);
        console.log(rowData.data, "rowDatafalse", folders);
        const updatedGridData = folders.filter((row: any) => row.OriginatorNo !== rowData.data.OriginatorNo);
        setFolders(updatedGridData);
      }
    };

    return (
      <div>

        <Checkbox
          className='text-yellow'
          icon={<StarBorderIcon />}
          checkedIcon={<StarIcon />}
          // checked ={checked}

          onChange={handleChange}
          checked={isChecked}
        />
      </div>
    );
  };
  const handleEdit = (rowData: any) => {
    // Handle edit action
    console.log('Edit:', rowData);
  };
  const Json_AddToFavourite = (rowData: any) => {
    // Handle edit action
    console.log(rowData, 'Edit:', "Json_AddToFavourite");
    // let objdata = rowData;

    let passdata: any = localStorage.getItem('pass');

    let requestBody = {
      agrno: localStorage.getItem('agrno'),
      Email: localStorage.getItem('email'),
      password: passdata,
      ProjectID: rowData.ProjectId ? rowData.ProjectId : "",
      OrgNo: rowData.OriginatorNo ? rowData.OriginatorNo : ""
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
    console.log(rowData, 'Edit:', "Json_RemoveToFavourite");
    let objdata = rowData.data;

    let passdata: any = localStorage.getItem('pass');

    let requestBody = {
      agrno: localStorage.getItem('agrno'),
      Email: localStorage.getItem('email'),
      password: passdata,
      ProjectID: objdata.ProjectId ? objdata.ProjectId : "",
      OrgNo: objdata.OriginatorNo ? objdata.OriginatorNo : ""
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
  //       console.log(token, "MycientgetAccessTokenLogin_token");
  //       setTemplateData(token);
  //   //   } else {
  //   //   }
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
  const handleRowDoubleClick = (e: any) => {
    // Access the double-clicked row data
    const rowData = e.data;
    //const data = selectedRowsData[0];
    console.log("Row double-clicked:", rowData);
    if (rowData.MTeamId) {
      getTeamsDetailsByTeamId(rowData.MTeamId ? rowData.MTeamId : "");
    }
    // Do something with the rowData

  }
  return (
    <><div>
      {/* <Client/> */}
    </div>
    
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
          columnMinWidth={100}
          columnAutoWidth={true}
          onRowRemoved={handleDelete}

        >

          <Editing
            mode="row"
            // allowUpdating={true}
            allowDeleting={true}
            // allowAdding={true} 
            />

          <Selection mode="single" />
          <SearchPanel visible={true} highlightCaseSensitive={true} />


          {/* <Column dataField="Product" groupIndex={0} /> */}
          <Column
            dataField="OriginatorNo"
            caption="Client ID"
          // alignment="right"
          />
          <Column
            dataField="OriginatorName"
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

export default Myclient;
