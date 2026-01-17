import { AccessToken } from "livekit-server-sdk";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const room = searchParams.get("room")
    const name = searchParams.get("name")

    if (!room || !name) {
        return NextResponse.json(
            {error: "Missing room or name"},
            {status: 400}
        )
    }

    const apikey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET

    if (!apikey || !apiSecret) {
        return NextResponse.json(
            {error: "Server is not configured"},
            {status: 500}
        )
    }

    const token = new AccessToken(apikey, apiSecret, {
        identity: name,
    })

    token.addGrant({
        room,
        roomJoin: true,
    })

    const jwt = await token.toJwt()

    return NextResponse.json({
        token: jwt,
    })
}