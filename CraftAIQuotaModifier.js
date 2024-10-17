var modifyResponse = (response) => {
    try {
        let body = JSON.parse(response.body);
        if (body.hasOwnProperty("max") && body.max === 0) {
            body.max = 100; // Update the 'max' value to 100
        }
        response.body = JSON.stringify(body);
    } catch (error) {
        console.log("Error modifying the JSON response: " + error.message);
    }
    return response;
};

modifyResponse($response);