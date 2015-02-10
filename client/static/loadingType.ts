'use strict';

//Types of loadings that application performs
module Static {
    export class LoadingType {
        public static Entity:string = 'Entity';
        public static EntityData:string = 'EntityData';
        public static EntityList:string = 'EntityList';
        public static EntityListMetadata:string = 'EntityListMetadata';
        public static EntityListCache:string = 'EntityListCache';
        public static EntitySubmit:string = 'EntitySubmit';
        public static EntityDelete:string = 'EntityDelete';
        public static EntityMetadataListCache:string = 'EntityMetadataListCache';
        public static EntitySchemaData:string = 'EntitySchemaData';
        public static EntitySchemaSubmit:string = 'EntitySchemaSubmit';
        public static FilteredListMetadata:string = 'FilteredListMetadata';
        public static FieldListMetadata:string = 'FieldListMetadata';
        public static FieldSchemaData:string = 'FieldSchemaData';
        public static FieldSchemaSubmit:string = 'FieldSchemaSubmit';
    }
}
