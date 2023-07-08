import mongoose from "@/app/api/mongodb";

export interface TisiniOrganizationInterface {
  organization_name: string; // Organization name with a max length of 300 and min length of 1
  org_logo?: string | null; // Optional Organization logo
}

export interface TisiniOrganizationDocumentInterface
  extends TisiniOrganizationInterface,
    mongoose.Document {
  _id: any;
  _doc: TisiniOrganizationInterface;
}

export interface TisiniOrganizationModelInterface
  extends mongoose.Model<TisiniOrganizationDocumentInterface> {
  build(attr: TisiniOrganizationInterface): TisiniOrganizationDocumentInterface;
}
