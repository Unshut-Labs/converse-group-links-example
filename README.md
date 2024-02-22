
# Converse Group Links

### Context

Programmatic groups can help devs build all sorts of token gated groups (based on NFT collections, tokens, friendtech-like keys etc). For the user, it is a great way to:

-   access exclusive content
-   meet peers and start new relationships

### Problem

Where should devs drive people to when suggesting them to join a group? It has to be a place where the users can then interact with the group.

### Solution

Converse group links. A link that devs can generate for each group and that drives to a Converse in-app page. When users click on the Converse group link, they land on a page in which they can ask to join the group. If they are eligible, they are added to the group and can start chatting.


### How it works

#### Step 1: Create group
Dev creates a group for which it is admin : for instance using the libXMTP [CLI](https://github.com/xmtp/libxmtp/tree/main/examples/cli) - in Rust - which can be called from NodeJS using [this helper](https://replit.com/@neekolas/Groups-Nodejs-Client#src/index.ts).

The dev now knows the `topic` of the group (its unique id).

#### Step 2: Create a Converse group link

Using that `topic` , the dev registers the group on Converse using 

    POST https://backend-staging.converse.xyz/api/groups/create

with parameters 

    {
		"webhook": "https://my-domain.com/webhook", // An URL that will be called with group join requests
		"topic": "<unique-group-topic>",
		"name": "My Super Group",
		"description": "Something visible to the user, like eligibility criteria"
	}

This flow has been implemented in this repository, you can just edit [create.ts](create.ts) with your information and call `ts-node create.ts` . This will print back data, including your unique Converse Group Link 

#### Step 3: Share your converse link

You get back a link in the form `https://preview.converse.xyz/group/<groupLinkId>` that you can share with people.

#### Step 4: Open the Converse Group Link on a mobile phone that has Converse PREVIEW

Here's the Testflight link for iOS : https://testflight.apple.com/join/70v1Rvv5
Here's the IPA link for Android : ???

When the users open the link, they will see the group name and description + a button to ask to join the group. When the users click on the button, a query is made to the webhook you provided with the `walletAddress` and the `topic` of the group. Your code can then implement whatever logic to decide if the wallet can join the group or not.

If the wallet can join the group, your webhook needs to return 

    { "status": "SUCCESS" }

**but first, it needs to add the wallet to the group**, or the user will see an error message!
Again, to add the user to the group, you will need to call the [CLI](https://github.com/xmtp/libxmtp/tree/main/examples/cli), which can be done using [NodeJS](https://replit.com/@neekolas/Groups-Nodejs-Client#src/index.ts).

If the wallet is not allowed to join the group, your webhook needs to return

    { "status": "DENIED", "reason": "You do not hold enough token to join the group!" }

And the reason will be displayed back to the user in Converse.

A sample implementation of such code using an Express server is done in [webhook.ts](webhook.ts) which you can run using `yarn dev`
