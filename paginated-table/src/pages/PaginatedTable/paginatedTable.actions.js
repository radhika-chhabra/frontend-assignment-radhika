export const fetchTableData = async () => {
  const url =
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(
          "Network response was not ok " + response.statusText
        );
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
