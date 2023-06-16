-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'STAFF', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'TBD');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "age" INTEGER NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "address" VARCHAR NOT NULL,
    "phone_number" VARCHAR(12) NOT NULL,
    "gender" "Gender" NOT NULL,
    "status" "Status" NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "role_name" "roles" NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleOfUser" (
    "userId" UUID NOT NULL,
    "roleNameId" UUID NOT NULL,

    CONSTRAINT "RoleOfUser_pkey" PRIMARY KEY ("userId","roleNameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "RoleOfUser" ADD CONSTRAINT "RoleOfUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleOfUser" ADD CONSTRAINT "RoleOfUser_roleNameId_fkey" FOREIGN KEY ("roleNameId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
