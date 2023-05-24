import { PvModule, PvModuleCollection, PvModuleGeometry, PvModuleProperties } from "../models/PvModule"

export class ModulesMockData {
    public static GetMockData(): PvModuleCollection {
        return {
            type: "FeatureCollection",
            features: this.GetModulesMockData(30, 80),
        } as PvModuleCollection
    };

    public static GetModulesMockData(rowsCount: number, columnsCount: number): PvModule[] {
      const pvModules: PvModule[] = [];
      for (let row = 0; row < rowsCount; row++) {
        for (let col = 0; col < columnsCount; col++) {
          const randomUplift = Math.random() * 100;
          const randomSliding = Math.random() * 100;
          
          pvModules.push({
            type: "Feature",
            properties: {
              uplift: randomUplift,
              sliding: randomSliding
            } as PvModuleProperties,
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    1000 + col * 1100,
                    1000 + row * 2600
                  ],
                  [
                    1000 + col * 1100,
                    2500 + row * 2600
                  ],
                  [
                    2000 + col * 1100,
                    2500 + row * 2600
                  ],
                  [
                    2000 + col * 1100,
                    1000 + row * 2600
                  ]
                ]
              ]
            } as PvModuleGeometry
          } as PvModule);
        }
      }
      

      return pvModules;
    }
}

