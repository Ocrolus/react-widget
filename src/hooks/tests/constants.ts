import { Configurations } from "src/types/appTypes";

const config = {
  bankBodyText: "Securely connect your bank account and we'll upload the bank statements for you.",
  bankHeaderText: "Connect To Bank",
  brandingColor: "#00263a",
  connectToBank: false,
  domains: [
    "https://www.my.bank/upload",
    "https://my.bank/uploads/",
    "https://my.biz/ocrolus",
  ],
  instant: false,
  documentType: "BANK_STATEMENT",
  textColor: "#a2aaad",
  uploadBodyText: "Upload your documents for the last six months.",
  uploadHeaderText: "Upload Documents",
};

export const parsedConfig: Configurations = {
  lenderConfig: config,
  jwtToken: "your-jwt-token",
  lenderUuid: "6a21a64f-f1ce-4b92-b0ef-c3acf8dbf354",
};

export const apiConfig = {
  document_type: "BANK_STATEMENT",
  domains: [
    "https://www.my.bank/upload",
    "https://my.bank/uploads/",
    "https://my.biz/ocrolus",
  ],
  instant: false,
  branding_color: "#00263a",
  text_color: "#a2aaad",
  upload_header_text: "Upload Documents",
  upload_body_text: "Upload your documents for the last six months.",
  connect_to_bank: false,
  bank_header_text: "Connect To Bank",
  bank_body_text:
    "Securely connect your bank account and we'll upload the bank statements for you.",
};
