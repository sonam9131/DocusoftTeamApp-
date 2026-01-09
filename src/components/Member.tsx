import React, { useCallback, useEffect, useState } from 'react';
import ODataStore from 'devextreme/data/odata/store';

import DataGrid, {
  Column,
  DataGridTypes,
  Editing,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Selection
} from 'devextreme-react/data-grid';
import DiscountCell from './DiscountCell';
import { Client } from './sample/Client';
import CallApi, { CallApiphp } from './sample/Services/Apicall';
import './sample/App1.css';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
// import StarIcon from '@mui/icons-material/Star'; 
import Checkbox from '@mui/material/Checkbox';


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
const Member = ({ setMemberuser }: any) => {
  const [selectedRoles, setSelectedRoles] = useState<any>({});

  const [folders, setFolders] = useState([]); // State to hold folders data
  const [collapsed, setCollapsed] = useState(true);
  const [showH1, setShowH1] = useState([]); // State to control visibility
  const [showEmployeeInfo, setShowEmployeeInfo] = useState(false);
  const [selectedRowPicture, setSelectedRowPicture] = useState('');
  const [selectedRowNotes, setSelectedRowNotes] = useState('');
  const [checked, setChecked] = useState(false);
  const [userteams, setUserteams] = useState("");
  const [ownerdata, setOwnerdata] = useState<any>([]);
  const [age, setAge] = useState('');
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
    const selectedData: any = selectedRowsData.map(row => ({
      "@odata.type": "microsoft.graph.aadUserConversationMember",
      "roles": [selectedRoles[row.id] || ''],
      "user@odata.bind": `https://graph.microsoft.com/v1.0/users/${row.id}`
    }));

    // Update ownerData state with all selected rows
    setOwnerdata(selectedData);
    setMemberuser(selectedData);
    //setOwnerdata
  }, [selectedRoles]);
  console.log('Selected Row ownerdata:', ownerdata);
  const onContentReady = useCallback((e: DataGridTypes.ContentReadyEvent) => {
    if (collapsed) {
      e.component.expandRow(['EnviroCare']);
      setCollapsed(false);
    }
  }, [collapsed]);
  useEffect(() => {
    // Call the function to fetch folders data
    Json_GetAllSupplierList();
    Json_GetToFavourites();
    getAccessToken();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render
  const getTeamsDetailsByTeamId = (MTeamId: any) => {

    try {
      let requestBody = {
        teamId: MTeamId
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
        let json = JSON.parse(str.d);

        const filteredArray = json.Table.filter((obj: any) => obj.OriginatorNo !== '');
        fevData = filteredArray;

        setShowH1(filteredArray);
        console.log(json, "Json_GetToFavourites11", showH1);
      } else {
        // Handle error if needed
      }
    });
  };

  // async function getToken() {
  //   const clientId = 'f4dd7cc3-897d-46dc-88a8-fe9c3057445d';
  //   const clientSecret = 'REDACTED_SECRET_ROTATE_ME';
  //   const scope = 'https://graph.microsoft.com/.default'; // Adjust scope as needed
  //   const tokenEndpoint = 'https://login.microsoftonline.com/65180896-6dc7-405c-9ec1-3839e91ae948/oauth2/v2.0/token';

  //   const requestBody = new URLSearchParams({
  //     client_id: clientId,
  //     client_secret: clientSecret,
  //     scope: scope,
  //     grant_type: 'client_credentials'
  //   });

  //   try {
  //     const response = await fetch(tokenEndpoint, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       body: requestBody
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch token');
  //     }

  //     const data = await response.json();
  //     const accessToken = data.access_token;
  //     console.log(accessToken,"accesstoken");
  //     return accessToken;
  //   } catch (error) {
  //     console.error('Error fetching token:', error);
  //     return null;
  //   }
  // }
  const Json_GetAllSupplierList = () => {
    let passdata: any = localStorage.getItem('pass');
    let requestBody = {
      agrno: localStorage.getItem('agrno'),
      Email: localStorage.getItem('email'),
      password: passdata
    };

    CallApi(requestBody, "Json_GetAllSupplierList", function (res: any) {
      if (res) {
        console.log(res, "response11");
        let str = JSON.parse(JSON.stringify(res));
        let json = JSON.parse(str.d);


        // folderData = json.Table
        const filteredArray = json.Table.filter((obj: any) => obj.OriginatorNo !== '');

        folderData = filteredArray;
        console.log(folderData, "Json_GetAllSupplierList", fevData);
        const uniqueData = filteredArray.filter((item: any, index: any, self: any) =>
          index === self.findIndex((obj: any) =>
            obj.OriginatorNo === item.OriginatorNo
          )
        );
        const filteredData = uniqueData.filter((item: any) => item.MTeamId !== null);
        let baseUrldata = "https://login.microsoftonline.com/00175dea-da9a-4dfa-8dd0-7f96eb63ace0/oauth2/v2.0/token";
        let bodydata = {
          client_id: "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
          client_secret: "REDACTED_SECRET_ROTATE_ME",
          scope: "https://graph.microsoft.com/.default",
          grant_type: "client_credentials"
        }



        // Usage
        // getToken()
        //   .then(token => {
        //     console.log('Access Token:', token);
        //     // Use the token as needed
        //   })
        //   .catch(error => {
        //     console.error('Failed to get token:', error);
        //   });


        setFolders(filteredData);



      } else {
        // Handle error if needed
      }
    });
  };

  const getUsersMSTeam = (accesstoken: any) => {
    let tokendata = {
      "accessToken": accesstoken
    }
    CallApiphp(tokendata, "getUsersMSTeam", function (res: any) {
      if (res) {
        console.log(res.data["value"], "getUsersMSTeam");
        setUserteams(res.data["value"]);
      } else {
      }
    });
  }
  const getAccessToken = () => {
    let request = {
      "clientId": "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
      "clientSecret": "REDACTED_SECRET_ROTATE_ME",
      "tenantId": "00175dea-da9a-4dfa-8dd0-7f96eb63ace0"
    }
    CallApiphp(request, "getAccessToken", function (res: any) {
      if (res) {
        console.log(res.token, "getAccessToken");
        getUsersMSTeam(res.token);
      } else {
      }
    });
  }
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
  const handleChange = (e: any, rowId: any) => {
    const { value } = e.target;
    setSelectedRoles((prevState: any) => ({
      ...prevState,
      [rowId]: value // Update selected role for the specific row
    }));
     // Update the roles property in the selected row object
  const updatedOwnerData = ownerdata.map((row: any) => {
    if (row["user@odata.bind"] === `https://graph.microsoft.com/v1.0/users/${rowId}`) {
      // If the row matches the selected user, update the roles property
      return {
        ...row,
        roles: [value] // Update roles with the selected value
      };
    }
    return row; // Otherwise, return the row as is
  });

  // Update the ownerData state with the updated row data
  setOwnerdata(updatedOwnerData);
  setMemberuser(updatedOwnerData); // Update member data if needed
  };
  const renderOptionsColumn = (rowData: any) => {
    const { id } = rowData.data;
    console.log(rowData, "rowdataidsonam", id);
    return (
      <div>
        <FormControl size="small" sx={{ m: 1, minWidth: 180 }} >
          <Select
            labelId={`demo-simple-select-label-${id}`} // Use unique label ID for each select box
            id={`demo-simple-select-${id}`} // Use unique ID for each select box
            value={selectedRoles[id] || ''}
            label="Role"
            variant="outlined"
            onChange={(e) => handleChange(e, id)}
          >
            <MenuItem value="owner">Owner</MenuItem>
            <MenuItem value="member">Member</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };
  // const renderOptionsColumn = (rowData: any) => {
  //   const handleChange = (e:any) => {
  //     setAge(e.target.value);
  //     console.log(e.target.value,"getdata");
  //   };
  //   return (
  //     <div>

  //       <FormControl fullWidth>

  //        <Select
  //     labelId="demo-simple-select-label"
  //     id="demo-simple-select"
  //     value={age}
  //     label="Age"
  //     variant="standard"
  //     onChange={(e)=>handleChange(e)}
  //   >
  //     <MenuItem value="owner">Owner</MenuItem>
  //     {/* <MenuItem value="">Guest</MenuItem> */}
  //     <MenuItem value="member">User</MenuItem>
  //   </Select>
  //   </FormControl>
  //     </div>
  //   );
  // };
  const Json_AddToFavourite = (rowData: any) => {
    // Handle edit action
    console.log(rowData, 'Edit:', "Json_AddToFavourite");
    let objdata = rowData.data;

    let passdata: any = localStorage.getItem('pass');

    let requestBody = {
      agrno: localStorage.getItem('agrno'),
      Email: localStorage.getItem('email'),
      password: passdata,
      ProjectID: objdata.ProjectId ? objdata.ProjectId : "",
      OrgNo: objdata.OriginatorNo ? objdata.OriginatorNo : ""
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
  const handleRowClick = (event: any) => {
    console.log('ClickedRowData:', event.data); // Log the clicked row data
    // You can further process the clicked row data here
  };
  return (
    <><Box className='custom-table'><div>
      {/* <Client/> */}
    </div>
    
      <DataGrid
      dataSource={userteams}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      showBorders={true}
      onContentReady={onContentReady}
      onSelectionChanged={onSelectionChanged}
      onRowDblClick={handleRowDoubleClick}
      className="custom-data-grid" // Add a custom class name
      onRowClick={handleRowClick}
      allowColumnResizing={true}
      columnMinWidth={100}
      columnAutoWidth={true}
    >
     
        <Selection mode="multiple" />

        <SearchPanel visible={true} highlightCaseSensitive={true} />

        {/* <Column dataField="Product" groupIndex={0} /> */}

        {/* <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true} /> */}

        {/* <Column
          dataField="OriginatorNo"
          caption="mail"
          // alignment="right"
         /> */}
        <Column
          dataField="displayName"
          caption="User Name"
        // alignment="right"
        />

        <Column
          dataField="Contact Number"
          caption="Roles"
          cellRender={renderOptionsColumn}
        />
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={5} />
      </DataGrid>
      </Box></>
  );
};

export default Member;
