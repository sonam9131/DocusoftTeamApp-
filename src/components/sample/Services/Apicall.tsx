
// eslint-disable-next-line @typescript-eslint/typedef
const UrlApi="https://sharepoint.docusoftweb.com/dsdesktopwebservice.asmx/";
// const UrlApi = "https://outlook.mydocusoft.com/DocusoftUploadService.asmx/"
const UrlApiphp="https://www.digitalpractice.net/docuSoftApps/apis/";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const CallApi=(data:any,method:any,callback:any)=>{
    try {
        fetch(UrlApi+method, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers required by the API, such as authentication tokens
            },
            body: JSON.stringify(data),
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Failed to fetch data');
              }
            })
            .then(responseData => {
                if(responseData){
                    callback(responseData)
                }
                else{
                    callback([])
                }
                
              console.log('Response Data:', responseData);
              //setShowH1(true);
              // Handle the response data here
              // You can update your component state or perform other actions with the data
            })
            .catch(error => {
              console.error('Fetch Error:', error);
              // Without this, a network/HTTP failure would never invoke the
              // caller's callback at all, leaving it stuck forever (e.g. a
              // loading spinner or disabled submit button that never clears).
              callback(null);
            });
    } catch (error) {
        console.log("Error",error)
        callback(null);
    }

}
const CallApiphp=(data:any,method:any,callback:any)=>{
  try {
    fetch(UrlApiphp+method, {
      // mode: 'no-cors',
        method: "POST",
        headers: {
        
            'Content-Type': 'application/json'
          
          // "Access-Control-Allow-Headers" : "Content-Type",
        //    "Access-Control-Allow-Origin": "*",
        //  'Content-Type': 'application/json',
        //   "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
     },
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': 'https://localhost:53000'

        //   // Add any other headers required by the API, such as authentication tokens
        // },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch data');
          }
        })
        .then(responseData => {
            if(responseData){
                callback(responseData)
            }
            else{
                callback([])
            }
            
          console.log('Response Data:', responseData);
          //setShowH1(true);
          // Handle the response data here
          // You can update your component state or perform other actions with the data
        })
        .catch(error => {
          console.error('Fetch Error:', error);
          // Without this, a network/HTTP failure would never invoke the
          // caller's callback at all, leaving it stuck forever (e.g. a
          // loading spinner or disabled submit button that never clears).
          callback(null);
        });
} catch (error) {
    console.log("Error",error)
    callback(null);
}
}


export default CallApi;
export {
  CallApiphp
}