import data from "../../../../data.json";

export async function GET(req) {
  const fetched_data = await data[0]; // mimic fetching data from an actual api based on id
  // console.log(fetched_data);

  return Response.json(fetched_data, { status: 200 });
}
