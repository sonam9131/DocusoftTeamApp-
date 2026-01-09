import axios from "axios";
// https://development.docuengager.com/DSDesktopWebService.asmx?op=Json_getRecentTaskList
// true = US, false = UK
let origin = false;

// ---- Define servers ---- //
const servers = {
  us: {
    dsdesktopwebservice: "https://mydocusoft.net/DSDesktopWebService.asmx/",
    portalClient: "https://sharepoint.docusoftweb.com/dsdesktopwebservice.asmx/",//"https://accountancy.mydocusoft.com/PracticeServices.asmx/",
    portalUser: "https://www.digitalpractice.net/docuSoftApps/apis/",
    docuEngagerClient: "https://portal.mydocusoft.net/ClientServices.asmx/",
    WhatsAppservice: "https://digitalpractice.net/whatsAppApis/apis/",
    calendlyService: "https://digitalpractice.net/calendly/",
    docuSMSApi: "https://mydocusoft.net/dswebclientmanager.asmx/",
    practiceTestOnlyForTesting:
      "https://accountancy.mydocusoft.net/PracticeServices.asmx",
    PracticeServices:
      "https://accountancy.mydocusoft.net/PracticeServices.asmx/",
    AccountancyMydocusoft:
      "https://accountancy.mydocusoft.net/PracticeServices.asmx",
    OutlookMydocusoft:
      "https://Outlook.mydocusoft.net/DocusoftUploadService.asmx",
    documentSignUrl: "https://signing.mydocusoft.net/",
    portalMydocusoftURL: "https://portal.mydocusoft.net/",
    formeditorDocument: "https://Formeditor.mydocusoft.net/",
    myDocusoftURL: "http://www.mydocusoft.net/",
    templateSign: "https://signing.mydocusoft.net/",
    docusoftPracticeURL:
      "https://accountancy.mydocusoft.net/PracticeServices.asmx/",
      infomanaagerUrl: "https://infomanager.mydocusoft.net/",
    PracticeSiteURL: "https://accountancy.mydocusoft.net/",
    dateFormate: "MM/DD/YYYY",
    geminiAI: "https://ai.docusoftpractice.com/",
  },

  uk: {
    dsdesktopwebservice:
      "https://development.docuengager.com/dsdesktopwebservice.asmx/",
    portalClient: "https://sharepoint.docusoftweb.com/dsdesktopwebservice.asmx/",
    portalUser: "https://www.digitalpractice.net/docuSoftApps/apis/",
    docuEngagerClient: "https://portal.docuengager.com/ClientServices.asmx/",
    WhatsAppservice: "https://digitalpractice.net/whatsAppApis/apis/",
    calendlyService: "https://digitalpractice.net/calendly/",
    docuSMSApi: "https://development.docuengager.com/dsdesktopwebservice.asmx/",
    practiceTestOnlyForTesting:
      "https://accountancy.mydocusoft.com/PracticeServices.asmx",
    PracticeServices:
      "https://development.docuengager.com/DSDesktopWebService.asmx/",
    AccountancyMydocusoft:
      "https://development.docuengager.com/DSDesktopWebService.asmx",
    OutlookMydocusoft:
      "https://development.docuengager.com/DSDesktopWebService.asmx",
    documentSignUrl: "https://signing.docusms.uk/",
    templateSign: "https://signature.mydocusoft.com/",
    portalMydocusoftURL: "https://portal.docuengager.com/",
    formeditorDocument: "https://formeditor.docuengager.com/",
    myDocusoftURL: "http://www.mydocusoft.com/",
    infomanaagerUrl: "https://infomanager.docusms.uk/",
    docusoftPracticeURL: "https://docusoftpractice.com/PracticeServices.asmx/",
    PracticeSiteURL: "https://accountancy.mydocusoft.com/",
    geminiAI: "https://ai.docusoftpractice.com/",
    dateFormate: "DD/MM/YYYY",
  },
};

// ---- Select environment ---- //
const activeServer = origin ? servers.us : servers.uk;

// ---- Helper to create axios instances ---- //
const createClient = (baseURL, timeout = 500000) =>
  axios.create({ baseURL, timeout });

// ---- Export APIs ---- //

export const dsdesktopwebservice = createClient(
  activeServer.dsdesktopwebservice
);
export const portalClient = createClient(activeServer.portalClient, 500000);
export const portalUser = createClient(activeServer.portalUser, 50000);
export const docuEngagerClient = createClient(activeServer.docuEngagerClient);
export const WhatsAppservice = createClient(activeServer.WhatsAppservice);
export const calendlyService = createClient(activeServer.calendlyService);
export const practiceTestOnlyForTesting = createClient(
  activeServer.practiceTestOnlyForTesting
);
export const docuSMSApi = createClient(activeServer.docuSMSApi);
export const PracticeServices = createClient(activeServer.PracticeServices);
export const OutlookMydocusoft = createClient(activeServer.OutlookMydocusoft);
export const AccountancyMydocusoftURL = createClient(
  activeServer.AccountancyMydocusoft
);
export const AccountancyMydocusoft = createClient(
  activeServer.AccountancyMydocusoft
);
export const DocuPracticeInterSepter = createClient(
  activeServer.docusoftPracticeURL
);

export const geminiAiItersepter = createClient(
  activeServer.geminiAI
);

// site URL
export const EngagerDocumentSignURL = activeServer.documentSignUrl;
export const EngagerTemplateSignURL = activeServer.templateSign;
export const portalMydocusoftSiteURL = activeServer.portalMydocusoftURL;
export const DateFormateRule = activeServer.dateFormate;
export const FormeditorDocumentURL = activeServer.formeditorDocument;
export const MyDocusoftSiteURL = activeServer.myDocusoftURL;
export const InfomanaagerUrl = activeServer.infomanaagerUrl;
export const PracticeSiteURL = activeServer.PracticeSiteURL;
export const geoOriginIndicator = origin;
