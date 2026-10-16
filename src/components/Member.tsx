import { useCallback, useEffect, useState } from 'react';
import DataGrid, {
  Column,
  DataGridTypes,
  Pager,
  Paging,
  SearchPanel,
  Selection
} from 'devextreme-react/data-grid';
import CallApi, { CallApiphp } from './sample/Services/Apicall';
import './sample/css/App1.css';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { getAccessTokenLogin, loginIfNeeded } from '../auth/tokenService';
import { getMSTeamsTemplatesList } from '../redux/dev_teams_api_helper';
import { useDispatch } from 'react-redux';
const pageSizes = [10, 25, 50, 100];
let folderData: any;
let fevData: any;
const Member = ({ setMemberuser }: any) => {
  const [selectedRoles, setSelectedRoles] = useState<any>({});
  const [collapsed, setCollapsed] = useState(true);
  const [showH1, setShowH1] = useState([]); // State to control visibility
  const [userteams, setUserteams] = useState("");
  const [ownerdata, setOwnerdata] = useState<any>([]);
   const dispatch = useDispatch<any>();
  const onSelectionChanged = useCallback(({ selectedRowsData }: DataGridTypes.SelectionChangedEvent) => {
    const data = selectedRowsData[0];
    console.log('Selected Row Data:', data);
    const selectedData: any = selectedRowsData.map(row => ({
      "@odata.type": "microsoft.graph.aadUserConversationMember",
      "roles": [selectedRoles[row.id] || ''],
      "user@odata.bind": `https://graph.microsoft.com/v1.0/users/${row.id}`
    }));

    // Update ownerData state with all selected rows
    setOwnerdata(selectedData);
    setMemberuser(selectedData);
  }, [selectedRoles]);
  const onContentReady = useCallback((e: DataGridTypes.ContentReadyEvent) => {
    if (collapsed) {
      e.component.expandRow(['EnviroCare']);
      setCollapsed(false);
    }
  }, [collapsed]);
  useEffect(() => {
    Json_GetAllSupplierList();
    Json_GetToFavourites();
    // getAccessToken();
    // const init = async () => {
    //   await getAccessToken();
    // }
    // init();
       const init = async () => {
            try {
              await loginIfNeeded();      // 🔐 ensure login
              const token = await getAccessTokenLogin(); // 🔑 then token
              console.log(token, "memberntgetAccessTokenLogin token");
              getUsersMSTeam(token);
            } catch (e) {
              console.error("Auth failed", e);
            }
          };
          init();
            dispatch(getMSTeamsTemplatesList());
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
        let json = str?.d ? JSON.parse(str.d) : null;

        if (!json?.Table) {
          console.warn("Json_GetToFavourites: no Table in response", res);
          setShowH1([]);
          return;
        }

        const filteredArray = json.Table.filter((obj: any) => obj.OriginatorNo !== '');
        fevData = filteredArray;

        setShowH1(filteredArray);
        console.log(json, "Json_GetToFavourites11", showH1);
      } else {
        setShowH1([]);
      }
    });
  };


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
        let json = str?.d ? JSON.parse(str.d) : null;
        if (!json?.Table) {
          console.warn("Json_GetAllSupplierList: no Table in response", res);
          return;
        }
        const filteredArray = json.Table.filter((obj: any) => obj.OriginatorNo !== '');

        folderData = filteredArray;
        console.log(folderData, "Json_GetAllSupplierList", fevData);

      } else {
        // Handle error if needed
      }
    });
  };

  const getUsersMSTeam = (accesstoken: any) => {
    let tokendata = {
      "accessToken": accesstoken
    }
    console.log(tokendata, "getUsersMSTeam_request");
    CallApiphp(tokendata, "getUsersMSTeam", function (res: any) {
      if (res && res.data) {
        console.log(res.data["value"], "getUsersMSTeam");
        setUserteams(res.data["value"] || []);
      } else {
      }
    });
  }
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
    const handleRowDoubleClick = (e: any) => {
    // Access the double-clicked row data
    const rowData = e.data;
    console.log("Row double-clicked:", rowData);
    if (rowData.MTeamId) {
      getTeamsDetailsByTeamId(rowData.MTeamId ? rowData.MTeamId : "");
    }
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
        <Column
          dataField="displayName"
          caption="User Name"
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
