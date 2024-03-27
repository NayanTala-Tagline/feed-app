export const STATUS_CODE = Object.freeze({
  // Success codes
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Redirection codes
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // Client error codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server error codes
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
});

export const RESPONSE_MESSAGE = Object.freeze({
  INTERNAL_SERVER_ERROR: "Internal Server Error!",
  FILE_UPLOAD_ERROR: "Error occurred during file upload",
  FILE_UPLOAD_LIMIT_SIZE_ERROR: "File size exceeds the limit",
  FILE_UPLOAD_UNEXPECTED_FILE_ERROR: "Exceeded the maximum number of files allowed",
  FEED_CREATED: "Feed added successfully!",
  FEED_RETRIEVED: "Feeds retrieved successfully!",
  FEED_LIKED: "Feed liked successfully!"
});
