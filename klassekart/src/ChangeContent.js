import React from 'react';
import Profile from './Profile';
import ClassMap from './ClassMap';

export default function ChangeContent({typeOfContent, studentIndex}){
    console.log("typeOfContent er: " + typeOfContent);
    console.log("studentIndex er: " + studentIndex);

    if (typeOfContent == "profile"){
        console.log("type of content == profile er: true")
        return(
            <Profile student={studentIndex} />
        )
    } else if (typeOfContent == "classmap"){
        console.log("type of content == classmap er: true")
        return(
            <ClassMap />
        )
    } else {
        return(
            <p>noe er galt</p>
        )
    }
}