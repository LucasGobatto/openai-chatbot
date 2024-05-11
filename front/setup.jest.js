// https://www.npmjs.com/package/jest-fetch-mock
import { enableFetchMocks } from 'jest-fetch-mock';

// https://stackoverflow.com/questions/74497916/referenceerror-request-is-not-defined-when-testing-with-react-router-v6-4
enableFetchMocks();
