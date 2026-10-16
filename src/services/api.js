// Every call to our backend lives in this one file.
// If the backend ever changes, this is the only file you edit.

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "ApiError";
    this.status = status; // 0 means we never got an answer (offline or timeout)
    this.body = body; // the JSON the server sent back, if any
  }
}

async function request(path, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000); // give up after 10 seconds

  try {
    const response = await fetch(`/api${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
      signal: controller.signal,
    });
    const body = await response.json().catch(() => null);

    if (!response.ok) {
    throw new ApiError(body?.message || `The server answered with status ${response.status}.`, response.status, body);
    }
    // A 200 answer that is not JSON means we did not reach our API (for example, Vite's HTML page in dev).
    if (body === null) {
      throw new ApiError("The server sent an unexpected answer.", response.status, null);
    }
    return body;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === "AbortError") throw new ApiError("The server took too long to answer.", 0, null);
    throw new ApiError("Could not reach the server. Check your connection.", 0, null);
  } finally {
    clearTimeout(timer);
  }
}

export function listRegistrations() {
  return request("/registrations");
}

// Only send what the server needs. The password never leaves the browser.
export function createRegistration(values) {
  return request("/registrations", {
    method: "POST",
    body: JSON.stringify({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.replace(/[\s-]/g, ""),
      country: values.country,
    }),
  });
}