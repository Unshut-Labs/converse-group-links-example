import axios from "axios";

const CONVERSE_GROUP_LINK_ENDPOINT =
  "https://backend-staging.converse.xyz/api/groups/create";

// Replace WEBHOOK with the endpoint that will receive the queries,
// here for instance a local ngrok
const WEBHOOK =
  "https://fd3d-2a01-cb04-85e-2800-4de9-f91d-af10-967d.ngrok-free.app/webhook";

// Topic of the group you want to manage through a Converse Link
const GROUP_TOPIC = "47f40c89972667f78c7e453686b5ca81";

const createGroup = async () => {
  const { data } = await axios.post(CONVERSE_GROUP_LINK_ENDPOINT, {
    webhook: WEBHOOK,
    topic: GROUP_TOPIC,
    name: "Degen group",
    // Description is optional
    description:
      "In order to join the group, you must hold at least a degen token",
  });
  console.log("Successfully created group link:");
  console.log(data);

  console.log(`\nGroup link to share: ${data.link}\n`);
};

createGroup();
