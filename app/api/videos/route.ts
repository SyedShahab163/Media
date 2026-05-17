import { NextResponse } from "next/server";
import { initialVideos } from "@/app/lib/data";
import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "videos.json");

async function getVideos() {
  try {
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    const raw = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(initialVideos, null, 2));
    return initialVideos;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const videos = await getVideos();
  if (category) {
    return NextResponse.json(videos.filter((v: { category: string }) => v.category === category));
  }
  return NextResponse.json(videos);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const videos = await getVideos();
    const newVideo = {
      ...body,
      id: Date.now().toString(),
    };
    videos.push(newVideo);
    await fs.writeFile(dataFile, JSON.stringify(videos, null, 2));
    return NextResponse.json({ success: true, video: newVideo });
  } catch {
    return NextResponse.json({ error: "Failed to add video" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const videos = await getVideos();
    const filtered = videos.filter((v: { id: string }) => v.id !== id);
    await fs.writeFile(dataFile, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}
