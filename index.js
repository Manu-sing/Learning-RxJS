const { Observable } = require("rxjs");
const { map } = require("rxjs/operators");

const users = {
  data: [
    {
      status: "active",
      age: 10,
    },
    {
      status: "inactive",
      age: 18,
    },
    {
      status: "active",
      age: 11,
    },
    {
      status: "inactive",
      age: 22,
    },
    {
      status: "inactive",
      age: 17,
    },
    {
      status: "active",
      age: 30,
    },
    {
      status: "inactive",
      age: 16,
    },
  ],
};

const users2 = {
  data: [
    {
      status: "active",
      age: 14,
    },
    {
      status: "inactive",
      age: 18,
    },
    {
      status: "active",
      age: 11,
    },
    {
      status: "inactive",
      age: 22,
    },
    {
      status: "inactive",
      age: 17,
    },
    {
      status: "active",
      age: 30,
    },
    {
      status: "inactive",
      age: 16,
    },
  ],
};

const observable = new Observable((subscriber) => {
  // here I insert the users data in the observable
  subscriber.next(users2);
  subscriber.complete();
  // whatever happens after a complete or an error method will not be run
  subscriber.next(users2);
  // now the observable is going to send data into the pipe and the last operator in the pipe will send the processed data to the observer, which will process them with different methods depending on what happened in the pipe
}).pipe(
  map((value) => {
    // console.log("1) Got the data from the observable ", value);
    return value.data;
  }),
  map((value) => {
    // console.log("2) Got the data from the first operator ", value);
    return value.filter((u) => u.status === "active");
  }),
  map((value) => {
    // console.log("3) Got the data from the second operator ", value);
    return value.reduce((sum, user) => sum + user.age, 0) / value.length;
  }),
  map((value) => {
    // console.log("4) Got the data from the third operator ", value);
    if (value < 18) throw new Error("The average age is too young");
    else return value;
  })
);

const observer = {
  next: (value) => {
    console.log("I'm the observer and I got a " + value);
  },
  error: (error) => {
    console.log("I'm the observer and I got an error " + error);
  },
  complete: () => {
    console.log("I'm the obrserver and I got a complete notification");
  },
};

// now we need to connect the observable with the observer so that the observer can receive the data emitted from the observable pipe
observable.subscribe(observer);
