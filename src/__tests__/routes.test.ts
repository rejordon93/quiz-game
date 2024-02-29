import request from 'supertest';
import { expect, test, describe, beforeAll, afterAll } from '@jest/globals';

import app from '../index';
import { db } from '../db';
import { User } from '../models/User';
import { Quiz } from '../models/Quiz';

async function EmptyDB() {
  // our cleanup goes here //
}

async function AddTestData() {
  // our setup goes here //e
}

beforeAll(AddTestData)
afterAll(EmptyDB)

describe("Testing user routes", () => {

  test("Fail show all users for unauthorized", async() => {
   
  });

  test("Adding user to db with valid data", async() => {
    
  });

  test("Bad request if missing data", async() => {
    
  });

  test("Bad request with duplicate username", async() => {
   
  });
  
  test("Authorized with valid credentials", async() => {
   
  });

  test("Fail to authorize with invalid credentials", async() => {
   
  });

  test("Get user by username", async() => {
    
  });

  test("Fail to find user", async() => {
   
  });
});

describe("Quiz routes", () => {

  test("Get all quizzes", async() => {
   
  });

  test("Add quiz results", async() => {
   
  });

  test("Show all quizzes by user id", async() => {
   
  });

  test("User did not take any quizzes", async() => {
    
  });

  test("Update score for the quiz", async() => {
   
  });

});

