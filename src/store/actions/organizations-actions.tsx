import { ActionMapper, OrganizationInterface } from "@/lib/types";

// Organizations
export type OrganizationsActionTypes = {
    ["organizations/LOAD_START"]: {
      type: "organizations/LOAD_START";
    };
    ["organizations/LOAD_SUCCESS"]: {
      type: "organizations/LOAD_SUCCESS";
      payload: Array<OrganizationInterface>;
    };
    ["organizations/LOAD_FAILURE"]: {
      type: "organizations/LOAD_FAILURE";
      payload: string;
    };
  };
  // Actions
  export type OrganizationsActions =
    ActionMapper<OrganizationsActionTypes>[keyof ActionMapper<OrganizationsActionTypes>];
  