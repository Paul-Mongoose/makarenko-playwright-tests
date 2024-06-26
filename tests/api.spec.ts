import { test, expect } from '@playwright/test';
import { ServiceApi } from '../api';
import { USER } from '../data';
import { userDataSchema, verifyJoiSchemas } from '../utils';

test.describe('Localizify Api tests', () => {
  const serviceApi = new ServiceApi();

  test('C-API-1 Login | Success', async () => {
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
});
