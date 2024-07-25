import { userDataSchema, verifyJoiSchemas } from '../../utils';
import { ServiceApi } from '../../utils/apiService';
import { test, expect } from '@playwright/test';
import { USER } from '../../helpers/testData';

test.describe('Localizify Api tests', () => {
  const serviceApi = new ServiceApi();

  test('C-API-1 POST /api/auth/login | 200 | Success', async () => {
    // Act
    const response = await serviceApi.login(USER);

    // Assert
    expect(response.status, `Status for ${response.url} should be 200`).toBe(
      200,
    );
    verifyJoiSchemas(
      response.body,
      userDataSchema(USER),
      `Wrong schema for userData response body`,
    );
  });

  test('C-API-2 POST /api/auth/login | 403 | Password invalid', async () => {
    // Act
    const response = await serviceApi.login({
      email: USER.email,
      password: 'fake',
    });

    // Assert
    expect(response.status, `Status for ${response.url} should be 403`).toBe(
      403,
    );
    expect(response.body, `Response error message should be another`).toEqual({
      statusCode: 403,
      message: 'Password invalid',
    });
  });

  test('C-API-3 POST /api/auth/login | 403 | User email fake not exist', async () => {
    // Act
    const response = await serviceApi.login({
      email: 'fake',
      password: 'fake',
    });

    // Assert
    expect(response.status, `Status for ${response.url} should be 403`).toBe(
      403,
    );
    expect(response.body, `Response error message should be another`).toEqual({
      statusCode: 403,
      message: 'User email fake not exist',
    });
  });
});
