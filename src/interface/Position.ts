
export interface Position {
  userId: string;
  aka: string;
  userIdx: number;
  position: {
    latitude: number;
    longitude: number;
  };
}