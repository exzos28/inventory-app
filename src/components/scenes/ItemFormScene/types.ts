export type Inputs = {
  image?: {uri: string};
  name: string;
  serialNumber: string;
  fields: {
    label: string;
    value: string;
  }[];
};

export type InputsResult = {
  image?: {uri: string};
  name: string;
  serialNumber: string;
  fields: {
    label: string;
    value: string;
  }[];
};
