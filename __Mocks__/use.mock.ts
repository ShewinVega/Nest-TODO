import { Roles } from "../src/user/enum/role.enum";



export const userTest = [
    {
        id: 1,
        name: "userTest",
        email: "test@hotmail.com",
        password: "passwordTest",
        role: Roles.ADMIN,
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        id: 2,
        name: "defaultUser",
        password: "sape",
        email: "default@hotmail.com",
        role: Roles.USER,
        updatedAt: new Date(),
        createdAt: new Date(),
    },
    {
        id: 3,
        name: "StaticUser",
        password: "sape",
        email: "staticUser@gmail.com",
        role: Roles.USER,
        updatedAt: new Date(),
        createdAt: new Date(),
    },
];
