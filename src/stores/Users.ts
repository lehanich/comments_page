// import MicroEmitter from 'micro-emitter';

export default function UserStore(){ // gateway
  let token = "";

    // let usersMap = []; 
    // const eventEmitter = new MicroEmitter();
    // const CHANGE_EVENT = "change";
    
    // function fetch() {
    //   return gateway.get().then(setLocalUsers);
    // }

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
      token
      // fetch,
      // getById,
      // onChange
    });
}