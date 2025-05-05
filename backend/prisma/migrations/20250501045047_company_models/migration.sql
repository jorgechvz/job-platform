-- CreateEnum
CREATE TYPE "JobOfferStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SUBMITTED', 'REVIEWED', 'INTERVIEWING', 'OFFERED', 'REJECTED', 'WITHDRAWN');

-- AlterTable
ALTER TABLE "JobPreference" ALTER COLUMN "salaryCurrency" SET DEFAULT 'PEN';

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT,
    "location" TEXT,
    "size" TEXT,
    "contactEmail" TEXT,
    "websiteUrl" TEXT,
    "logoUrl" TEXT,
    "description" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobOffer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "location" TEXT NOT NULL,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "salaryCurrency" TEXT NOT NULL DEFAULT 'PEN',
    "status" "JobOfferStatus" NOT NULL DEFAULT 'ACTIVE',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "jobOfferId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coverLetter" TEXT,
    "resumeDocumentId" TEXT,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobOfferSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JobOfferSkills_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_contactEmail_key" ON "Company"("contactEmail");

-- CreateIndex
CREATE INDEX "JobApplication_jobOfferId_idx" ON "JobApplication"("jobOfferId");

-- CreateIndex
CREATE INDEX "JobApplication_studentId_idx" ON "JobApplication"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobOfferId_studentId_key" ON "JobApplication"("jobOfferId", "studentId");

-- CreateIndex
CREATE INDEX "_JobOfferSkills_B_index" ON "_JobOfferSkills"("B");

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_resumeDocumentId_fkey" FOREIGN KEY ("resumeDocumentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobOfferSkills" ADD CONSTRAINT "_JobOfferSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "JobOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobOfferSkills" ADD CONSTRAINT "_JobOfferSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
