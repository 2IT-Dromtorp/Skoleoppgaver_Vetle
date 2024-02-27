function Leaderboard({
    leaderboard,
}: {
    leaderboard: { name: string; points: number }[] | undefined;
}): JSX.Element {
    return (
        <div className="flex justify-end items-center flex-col bg-main2 border-contrast p-2 border-4 rounded-lg min-w-20 h-fit bg-opacity-75 absolute top-1/4 right-8">
            {leaderboard?.map((user, index) => {
                return (
                    <>
                        {index <= 5 && (
                            <div className="">
                                <p>{user.name}: {user.points}</p>
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
}

export default Leaderboard;
