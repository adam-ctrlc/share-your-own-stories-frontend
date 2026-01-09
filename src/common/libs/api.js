/**
 * API client for experiences
 * Centralized HTTP layer with error handling
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Custom fetch wrapper with error handling
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.errors?.join(", ") || "Request failed"
      );
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Unable to connect to server. Please try again.");
    }
    throw error;
  }
}

// Sort options - must match backend
export const SORT_OPTIONS = {
  LATEST: "latest",
  OLDEST: "oldest",
  MOST_VIEWED: "most_viewed",
};

/**
 * Experience API methods
 */
export const experienceApi = {
  /**
   * Get paginated experiences with optional search and sorting
   * @param {object} options - Query options
   * @param {number} options.page - Page number
   * @param {number} options.limit - Items per page
   * @param {string} options.search - Search query
   * @param {string} options.sort - Sort option (latest|oldest|most_viewed)
   */
  async getAll({
    page = 1,
    limit = 20,
    search = "",
    sort = SORT_OPTIONS.LATEST,
  } = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
    });

    if (search.trim()) {
      params.set("search", search.trim());
    }

    return apiFetch(`/experiences?${params.toString()}`);
  },

  /**
   * Get a single experience by ID
   * @param {string} id - Experience ID
   */
  async getById(id) {
    return apiFetch(`/experiences/${id}`);
  },

  /**
   * Create a new experience
   * @param {string} content - Experience content
   */
  async create({ content, website }) {
    return apiFetch("/experiences", {
      method: "POST",
      body: JSON.stringify({ content, website }),
    });
  },
};

export default experienceApi;
