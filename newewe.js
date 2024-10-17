var modifyRequest = (request) => {
    // Remove specific headers
    delete request.headers['ETag']; // Remove ETag
    delete request.headers['If-None-Match']; // Remove If-None-Match
    delete request.headers['Cache-Control']; // Optionally remove Cache-Control if needed

    // Optional: Add or modify other headers here as needed
    return request;
};

modifyRequest($request);