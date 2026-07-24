/**
 * Mock submit function for quote request form.
 * Replace the body of this function with a real API call (fetch/axios)
 * when the backend is ready.
 *
 * Expected payload shape:
 * {
 *   name: string,
 *   phone: string,
 *   email: string,
 *   company: string,
 *   productCategory: string,
 *   quantity: string,
 *   message: string
 * }
 */
export async function submitQuoteRequest(payload) {
  // TODO: Replace with actual API endpoint
  // const response = await fetch('/api/quote', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // if (!response.ok) throw new Error('Gửi yêu cầu thất bại.');
  // return await response.json();

  // Mock: simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Yêu cầu đã được gửi thành công." });
    }, 1500);
  });
}
