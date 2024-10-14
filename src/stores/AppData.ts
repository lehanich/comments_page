export default function AppData(){ // gateway
  let token = "";
  let breakpoint = 768;
  let notice;
  let modapWindow;

    // let usersMap = []; 
    // const eventEmitter = new MicroEmitter();
    // const CHANGE_EVENT = "change";
    
    // function fetch() {
    //   return gateway.get().then(setLocalUsers);
    // }

    function setToken(newToken: string) {
      token = newToken;
    }
    // function setLocalUsers(newUsers){
    //   usersMap = createMapFrom(newUsers);
    //   eventEmitter.emit(CHANGE_EVENT);
    // }

    // function getById(id){
    //   return usersMap[id];
    // }

    // function asMapById(map, value){
    //   map[value.id] = value;
    //   return map;
    // }

    // function createMapFrom(list){
    //     return list.reduce(asMapById, Object.create(null));
    // }

    // function onChange(handler){
    //   eventEmitter.on(CHANGE_EVENT, handler);
    // }
    
    return Object.freeze({
      token,
      breakpoint,
      notice,
      modapWindow,
      setToken
      // fetch,
      // getById,
      // onChange
    });
}