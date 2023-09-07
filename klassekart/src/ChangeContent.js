import React from 'react';
import Profile from './Profile';
import ClassMap from './ClassMap';

export default function ChangeContent({typeOfContent, studentIndex}){
    console.log(typeOfContent);
    console.log(studentIndex);

    if (typeOfContent == "profile"){
        console.log("true")
        return(
            <Profile student={studentIndex} />
        )
    } else if (typeOfContent == "classmap"){
        return(
            <ClassMap />
        )
    } else {
        return(
            <p>noe er galt</p>
        )
    }
}