// In-memory store for API key status. In a real-world scenario, you might use a more persistent store like Redis.
export type ApiKeyStatus = {
  name: string;
  key: string;
  status: 'standby' | 'active' | 'quotaExceeded' | 'error';
};

let currentKeyIndex = 0;
let apiKeys: ApiKeyStatus[] = [];

// Initialize keys from environment variables
const initializeKeys = () => {
    const keysFromEnv = [
        process.env.YOUTUBE_API_KEY_1,
        process.env.YOUTUBE_API_KEY_2,
        process.env.YOUTUBE_API_KEY_3,
        process.env.YOUTUBE_API_KEY_4,
        process.env.YOUTUBE_API_KEY_5,
    ].filter((key): key is string => !!key);

    apiKeys = keysFromEnv.map((key, index) => ({
        name: `Key ${index + 1}`,
        key: key,
        status: 'standby',
    }));
};

initializeKeys();

export const getNextApiKey = (failedIndex: number | null = null) => {
    if (apiKeys.length === 0) {
        return { apiKey: null, keyIndex: -1, keys: [] };
    }

    if (failedIndex !== null) {
      currentKeyIndex = (failedIndex + 1) % apiKeys.length;
    }
    
    // Simple round-robin, but you could add more logic to skip errored keys
    const startingIndex = currentKeyIndex;
    do {
        const keyInfo = apiKeys[currentKeyIndex];
        if (keyInfo.status !== 'quotaExceeded') {
            const result = { apiKey: keyInfo.key, keyIndex: currentKeyIndex, keys: apiKeys };
            // Move to next key for the subsequent request
            // currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
            return result;
        }
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
    } while (currentKeyIndex !== startingIndex);

    // All keys have exceeded quota
    return { apiKey: null, keyIndex: -1, keys: apiKeys };
};

export const updateApiKeyStatus = (index: number, status: ApiKeyStatus['status']) => {
    if (apiKeys[index]) {
        // Don't override a 'quotaExceeded' status unless it's a reset mechanism
        if (apiKeys[index].status === 'quotaExceeded' && status !== 'standby') {
          return;
        }
        apiKeys[index].status = status;
        
        // When a key becomes active, others should be standby
        if (status === 'active') {
            apiKeys.forEach((key, i) => {
                if (i !== index && apiKeys[i].status !== 'quotaExceeded' && apiKeys[i].status !== 'error') {
                    apiKeys[i].status = 'standby';
                }
            });
        }
    }
};

export const getApiKeysStatus = () => {
    // Return a copy to prevent direct modification
    return { keys: apiKeys.map(k => ({...k, key: '**********'})) };
};
