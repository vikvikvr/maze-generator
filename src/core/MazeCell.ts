export class MazeCell {
  public topWall = true;
  public bottomWall = true;
  public leftWall = true;
  public rightWall = true;
  public wasVisited = false;

  constructor(public columnIndex = 0, public rowIndex = 0) {}
}
