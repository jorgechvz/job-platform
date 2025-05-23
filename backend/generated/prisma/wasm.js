
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */

Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.7.0
 * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
 */
Prisma.prismaVersion = {
  client: "6.7.0",
  engine: "3cff47a7f5d65c3ea74883f1d736e41d68ce91ed"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  passwordHash: 'passwordHash',
  image: 'image',
  phone: 'phone',
  location: 'location',
  about: 'about',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  companyId: 'companyId'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.JobPreferenceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  jobType: 'jobType',
  locationPreference: 'locationPreference',
  salaryExpectation: 'salaryExpectation',
  salaryCurrency: 'salaryCurrency',
  availability: 'availability'
};

exports.Prisma.EducationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  institution: 'institution',
  degree: 'degree',
  startDate: 'startDate',
  endDate: 'endDate',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CertificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  issuingOrganization: 'issuingOrganization',
  issueDate: 'issueDate',
  expirationDate: 'expirationDate',
  credentialId: 'credentialId',
  credentialUrl: 'credentialUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkExperienceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  company: 'company',
  title: 'title',
  startDate: 'startDate',
  endDate: 'endDate',
  description: 'description',
  location: 'location',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  type: 'type',
  startDate: 'startDate',
  endDate: 'endDate',
  description: 'description',
  technologies: 'technologies',
  projectUrl: 'projectUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DocumentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  url: 'url',
  type: 'type',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  industry: 'industry',
  location: 'location',
  size: 'size',
  contactEmail: 'contactEmail',
  websiteUrl: 'websiteUrl',
  logoUrl: 'logoUrl',
  description: 'description',
  isVerified: 'isVerified',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobOfferScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  companyId: 'companyId',
  postedById: 'postedById',
  jobType: 'jobType',
  location: 'location',
  isRemote: 'isRemote',
  salaryMin: 'salaryMin',
  salaryMax: 'salaryMax',
  salaryCurrency: 'salaryCurrency',
  status: 'status',
  isFeatured: 'isFeatured',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobApplicationScalarFieldEnum = {
  id: 'id',
  jobOfferId: 'jobOfferId',
  studentId: 'studentId',
  status: 'status',
  appliedAt: 'appliedAt',
  updatedAt: 'updatedAt',
  coverLetter: 'coverLetter',
  resumeDocumentId: 'resumeDocumentId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  STUDENT: 'STUDENT',
  RECRUITER: 'RECRUITER',
  ADMIN: 'ADMIN'
};

exports.JobType = exports.$Enums.JobType = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERNSHIP: 'INTERNSHIP',
  FREELANCE: 'FREELANCE'
};

exports.LocationPreference = exports.$Enums.LocationPreference = {
  ON_SITE: 'ON_SITE',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID',
  ANY: 'ANY'
};

exports.Availability = exports.$Enums.Availability = {
  IMMEDIATE: 'IMMEDIATE',
  TWO_WEEKS: 'TWO_WEEKS',
  ONE_MONTH: 'ONE_MONTH',
  NEGOTIABLE: 'NEGOTIABLE'
};

exports.DocumentType = exports.$Enums.DocumentType = {
  CV: 'CV',
  CERTIFICATE: 'CERTIFICATE',
  PORTFOLIO: 'PORTFOLIO',
  OTHER: 'OTHER'
};

exports.JobOfferStatus = exports.$Enums.JobOfferStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  CLOSED: 'CLOSED'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  SUBMITTED: 'SUBMITTED',
  REVIEWED: 'REVIEWED',
  INTERVIEWING: 'INTERVIEWING',
  OFFERED: 'OFFERED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN'
};

exports.Prisma.ModelName = {
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  User: 'User',
  Skill: 'Skill',
  JobPreference: 'JobPreference',
  Education: 'Education',
  Certification: 'Certification',
  WorkExperience: 'WorkExperience',
  Project: 'Project',
  Document: 'Document',
  Company: 'Company',
  JobOffer: 'JobOffer',
  JobApplication: 'JobApplication'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
