import { Dispatch, SetStateAction, useState } from "react";

function GetPopup(): JSX.Element {
    const [currentPopup, setCurrentPopup] = useState("");

    switch (currentPopup){
        case "login":
            console.log("went to login")
            return <p>login</p>
        case "course":
            console.log("went to course")
            return <p>course</p>
        default:
            console.log("went to default")
            return <>default</>
    }
}

function Popup({setPopupActive}: {setPopupActive : Dispatch<SetStateAction<boolean>>}): JSX.Element {
    return <>
            <div className="bg-black bg-opacity-70 w-screen h-screen absolute flex justify-center items-center z-10">
                <div onClick={() => setPopupActive(false)} className="absolute right-4 top-4 flex justify-center items-center bg-white bg-opacity-50 rounded-3xl p-1 cursor-pointer shadow-lg duration-200 hover:bg-black hover:bg-opacity-40"><img src="../close.svg" className="h-12"></img></div>
                <div className="bg-white w-3/4 min-h-[75%] flex rounded-lg shadow-lg">
                    <GetPopup />
                </div>
            </div>
        </>
}

export default Popup