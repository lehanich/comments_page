function on(element: EventTarget, event: string){ //onClick
// function on(element: any, event: any){ //onClick
  let cb: null | ((e: Event) => void) = null;

  // function func (e) {
  //   element.removeEventListener(event, func)
  //   resolve({ value: e, done: false});
  // }
  function func(e: Event) {
    if (typeof cb === "function") {
      cb(e);
    }
    cb = null;
  }
  element.addEventListener(event, func);

  return {
    [Symbol.asyncIterator](){
      return this;
    },

    next: ()=> new Promise((resolve => {
      cb = (event: Event) => resolve({done: false, value: event});
    })),

    throw() {
      return this.throw();
    },
    return: ()=> {
      console.log("test")
      element.removeEventListener(event,func);
      return Promise.resolve({done: true , value: {}})
    }
  }
}

// function on(emitter, event) {
//   async function* loop() {
//     while (true) {
//       yield await onceClick(emitter, event) // onClick
//     }
//   }

//   const iter = loop();
//   let i = iter.next();
//   console.log(i.value)

//   return {
//     [Symbol.asyncIterator]() {
//       return this; // loop()
//     },

//     async next() {
//       let t = await iter.next();
//       console.log(t)
//       console.log(t.value)
//       return  Promise.resolve({value: t.value, done: false}); //t.value; // 
//     },

//     return() {
//       iter.return();
//       return Promise.resolve({done:true})
//     }
//   }
// }

//aply
function onceClick(element: EventTarget, event: string) {
  return new Promise((resolve) => {
    function func (e: Event) {
      element.removeEventListener(event, func)
      resolve(e); //{ value: e, done: false}
    }
    element.addEventListener(event, func); // , { once: true } // value
  });
}

async function* once(element: EventTarget, event: string) {
  console.log("add listener", element, event);

  yield onceClick(element, event) //onceClick
  return Promise.resolve({done:true})
}

async function* seq (...iterables: AsyncGenerator<Event | any>[]) { //!!!!!!!
  // console.dir(iterables)
  for (const i of iterables) {
    for await (const el of i) {
      // console.log(el)
      yield  el; //el.value ? el.value : el;
    }
  }
}

async function* any (...iterables: any[]) {
// async function* any (...iterables: AsyncGenerator<Event, any>[]) {
  const iters = iterables.map((el) => el[Symbol.asyncIterator]())
  
  while (true) {
    yield (await Promise.race(iters.map(i => i.next()))).value; // any
  }
}

async function* repeat(fn: () => AsyncGenerator<any>) { // MouseEvent
  console.log("start repeat");

  for(;;){
    const startFn = fn();
    for await(const e of startFn) {
      yield e;
    }
  }
}

async function* every(iterables: AsyncGenerator<Event>, fn: (ev: Event) => boolean){
  for await(const event of iterables){
    if(!event || !fn(event)) {
      return event
    }

    yield event
  }
}

async function* every2(iterables: AsyncGenerator<Event>, fn: (ev: Event) => boolean){
  for await(const event of iterables){
    if(!event || !fn(event)) {
      yield event
      break;
    }

    yield event
  }
}

function onlyEvent(eventName: string): (ev: Event) => boolean {
  return (e) => e.type === eventName ? true : false;
}

function onlyEvents(...events: any): any { // [string]    (ev: Event) => boolean
  return (e: any) => events.includes(e.type) ? true : false;
}

function filter(iterable: AsyncGenerator, fn: (evName: string | [string]) => boolean) {
  const iter = iterable[Symbol.asyncIterator]();

  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      let el = await iter.next();

      // console.log(1,el);

      if (el.done || !el.value){
        return this.return();
      }

      while (!el.value && !fn(el.value)) {
        el = await iter.next();
        console.log(2,el.value);

      }

      return !el ? this.return() : Promise.resolve(el);
    },

    throw() {
      return this.throw();
    },

    return() {
      return Promise.resolve({
        value: null,
        done: true
      })
    }
  }
}

function map(iter: any, func: (e: Event) => Event) { // Iterable<Event> | AsyncIterableIterator<Event>
  const cursor = iter[Symbol.asyncIterator] ? iter[Symbol.asyncIterator]() : iter[Symbol.iterator]();

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next() {
      const el = await cursor.next();
      let newValue: Event = el.value;

      if (el.done) {
        return Promise.resolve({ done: true, value: null });
      }

      newValue = func(newValue);

      return Promise.resolve({ done: false, value: newValue })
    },

    throw() {
      return this.throw();
    },

    return() {
      return Promise.resolve({done: true});
    }
  }
}

async function* take (obj: AsyncGenerator, max: number) {
  for await (const el of obj) {
    max--
    yield await el;
    if (max === 0) {
      break;
    }
  }
}

export {
  on,
  once,
  seq,
  any,
  repeat,
  every,
  every2,
  onlyEvent,
  onlyEvents,
  filter,
  map,
  take
};