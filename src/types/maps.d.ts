type MapCoordinate = [number, number];

type MapLocation = {
  id: string;
  name: string;
  description: string;
  coordinates: MapCoordinate;
  category: string;
  address: string;
  icon: string;
  color: string;
};

type MapData = {
  locations: MapLocation[];
};

type MapLocationsReponse = {
  data: MapData;
};
