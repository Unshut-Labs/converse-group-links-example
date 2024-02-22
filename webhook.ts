import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json({ limit: "50mb" }));

const port = process.env.PORT || 8080;

const addWalletToConversation = async (walletAddress: string) => {
  // Implement your logic to determine if wallet should be added to group

  // If the wallet should not be added, return false

  // If the wallet shoud be added, add it to the group and return true! If
  // you don't add the user to the group before returning true, the user
  // will see an error in the app.

  // To add the wallet to the group, you will need to call the XMTP Cli which is in Rust
  // checkout https://replit.com/@neekolas/Groups-Nodejs-Client#src/index.ts for how to 
  // do so from NodeJS

  return true;
};

app.use("/webhook", async (req: Request, res: Response) => {
  const { groupLinkId, topic, walletAddress } = req.body;
  console.log(
    `Received a join query for topic ${topic} - wallet ${walletAddress}`
  );

  if (await addWalletToConversation(walletAddress)) {
    // To allow, just send { status: "SUCCESS" }
    res.json({ status: "SUCCESS" });
  } else {
    // To deny, just send { status: "FORBIDDEN", reason: <string> }
    res.json({
      status: "DENIED",
      reason: "You do not hold enough Degen token",
    });
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
