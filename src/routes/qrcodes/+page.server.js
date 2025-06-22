/** @satisfies {import('./$types').Actions} */
export const actions = {
  generate: async ({ request, fetch, cookies }) => {
    const response = await fetch("http://localhost:8080/api/qrcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
    });

    const url = response.json();
    return { url };
  },
};
