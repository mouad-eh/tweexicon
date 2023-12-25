// This file contains data used for testing

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'password123',
};

const testCategory1 = {
  name: 'life',
  color: '#ff0000',
};

const testCategory2 = {
  name: 'work',
  color: '#000000',
};

const testPosts = [
  {
    url: 'https://twitter.com/user/status/1',
    categoryName: testCategory1.name,
  },
  {
    url: 'https://twitter.com/user/status/2',
    categoryName: testCategory2.name,
  },
  {
    url: 'https://twitter.com/user/status/3',
    categoryName: testCategory1.name,
  },
  {
    url: 'https://twitter.com/user/status/4',
    categoryName: testCategory2.name,
  },
  {
    url: 'https://twitter.com/user/status/5',
    categoryName: testCategory2.name,
  },
  {
    url: 'https://twitter.com/user/status/6',
    categoryName: testCategory1.name,
  },
  {
    url: 'https://twitter.com/user/status/7',
    categoryName: testCategory1.name,
  },
  {
    url: 'https://twitter.com/user/status/8',
    categoryName: testCategory1.name,
  },
  {
    url: 'https://twitter.com/user/status/9',
    categoryName: testCategory1.name,
  },
];

module.exports = {
  testUser, testCategory1, testCategory2, testPosts,
};
