class NameSpace {
  constructor(id, nsTitle, img, endpoint) {
    this.id = id;
    this.img = img;
    this.nsTitle = nsTitle;
    this.endpoint = endpoint;
    this.rooms = [];
  }
// Method 
  addRoom(roomObj) {
    this.rooms.push(roomObj);
  }
}

module.exports = NameSpace;
