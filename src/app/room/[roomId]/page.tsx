import RoomClient from "./RoomClient";

type Props = {
  params: Promise<{
    roomId: string;
  }>;
};

export default async function RoomPage({ params }: Props) {
  const { roomId } = await params;

  return (
    <main className="h-screen w-screen flex items-center justify-center overflow-hidden">
      <RoomClient roomId={roomId} />
    </main>
  );
}
