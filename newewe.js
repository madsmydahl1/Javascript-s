// Function to modify HTTP requests (removing headers)
var modifyRequest = (request) => {
    // Remove cache-related headers that might interfere with fetching fresh data
    delete request.headers['ETag'];
    delete request.headers['If-None-Match'];
    delete request.headers['Cache-Control'];

    // Optional: Add other headers if needed (example: custom headers)
    // request.headers['Custom-Header'] = 'CustomValue';

    return request;
};

// Function to modify HTTP responses (modifying quota values for GPT-4o)
var modifyResponse = (response) => {
    try {
        let body = JSON.parse(response.body); // Parse the response body as JSON
        
        // Modify the 'max' field if it exists and the model is GPT-4o
        if (body.model === "gpt-4o" && body.hasOwnProperty("max")) {
            body.max = 50; // Update the 'max' value to 50 requests
        }

        // Optionally update other fields like 'remaining' if needed
        if (body.hasOwnProperty("remaining") && body.remaining === 0) {
            body.remaining = 50; // Set remaining requests to 50
        }

        // Modify resetTime if it exists to a future date (e.g., 30 days from now)
        if (body.hasOwnProperty("resetTime")) {
            body.resetTime = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days from now
        }

        response.body = JSON.stringify(body); // Convert back to a JSON string
    } catch (error) {
        console.log("Error modifying the JSON response: " + error.message);
    }

    return response;
};

// Apply the request and response modifications
modifyRequest($request);
modifyResponse($response);
