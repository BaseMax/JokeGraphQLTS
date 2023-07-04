import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JokeService } from '../src/modules/joke/joke.service';
import { Joke, PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { Role } from '../src/modules/auth/types/role.enum';
import * as bcrypt from 'bcrypt';

describe('(e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let jokeService: JokeService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jokeService = moduleFixture.get<JokeService>(JokeService);
    prisma = app.get(PrismaService);

    await app.init();
  });

  beforeAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.joke.deleteMany({});

    const hashPassword = async (password: string) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    };

    await prisma.user.createMany({
      data: [
        {
          email: 'admin@gmail.com',
          username: 'admin',
          password: await hashPassword('12345678'),
          role: Role.Admin,
        },
        {
          email: 'user@gmail.com',
          username: 'user',
          password: await hashPassword('12345678'),
          role: Role.User,
        },
      ],
    });

    await prisma.category.create({
      data: {
        name: 'category test',
      },
    });

    await prisma.joke.createMany({
      data: [
        {
          text: 'this is joke 1',
          categoryId: 1,
        },
        {
          text: 'this is joke 1',
          categoryId: 1,
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.joke.deleteMany({});
    await app.close();
  });

  describe('Auth login/register', () => {
    it('should register a new user', async () => {
      const registerInput = {
        email: 'test@gmail.com',
        username: 'thisistestusername',
        password: '123456789',
      };

      const mutation = `mutation {
        registerUser(registerInput: {email: "${registerInput.email}",
        username: "${registerInput.username}",
        password: "${registerInput.username}"
      }) {
          access_token
        }
      }`;

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation });

      expect(response.status).toBe(200);
      expect(response.body.data?.registerUser.access_token).toBeDefined();
    });

    it('should login a user', async () => {
      const loginInput = {
        emailOrUsername: 'user',
        password: '12345678',
      };

      const mutation = `mutation {
          loginUser(loginInput: {emailOrUsername: "${loginInput.emailOrUsername}", password:"${loginInput.password}"}) {
          access_token
        }
      }`;

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation });

      expect(response.status).toBe(200);
      expect(response.body.data.loginUser.access_token).toBeDefined();
    });
  });
  describe('jokes', () => {
    it('should get a random joke', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              getRandomJoke {
                id
                text
              }
            }
          `,
        });

      expect(response.status).toBe(200);
      const { data } = response.body;
      expect(data.getRandomJoke).toBeDefined();
    });

    it('should get all jokes', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              getAllJokes {
                id
                text
              }
            }
          `,
        });

      expect(response.status).toBe(200);
      const { data } = response.body;
      expect(data.getAllJokes).toBeDefined();
      expect(Array.isArray(data.getAllJokes)).toBe(true);
      expect(data.getAllJokes.length).toBeGreaterThan(0);
    });

    it('should get all jokes', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          query {
            getAllJokes {
              id
              text
            }
          }
        `,
        });

      expect(response.status).toBe(200);
      const { data } = response.body;
      expect(data.getAllJokes).toBeDefined();
      expect(Array.isArray(data.getAllJokes)).toBe(true);
      expect(data.getAllJokes.length).toBeGreaterThan(0);
    });

    it('should search for jokes', async () => {
      const query = 'funny';

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          query($query: String!) {
            searchJokes(query: $query) {
              id
              text
            }
          }
        `,
          variables: { query },
        });

      expect(response.status).toBe(200);
      const { data } = response.body;
      expect(data.searchJokes).toBeDefined();
      expect(Array.isArray(data.searchJokes)).toBe(true);

      // Ensure that the returned jokes contain the search query in their text
      data.searchJokes.forEach((joke: Joke) => {
        expect(joke.text.toLowerCase()).toContain(query.toLowerCase());
      });
    });

    it('should get top jokes', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          query {
            getTopJokes {
              id
              text
              rate
            }
          }
        `,
        });

      expect(response.status).toBe(200);
      const { data } = response.body;
      expect(data.getTopJokes).toBeDefined();
      expect(Array.isArray(data.getTopJokes)).toBe(true);
      expect(data.getTopJokes.length).toBeGreaterThan(0);

      // Ensure that the jokes are ordered by rate in descending order
      let previousRate = Infinity;
      data.getTopJokes.forEach((joke: Joke) => {
        expect(joke.rate).toBeLessThanOrEqual(previousRate);
        previousRate = joke.rate;
      });
    });

    it('should get a joke by ID', async () => {
      const joke = await jokeService.create({
        text: 'Joke by ID',
        categoryId: 1,
      });

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          query($id: Int!) {
            getJokeById(id: $id) {
              id
              text
            }
          }
        `,
          variables: { id: joke.id },
        });

      expect(response.status).toBe(200);
      const { data } = response.body;
      expect(data.getJokeById).toBeDefined();
      expect(data.getJokeById.id).toBe(joke.id);
      expect(data.getJokeById.text).toBe(joke.text);
    });
  });
});
