// import { IUserDocument } from "../database";
// import { UserRepository } from "../repository/user.repository";

// // export interface IWrite<T> {
// //   create(item: T): Promise<boolean>;
// //   update(id: number, item: T): Promise<boolean>;
// //   delete(id: number): Promise<boolean>;
// // }

// // export interface IRead<T> {
// //   read(item: T): Promise<T[]>;
// //   readOne(id: number): Promise<T>;
// // }

// describe("user repository", () => {
//   let userRepo: UserRepository;
//   beforeAll(async () => {
//     userRepo = new UserRepository();
//   });

//   it("should have access to a database connection", () => {
//     expect(userRepo.database).toBeDefined();
//   });

//   it("should have a method called createUser", () => {
//     expect(userRepo.create).toBeDefined();
//   });

//   it("should call the create method on the database when invoking the createUser method on userRepository", (done) => {
//     const spy = jest.spyOn(userRepo.database, "create");
//     userRepo.create({
//       displayName: "Som",
//       role: "User",
//       password: "123",
//     });
//     expect(spy).toHaveBeenCalled();
//     done();
//   });

//   it("The createUser method should return a new user", (done) => {
//     userRepo.create({
//       displayName: "Som",
//       role: "User",
//       password: "123",
//     }).then((result) => {
//       expect(result).toEqual(true);
//     });
    
//     done();
//   });

//   afterEach(() => {
//     userRepo.database.clear();
//   });
// });
