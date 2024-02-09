import React from 'react';
/**
 * These are the dev configurations that will be passed on to the widget, these do not
 * include the client configs.
 */
import { DevConfigurations, LenderConfigurations } from "src/constants/types";
export interface Configurations {
    devConfig: DevConfigurations | null;
    lenderConfig: LenderConfigurations | null;
    jwtToken?: string;
    lenderUuid: string;
}
export interface PageContextInterface {
    currentPage: string;
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}
export interface ConfigContextInterface {
    config: Configurations;
    setConfig: React.Dispatch<React.SetStateAction<Configurations>>;
}
