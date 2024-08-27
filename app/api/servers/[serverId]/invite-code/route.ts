import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import {db} from "@/lib/db";
import {v4 as uuidv4} from "uuid";

export async function PATCH(
    req: Request,
    {params}: {params: {serverId: string}}

) {
    try {
        
        const profiles = await currentProfile();

        if(!profiles) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!params.serverId) {
            return new NextResponse("Server ID Not Found", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profiles.id,
            },
            data: {
                inviteCode: uuidv4(),
            },
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("[SERVER_ID]", error);
        return new NextResponse("Internal Server Error", {status: 500});
        }
}