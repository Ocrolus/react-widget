export interface DevConfigurations extends LenderConfigurations {
  previewMode?: boolean;
  page?: string;
}

export interface LenderConfigurations {
  domains: string[];
  brandingColor: string;
  uploadHeaderText: string;
  uploadBodyText: string;
  textColor: string;
  connectToBank: boolean;
  bankHeaderText: string;
  bankBodyText: string;
}

export interface DefaultConfig {
  devConfig?: DevConfigurations;
  config?: LenderConfigurations;
}
