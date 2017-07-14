export class Product {
    Name: string;
    PropertyID: number;
    Active: number;
    ID: number;
    Operation: string;

}
export class Template {
    Connectionstring: string;
    Name: number;
    ID: number;
    ProductMasterID: number;
    TableMasterID: string;
    PrimaryKeyMasterID: string;
    RequestInfo: string;

}

export class DropDownClass {
    Name: number;
    ID: number;
}
export class ProductTableList {
    Name: number;
    ID: number;
    type: boolean
}

export class ProductTable {
    Name: string;
    ID: number;
    PrimaryKey: string;
    ProductID: number;
    PropertyID: number
    statusID: number;
    RequestInfo: string;
    DestinationDBSchemaID: number;
}
export class CheckBox {
    Name: string;
    ID: number;
    Selected: boolean;
}
export class TableColumn
{
    Name:string;
    DataType:string;
    MaxSize:number;
    Selected:boolean;
    Disable:boolean;

}
export class ProductTableStructure{
    TableName:string;
    ProductID:number;
    PropertyID:number;
    PrimarkyKey:CheckBox[];
    SelectedColumn:TableColumn[];
    DeletedColumn:TableColumn[];
    StatusId:number;
    SchemaId:number;


}


