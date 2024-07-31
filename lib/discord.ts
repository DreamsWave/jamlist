"use server";

import { env } from "@/env";
import type { GuildMember } from "@/types";

const baseUrl = "https://discord.com/api/v10";
const guildId = env.DISCORD_GUILD_ID;
const botToken = `Bot ${env.DISCORD_BOT_TOKEN}`;

export async function getGuildMember(
  userId?: string,
): Promise<GuildMember | null> {
  // console.log("discord request");
  if (!userId) return null;
  const url = new URL(`${baseUrl}/guilds/${guildId}/members/${userId}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: botToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
