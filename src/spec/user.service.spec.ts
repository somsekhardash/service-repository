// // @ts-nocheck
// import Database from './../database';
// import { UserRepository } from './../repository/user.repository';
// import { UserService } from './../service/user.service';

// describe('User service', () => {
//   let userService = new UserService(new UserRepository())

//   it('Should have access to the user repository', () => {
//     expect(userService.userRepo).toBeDefined()
//   })

//   it('Should have a method called createUser', () => {
//     expect(userService.createUser).toBeDefined()
//   })

//   it('should call the createUser method on the userRepository when the createUser method on the service gets invoked', async (done) => {
//     const spy = jest.spyOn(userService.userRepo, 'createUser')
//     await userService.createUser({ userName: 'John Doe' })

//     expect(spy).toHaveBeenCalled()
//     done()
//   })

//   it('Should return a created user', async (done) => {
//     const createdUser = await userService.createUser({ userName: 'John Doe' })
//     const createdUser2 = await userService.createUser({ userName: 'Doe John' })

//     expect(createdUser).toEqual({
//       id: 1,
//       userName: 'John Doe',
//     })

//     expect(createdUser2).toEqual({
//       id: 2,
//       userName: 'Doe John',
//     })

//     done()
//   })

//   afterEach(() => {
//     Database.clear()
//   })
// })

// test('adds 1 + 2 to equal 3', () => {
//     expect(true).toBe(true);
//   });

// interface IMacBook {
//   addEngraving(): void;
//   addParallels(): void;
//   add4GBRam(): void;
//   add8GBRam(): void;
//   addCase(): void;
// }

// class macbookPRO implements IMacBook {
//   addEngraving(): void {
//     throw new Error("Method not implemented.");
//   }
//   addParallels(): void {
//     throw new Error("Method not implemented.");
//   }
//   add4GBRam(): void {
//     throw new Error("Method not implemented.");
//   }
//   add8GBRam(): void {
//     throw new Error("Method not implemented.");
//   }
//   addCase(): void {
//     throw new Error("Method not implemented.");
//   }
//   getPrice(): number {
//     return 300;
//   }
// }

// class macBookDecorator implements IMacBook {
//   macBook: IMacBook;

//   constructor(macBook: IMacBook) {
//     this.macBook = macBook;
//   }

//   addEngraving(): void {
//     this.macBook.addEngraving();
//   }
//   addParallels(): void {
//     this.macBook.addParallels();
//   }
//   add4GBRam(): void {
//     this.macBook.add4GBRam();
//   }
//   add8GBRam(): void {
//     this.macBook.add8GBRam();
//   }
//   addCase(): void {
//     this.macBook.addCase();
//   }
//   getPrice(): number {
//     return this.macBook.getPrice();
//   }
// }

// class CaseDecorator extends macBookDecorator {
//   macBook: IMacBook;
  
//   constructor(macBook: IMacBook) {
//     super(macBook);
//     this.macBook = macBook;
//   }

//   addCase(): string {
//     return this.macBook.addCase() + "Adding case to macbook";
//   }

//   getPrice(): number {
//     return this.macBook.getPrice() + 45.00;
// };

// }


import { EventService } from "./../service/service";

describe("Event repository", () => {
  let eventService: EventService = new EventService();

  it("should have a method called createEvent", () => {
    expect(eventService.create).toBeDefined();
  });
});
