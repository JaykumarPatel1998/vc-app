import RoomClient from "./RoomClient";

type Props = {
  params: Promise<{
    roomId: string;
  }>;
};

export default async function RoomPage({ params }: Props) {
  const { roomId } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <RoomClient roomId={roomId} />
    </main>
  );
}
