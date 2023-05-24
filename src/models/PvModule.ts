export class PvModuleCollection {
    type?: string;
    features? : PvModule[];
}

export class PvModule {
    type?: string;
    properties?: PvModuleProperties;
    geometry?: PvModuleGeometry;
}

export class PvModuleProperties {
    uplift?: number;
    sliding?: number;
}

export class PvModuleGeometry {
    type?: string;
    coordinates?: any;
}
